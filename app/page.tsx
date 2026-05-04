"use client";

import {
  getLastCampaigns,
  getLastGroups,
  getLastSessions,
} from "@/src/api/ttrpg";
import { HomeSearchBar } from "@/src/components/TTRPG/HomeSearchBar";
import { Campaign, Group, Session } from "@/src/types/ttrpg";
import { useEffect, useState } from "react";

export default function Home() {
  const [lastGroups, setLastGroups] = useState<Group[]>([]);
  const [lastCampaigns, setLastCampaigns] = useState<Campaign[]>([]);
  const [lastSessions, setLastSessions] = useState<Session[]>([]);
  console.log("HOME");

  useEffect(() => {
    console.log("fetch");
    getLastGroups().then((data) => {
      if (data.data) {
        setLastGroups(data.data);
      }
    });
    getLastCampaigns().then((data) => {
      if (data.data) {
        setLastCampaigns(data.data);
      }
    });
    getLastSessions().then((data) => {
      if (data.data) {
        setLastSessions(data.data);
      }
    });
  }, []);

  return (
    <main>
      <section>
        <HomeSearchBar />
      </section>
      <section>
        <h2>Últimas Sesiones</h2>
        <ul>
          {lastSessions.map((session) => {
            return (
              <li key={session.id}>
                <a href={`/sessions/${session.id}`}>{session.title}</a>
              </li>
            );
          })}
        </ul>
      </section>
      <section>
        <h2>Novedades en Campañas</h2>
        <ul>
          {lastCampaigns.map((campaign) => {
            return (
              <li key={campaign.id}>
                <a href={`/campaigns/${campaign.id}`}>{campaign.name}</a>
              </li>
            );
          })}
        </ul>
      </section>
      <section>
        <h2>Novedades en Grupos</h2>
        <ul>
          {lastGroups.map((group) => {
            return (
              <li key={group.id}>
                <a href={`/groups/${group.id}`}>{group.name}</a>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
