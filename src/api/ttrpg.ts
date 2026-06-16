
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
  summary: Session["summary"],
  author: Session["author"]

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
  member: string;
  campaign: {
    id: Campaign["id"],
    short: Campaign["short"]
  }
}>> => {
  const path = "/character/"
  return secureFetch(process.env.NEXT_PUBLIC_API + path + characterId)
};



export const annotateSentence = (sessionId: string, position: number[], text: string): Promise<ServiceResponse<boolean>> => {
  const path = "/session/annotate"
  return secureFetch(process.env.NEXT_PUBLIC_API + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sessionId,
      position,
      text
    })
  })
}


export const getCampaign = async (campaignId: Campaign["id"]): Promise<ServiceResponse<{
  members: {
    id: Member["id"],
    name: Member["name"]
    character: {
      id: Character["id"]
      role: "GM" | "player",
      name: Character["name"]
    }
  }[];
  name: Campaign["name"];
  short: Campaign["short"];
  summary: Campaign["summary"]
  sessions: {
    id: Session["id"]
    number: Session["number"]
    title: Session["title"]
    date: Session["date"]
  }[]
  nextSession: Campaign["nextSession"]
  invitations: {
    id: Member["id"]
    name: Member["name"]
  }[]
}>> => {
  const path = "/campaign/"
  return secureFetch(process.env.NEXT_PUBLIC_API + path + campaignId)

}

export const putCampaign = async (campaignId: Campaign["id"],
  name: string,
  short: string,
  summary: string,
  nextSession: string
): Promise<ServiceResponse<{}>> => {
  const path = "/campaign/"
  return secureFetch(process.env.NEXT_PUBLIC_API + path, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      campaignId,
      name,
      short,
      summary,
      nextSession
    })
  })

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


export const canAnnotate = async (campaignId: string): Promise<ServiceResponse<boolean>> => {
  const path = "/campaign/permission/"
  return secureFetch(process.env.NEXT_PUBLIC_API + path + campaignId)
}