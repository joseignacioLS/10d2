
import { Temporal } from "temporal-polyfill";
import { Campaign, Group } from "./ttrpg";

export type Event = {
  id: string;
  origin: Campaign["id"] | Group["id"]
  message: string;
  date: Temporal.PlainDate;
};
