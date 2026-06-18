import { Temporal } from "temporal-polyfill";


export type CampaignDetail = {
  id: Campaign["id"];
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
}

export type SessionDetail = {
  id: Session["id"]
  campaign: {
    id: Campaign["id"],
    short: Campaign["short"]
  }
  title: Session["title"],
  date: Session["date"],
  summary: string,
  author: {
    name: string;
  };
  annotations: any[]

}


export type SearchResult = {
  campaigns: {
    id: Campaign["id"],
    name: Campaign["name"]
  }[];
  sessions: {
    id: Session["id"],
    title: Session["title"]
  }[]
}



export type Member = {
  id: string;
  name: string;
  campaigns: Campaign["id"][];
  subscriptions: (Campaign["id"])[]
};

export type FilledMember = Omit<Member, "groups" | "campaigns"> & {
  campaigns: Campaign[];
};

export type Campaign = {
  id: string;
  name: string;
  short: string;
  GM: Member["id"];
  characters: Character["id"][];
  sessions: Session["id"][];
  summary: string;
  state: "on-going" | "finished" | "not-started" | "on-a-break";
  lastActivity: Temporal.PlainDate;
  nextSession: Temporal.PlainDate | undefined;
};

export type FilledCampaign = Omit<
  Campaign,
  | "GM" | "characters" | "sessions"
> & {
  GM: Member;
  characters: FilledCharacter[];
  sessions: Session[];
};

export type Session = {
  id: string;
  number: number;
  campaign: Campaign["id"];
  title: string;
  author: Character["id"];
  summary: SessionSummary;
  date: Temporal.PlainDate;
};

export type FilledSession = Omit<Session, "campaign" | "author"> & {
  campaign: Campaign;
  author: Character;
};

export type SessionSummary = {
  text: string;
  annotations: Annotation[];
  comments: Comment[];
};

export type Annotation = {
  id: string;
  position: {
    y: number, //paragraph
    x: number //sentence
  };
  character: {
    id: string;
    name: string;
  };
  text: string;
};

export type Comment = {
  id: string;
  text: string;
  member: Member["id"];
  date: Temporal.PlainDateTime;
};

export type Character = {
  id: string;
  name: string;
  campaign: Campaign["id"];
  member: Member["id"];
  color: string;
};

export type FilledCharacter = Omit<Character, "campaign" | "member"> & {
  campaign: Campaign;
  member: Member;
};

