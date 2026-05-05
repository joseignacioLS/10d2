import { Temporal } from "temporal-polyfill";

export type Event = {
  id: string;
  message: string;
  date: Temporal.PlainDate;
};
