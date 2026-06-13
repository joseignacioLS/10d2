
import { ServiceResponse } from "@/src/types/api";
import {
  Campaign,
  Character,
  Member,
  SearchResult,
  Session
} from "@/src/types/ttrpg";
import { secureFetch } from "./fn";

export const getSearch = async (
  search: string,
): Promise<
  ServiceResponse<SearchResult>
> => {
  const path = "/search/"
  return secureFetch(process.env.NEXT_PUBLIC_API + path + search)
};


export const getSession = async (
  sessionId: string,
): Promise<ServiceResponse<{
  campaign: {
    id: Campaign["id"],
    short: Campaign["short"]
  }
  title: Session["title"],
  date: Session["date"],
  summary: Session["summary"]

}>> => {
  const path = "/session/"
  return secureFetch(process.env.NEXT_PUBLIC_API + path + sessionId)

};

export const postSession = async (
  campaign: string,
  title: string,
  number: number,
  date: string,
  summary: string,
): Promise<ServiceResponse<string>> => {
  const path = "/session"
  return secureFetch(process.env.NEXT_PUBLIC_API + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      campaign,
      title,
      number,
      date,
      summary
    })
  })

};

export const getLastSessions = async (
  count: number,
): Promise<ServiceResponse<{
  id: Session["id"],
  campaign: Campaign["short"],
  title: Session["title"],
  number: Session["number"]
}[]>> => {
  const path = "/session/last/"
  return secureFetch(process.env.NEXT_PUBLIC_API + path + count)
};




export const getCharacter = async (
  characterId: string,
): Promise<ServiceResponse<{
  name: Character["name"],
  campaign: {
    id: Campaign["id"],
    short: Campaign["short"]
  }
}>> => {
  const path = "/character/"
  return secureFetch(process.env.NEXT_PUBLIC_API + path + characterId)
};



export const annotateSentence = (sessionId: string, position: number[], text: string, character: string): Promise<ServiceResponse<boolean>> => {
  return new Promise(res => {
    // const session = Sessions.find(({ id }) => sessionId === id)

    // if (!session) {
    //   res({
    //     data: null,
    //     error: "No session"
    //   })
    //   return
    // }
    // // session.summary.annotations.push({
    // //   id: String(session.summary.annotations.length),
    // //   position,
    // //   text,
    // //   character
    // // })
    res({
      data: true,
      error: null
    })
  })
}



export const getCampaign = async (campaignId: Campaign["id"]): Promise<ServiceResponse<{
  characters: {
    id: Character["id"],
    name: Character["name"]
    member: {
      id: Member["id"]
      name: Member["name"]
    };
  }[]
  name: Campaign["name"];
  summary: Campaign["summary"]
  sessions: {
    id: Session["id"]
    number: Session["number"]
    title: Session["title"]
    date: Session["date"]
  }[]
  nextSession: Campaign["nextSession"]
}>> => {
  const path = "/campaign/"
  return secureFetch(process.env.NEXT_PUBLIC_API + path + campaignId)

}

export const getLastCampaigns = async (
  count: number,
): Promise<ServiceResponse<{
  id: Campaign["id"],
  short: Campaign["short"],
  name: Campaign["name"],
}[]>> => {
  const path = "/campaign/last/"
  return secureFetch(process.env.NEXT_PUBLIC_API + path + count)
};



export const getAnnouncements = async (
): Promise<ServiceResponse<{
  text: string,
  img: string
}[]>> => {
  const path = "/announcement"
  return secureFetch(process.env.NEXT_PUBLIC_API + path)
};

