import { Temporal } from "temporal-polyfill";

export type GroupStates = "open" | "closed" | "inactive" | "deleted";

export type GroupRoles = "admin" | "member" | "invited"

export type Group = {
  id: string;
  name: string;
  members: {
    id: Member["id"],
    role: GroupRoles
  }[];
  campaigns: Campaign["id"][];
  state: GroupStates;
  creationDate: Temporal.PlainDate;
  lastActivity: Temporal.PlainDate;
};

export type FilledGroup = Omit<Group, "members" | "campaigns"> & {
  members: {
    id: Member["id"],
    role: GroupRoles,
    member: Member
  }[];
  campaigns: Campaign[];
};

export type Member = {
  id: string;
  name: string;
  role: ("Player" | "GM")[];
  groups: Group["id"][];
  campaigns: Campaign["id"][];
  subscriptions: (Campaign["id"] | Group["id"])[]
};

export type FilledMember = Omit<Member, "groups" | "campaigns"> & {
  groups: Group[];
  campaigns: Campaign[];
};

export type Campaign = {
  id: string;
  name: string;
  short: string;
  group: Group["id"];
  GM: Member["id"];
  characters: Character["id"][];
  sessions: Session["id"][];
  summary: string;
  state: "on-going" | "finished" | "not-started" | "on-a-break";
  lastActivity: Temporal.PlainDate;
};

export type FilledCampaign = Omit<
  Campaign,
  "group" | "GM" | "characters" | "sessions"
> & {
  group: Group;
  GM: Member;
  characters: Character[];
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
  position: number[];
  character: Character["id"];
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
