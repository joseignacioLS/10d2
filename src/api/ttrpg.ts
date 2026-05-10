import {
  Campaigns,
  Characters,
  Events,
  Groups,
  Members,
  Sessions,
} from "@/src/assets/bbdd";
import { ServiceResponse } from "@/src/types/api";
import { Event } from "@/src/types/events";
import {
  Campaign,
  CampaignDetail,
  Character,
  FilledCharacter,
  FilledSession,
  Group,
  GroupDetail,
  Member
} from "@/src/types/ttrpg";
import { Temporal } from "temporal-polyfill";

export const getSearch = (
  search: string,
): Promise<
  ServiceResponse<{
    groups: Group[];
    campaigns: Campaign[];
  }>
> => {
  return new Promise((res) => {
    const result = {
      groups: Groups.filter(({ name }) =>
        new RegExp(search.toLowerCase()).test(name.toLowerCase()),
      ).sort((a, b) => a.lastActivity.since(b.lastActivity).days),
      campaigns: Campaigns.filter(({ name }) =>
        new RegExp(search.toLowerCase()).test(name.toLowerCase()),
      ).sort((a, b) => a.lastActivity.since(b.lastActivity).days),
    };
    res({ data: result, error: null });
  });
};

export const getLastGroups = (
  count: number = 3,
): Promise<ServiceResponse<Group[]>> => {
  return new Promise((res) => {
    const groups = Groups.filter(({ state }) => state !== "deleted").sort(
      (a, b) => -a.lastActivity.since(b.lastActivity).days,
    ).slice(0, count);
    res({
      data: groups,
      error: null,
    });
  });
};

export const getLastCampaigns = (
  count: number = 3,
): Promise<ServiceResponse<Campaign[]>> => {
  return new Promise((res) => {
    const campaigns = Campaigns.sort(
      (a, b) => -a.lastActivity.since(b.lastActivity).days,
    ).slice(0, count);
    res({
      data: campaigns,
      error: null,
    });
  });
};

export const getLastSessions = (
  count: number = 3,
): Promise<ServiceResponse<FilledSession[]>> => {
  return new Promise((res) => {
    const sessions = Sessions.sort((a, b) => -a.date.since(b.date).days)
      .slice(0, count)
      .map((session) => {
        return {
          ...session,
          campaign: Campaigns.find(({ id }) => id === session.campaign),
          author: Characters.find(({ id }) => id === session.author),
        };
      }) as FilledSession[];
    res({
      data: sessions,
      error: null,
    });
  });
};


export const postGroup = (
  name: string,
  userId: string,
): Promise<ServiceResponse<string>> => {
  return new Promise((res) => {
    const member = Members.find(({ id }) => id === userId);
    if (!member) {
      res({
        data: null,
        error: "No member found"
      })
      return
    }
    const id = String(Groups.length + 1)
    Groups.push({
      id,
      name,
      members: [{ id: userId, role: "admin" }],
      campaigns: [],
      state: "inactive",
      creationDate: Temporal.Now.plainDateISO(),
      lastActivity: Temporal.Now.plainDateISO(),
    });
    member.groups.push(id);

    Events.unshift({
      id: String(Events.length + 1),
      message: `${member.name} ha creado el grupo "${name}"`,
      date: Temporal.Now.plainDateISO(),
      origin: id
    })
    res({
      data: id,
      error: null,
    });
  });
};

export const deleteGroup = (groupId: Group["id"]): Promise<ServiceResponse<boolean>> => {
  return new Promise(res => {
    const group = Groups.find(({ id }) => groupId === id)
    if (!group) {
      res({
        data: null,
        error: "No se ha encontrado el grupo"
      })
      return
    }
    group.state = "deleted";
    res({
      data: true,
      error: null
    })
  })
}


export const postCampaign = (
  userId: string,
  groupId: string,
  name: string,
  short: string,
  summary: string,
): Promise<ServiceResponse<string>> => {
  return new Promise(async (res) => {
    const member = Members.find(({ id }) => id === userId);
    const group = Groups.find(({ id }) => id === groupId)
    if (!member || !group) {
      res({
        data: null,
        error: "No member found"
      })
      return
    }
    const id = String(Campaigns.length + 1)
    Campaigns.push({
      id,
      name,
      characters: [],
      short,
      group: groupId,
      GM: userId,
      sessions: [],
      summary,
      state: "not-started",
      lastActivity: Temporal.Now.plainDateISO()
    });
    member.campaigns.push(id);
    group.campaigns.push(id);

    Events.unshift({
      id: String(Events.length + 1),
      message: `${member.name} ha creado la campaña "${name}"`,
      date: Temporal.Now.plainDateISO(),
      origin: id
    })
    await postCharacter(
      "GM",
      id,
      member.id
    )
    res({
      data: id,
      error: null,
    });
  });
};

export const getSession = (
  sessionId: string,
): Promise<ServiceResponse<FilledSession>> => {
  return new Promise((res) => {
    const session = Sessions.find(({ id }) => id === sessionId);

    const campaign = Campaigns.find(({ id }) => id === session?.campaign);
    const author = Characters.find(({ id }) => id === session?.author);
    if (!session || !campaign || !author) {
      res({
        data: null,
        error: "No se ha encontrado la sesión",
      });
      return;
    }
    res({
      data: { ...session, campaign, author },
      error: null,
    });
  });
};

export const postSession = (
  userId: string,
  campaignId: string,
  title: string,
  summary: string,
  author: string
): Promise<ServiceResponse<string>> => {
  return new Promise((res) => {
    const member = Members.find(({ id }) => id === userId);
    const campaign = Campaigns.find(({ id }) => id === campaignId)
    if (!member || !campaign) {
      res({
        data: null,
        error: "No member found"
      })
      return
    }
    const id = String(Sessions.length + 1)
    Sessions.push({
      id,
      title,
      campaign: campaignId,
      number: campaign.sessions.length + 1,
      author,
      summary: {
        text: summary,
        annotations: [],
        comments: []
      },
      date: Temporal.Now.plainDateISO()
    });
    campaign.sessions.unshift(id);

    Events.unshift({
      id: String(Events.length + 1),
      message: `${author} (${campaign.short}) ha escrito una nueva sesión "${title}"`,
      date: Temporal.Now.plainDateISO(),
      origin: campaignId
    })
    res({
      data: id,
      error: null,
    });
  });
};


export const getCharacter = (
  characterId: string,
): Promise<ServiceResponse<FilledCharacter>> => {
  return new Promise((res) => {
    const character = Characters.find(({ id }) => id === characterId);

    const campaign = Campaigns.find(({ id }) => id === character?.campaign);
    const member = Members.find(({ id }) => id === character?.member);

    if (!character || !campaign || !member) {
      res({
        data: null,
        error: "No character found",
      });
      return;
    }
    res({
      data: { ...character, campaign, member },
      error: null,
    });
  });
};

export const postCharacter = (
  name: Character["name"],
  campaignId: Character["campaign"],
  memberId: Character["member"]
): Promise<ServiceResponse<string>> => {
  return new Promise(async (res) => {
    const id = String(Characters.length)
    const campaign = Campaigns.find(({ id }) => id === campaignId)

    if (!campaign) {
      res({ data: null, error: "No se ha encontrado la campaña" })
      return
    }
    Characters.push({
      id,
      name,
      campaign: campaignId,
      member: memberId,
      color: "#550000"
    })
    Campaigns.find(({ id }) => campaignId === id)?.characters.push(id)
    res({
      data: id,
      error: null
    })
  })
}


export const getLastEvents = (count: number = 3): Promise<ServiceResponse<Event[]>> => {
  return new Promise(res => {
    res({
      data: Events.slice(0, count),
      error: null
    })
  })
}

export const annotateSentence = (sessionId: string, position: number[], text: string, character: string): Promise<ServiceResponse<boolean>> => {
  return new Promise(res => {
    const session = Sessions.find(({ id }) => sessionId === id)

    if (!session) {
      res({
        data: null,
        error: "No session"
      })
      return
    }
    session.summary.annotations.push({
      id: String(session.summary.annotations.length),
      position,
      text,
      character
    })
    res({
      data: true,
      error: null
    })
  })

}

export const followCampaign = async (userId: string, campaignId: string): Promise<ServiceResponse<boolean>> => {
  return new Promise(res => {
    const member = Members.find(({ id }) => id === userId);
    if (!member) {
      res({
        data: null,
        error: "No existe el ususario"
      })
      return
    }
    if (member.subscriptions.includes(campaignId)) throw "Ya sigues a la campaña"
    member.subscriptions.push(campaignId)
    res({
      data: true,
      error: null
    })
  })
}

export const unfollowCampaign = async (userId: string, campaignId: string): Promise<ServiceResponse<boolean>> => {
  return new Promise(res => {
    const member = Members.find(({ id }) => id === userId);
    if (!member) {
      res({
        data: null,
        error: "No existe el ususario"
      })
      return
    }
    member.subscriptions = member.subscriptions.filter(id => id !== campaignId)
    res({
      data: true,
      error: null
    })
  })
}


// NEW

export const getGroupDetail = (groupId: Group["id"]): Promise<ServiceResponse<GroupDetail>> => {
  return new Promise((res) => {

    const group = Groups.find(({ id }) => id === groupId)
    if (!group) {
      return res({
        data: null,
        error: "Grupo no encontrado"
      })
    }

    const members = group.members.map(({ id: memberId, role }) => {
      const member = Members.find(({ id }) => id === memberId)
      if (!member) return null
      return {
        id: member.id,
        name: member.name,
        role,
      }
    })
      .filter(v => v !== null)
    const campaigns = group.campaigns.map(campaignId => {
      const campaign = Campaigns.find(({ id }) => id === campaignId)
      if (!campaign) return null
      return {
        id: campaignId,
        name: campaign.name
      }
    }).filter(v => v !== null)

    res({
      data: {
        name: group.name,
        state: group.state,
        members,
        campaigns
      },
      error: null
    })
  })
}


export const getCampaignDetail = (campaignId: Campaign["id"]): Promise<ServiceResponse<CampaignDetail>> => {
  return new Promise(res => {
    const campaign = Campaigns.find(({ id }) => id === campaignId)
    if (!campaign) {
      return res({
        data: null,
        error: "Campaña no encontrada"
      })
    }
    const group = Groups.find(({ id }) => id === campaign.group)
    if (!group) {
      return res({
        data: null,
        error: "Grupo no encontrado"
      })
    }

    const characters = campaign.characters
      .map((characterId) => {
        const character = Characters.find(({ id }) => characterId === id)
        if (!character) return null;
        const member = Members.find(({ id }) => character.member === id)
        if (!member) return null
        return {
          id: character.id,
          name: character.name,
          member: {
            id: character.member,
            name: member.name
          }
        }
      })
      .filter((v) => v !== null)

    const sessions = campaign.sessions.map((sessionId) => {
      const session = Sessions.find(({ id }) => sessionId === id)
      if (!session) return null
      return {
        id: session.id,
        number: session.number,
        title: session.title
      }
    }).filter(v => v !== null)

    res({
      data: {
        name: campaign.name,
        group: {
          id: group?.id,
          name: group.name
        },
        summary: campaign.summary,
        characters,
        sessions
      },
      error: null
    })
  })
}

export const getUserCharacterInCampaign = (userId: Member["id"], campaignId: Campaign["id"]): Promise<ServiceResponse<{
  id: Character["id"],
}>> => {
  return new Promise(res => {
    const campaign = Campaigns.find(({ id }) => id === campaignId)
    if (!campaign) {
      return res({
        data: null,
        error: "Campaña no encontrada"
      })
    }
    const character = Characters.find(({ member, campaign }) => {
      return member === userId && campaign === campaignId
    })
    if (!character) {
      return res({
        data: null,
        error: "Personaje no encontrado"
      })
    }
    res({
      data: { id: character.id },
      error: null
    })
  })
}

export const getUserInfo = (token: string): Promise<ServiceResponse<{
  id: string;
  username: string;
  groups: Group[];
  subscriptions: Campaign["id"][];
}>> => {
  return new Promise(res => {
    const { id, username } = JSON.parse(atob(token.split(".")[1]))
    const member = Members.find(({ id: memberId }) => id === memberId)
    if (!member) return res({
      data: null,
      error: "No se encuentra el usuario"
    })

    const groups = member.groups.map((groupId) => {
      return Groups.find(({ id }) => id === groupId)
    })
      .filter(v => v !== undefined)
    res({
      data: {
        id,
        username,
        groups,
        subscriptions: member.subscriptions
      },
      error: null
    })
  })
}