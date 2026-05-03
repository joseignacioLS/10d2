import { Campaigns, Characters, Groups, Members, Sessions } from "../assets/bbdd"
import { ServiceResponse } from "../types/api"
import { FilledCampaign, FilledCharacter, FilledGroup, FilledSession } from "../types/ttrpg"

export const getGroup = (groupId: string): Promise<ServiceResponse<FilledGroup>> => {
  return new Promise(res => {
    const group = Groups.find(
      ({ id }) => id === groupId)
    if (group) {
      const campaigns = group.campaigns.map((i) => {
        return Campaigns.find(({ id }) => id === i)
      }).filter(v => v !== undefined)
      const members = group.members.map((i) => {
        return Members.find(({ id }) => id === i)
      }).filter(v => v !== undefined)
      res({
        data: {
          ...group,
          campaigns,
          members
        },
        error: null
      })
    }
    res({
      data: null,
      error: "No group found"
    })
  })
}

export const getCampaign = (campaignId: string): Promise<ServiceResponse<FilledCampaign>> => {
  return new Promise(res => {

    const campaign = Campaigns.find(
      ({ id }) => id === (campaignId))
    const group = Groups.find(({ id }) => id === campaign?.id)
    const GM = Members.find(({ id }) => id === campaign?.GM)
    if (!campaign || !group || !GM) {

      res({
        data: null,
        error: "No campaign found"
      })
      return
    }
    const sessions = campaign.sessions.map((i) => {
      return Sessions.find(({ id }) => id === i)
    }).filter(v => v !== undefined)
    const characters = campaign.characters.map((i) => {
      return Characters.find(({ id }) => id === i)
    }).filter(v => v !== undefined)
    res({
      data: { ...campaign, group, sessions, GM, characters },
      error: null
    })
  })
}


export const getSession = (sessionId: string): Promise<ServiceResponse<FilledSession>> => {
  return new Promise(res => {
    const session = Sessions.find(
      ({ id }) => id === (sessionId))

    const campaign = Campaigns.find(({ id }) => id === session?.campaign)
    const author = Characters.find(({ id }) => id === session?.author)
    if (!session || !campaign || !author) {
      res({
        data: null,
        error: "No session found"
      })
      return
    }
    res({
      data: { ...session, campaign, author },
      error: null
    })
  })
}
export const getCharacter = (characterId: string): Promise<ServiceResponse<FilledCharacter>> => {
  return new Promise(res => {
    const character = Characters.find(
      ({ id }) => id === (characterId))

    const campaign = Campaigns.find(({ id }) => id === character?.campaign)
    const member = Members.find(({ id }) => id === character?.member)

    if (!character || !campaign || !member) {
      res({
        data: null,
        error: "No character found"
      })
      return
    }
    res({
      data: { ...character, campaign, member },
      error: null
    })

  })
}