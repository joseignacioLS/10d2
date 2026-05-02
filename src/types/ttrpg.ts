import { Temporal } from "temporal-polyfill";


export type Group = {
    id: string;
    name: string;
    members: Member["id"][];
    campaigns: Campaign["id"][];
    state: "open" | "closed" | "inactive"
}

export type Member = {
    id: string;
    name: string;
    role: ("Player" | "GM")[]
}

export type Campaign = {
    id: string;
    name: string;
    GM: Member["id"];
    characters: Character["id"][];
    sessions: Session["id"][];
    summary: string;
    state: "on-going" | "finished" | "not-started" | "on-a-break"
}

export type Session = {
    id: string;
    number: number;
    title: string;
    author: Character["id"];
    summary: SessionSummary;
    date: Temporal.PlainDate
}

export type SessionSummary = {
    text: string;
    annotations: Annotation[];
    comments: Comment[];
}

export type Annotation = {
    id: any;
    character: Character["id"];
    text: string;
}

export type Comment = {
    id: string;
    text: string;
    member: Member["id"];
    date: Temporal.PlainDateTime;
}

export type Character = {
    id: string;
    name: string;
    campaign: Campaign["id"];
    player: Member["id"];
    color: string;
}