
import { Temporal } from "temporal-polyfill";
import { Campaign, } from "./ttrpg";

export type Event = {
  id: string;
  origin: Campaign["id"]
  message: string;
  date: Temporal.PlainDate;
};
