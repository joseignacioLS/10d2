"use client";

import {
  getLastCampaigns,
  getLastEvents,
  getLastGroups,
  getLastSessions,
} from "@/src/api/ttrpg";
import { Card } from "@/src/components/Core/Card";
import { Carousel } from "@/src/components/Core/Carousel";
import { Event } from "@/src/types/events";
import { Campaign, FilledSession, Group } from "@/src/types/ttrpg";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const [lastGroups, setLastGroups] = useState<Group[]>([]);
  const [lastCampaigns, setLastCampaigns] = useState<Campaign[]>([]);
  const [lastSessions, setLastSessions] = useState<FilledSession[]>([]);
  const [lastEvents, setLastEvents] = useState<Event[]>([]);

  useEffect(() => {
    getLastGroups(5).then((data) => {
      if (data.data) {
        setLastGroups(data.data);
      }
    });
    getLastCampaigns(5).then((data) => {
      if (data.data) {
        setLastCampaigns(data.data);
      }
    });
    getLastSessions(10).then((data) => {
      if (data.data) {
        setLastSessions(data.data);
      }
    });
  }, []);

  useEffect(() => {
    getLastEvents(10).then((data) => {
      if (data.data) {
        setLastEvents(data.data);
      }
    });
  }, []);

  return (
    <main>
      <Card>
        <>
          <h2>Anuncios</h2>
          <Carousel srcs={["/chicken.svg", "/cat.svg"]}></Carousel>
        </>
      </Card>
      <Card>
        <>
          <h2>Últimas Sesiones</h2>
          <ul>
            {lastSessions.map((session) => {
              return (
                <li key={session.id}>
                  <Link href={`/sessions/${session.id}`}>
                    {session.title} ({session.campaign.short}#{session.number})
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      </Card>
      <Card>
        <>
          <h2>Novedades en Campañas</h2>
          <ul>
            {lastCampaigns.map((campaign) => {
              return (
                <li key={campaign.id}>
                  <Link href={`/campaigns/${campaign.id}`}>
                    {campaign.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      </Card>
      <Card>
        <>
          <h2>Novedades en Grupos</h2>
          <ul>
            {lastGroups.map((group) => {
              return (
                <li key={group.id}>
                  <Link href={`/groups/${group.id}`}>{group.name}</Link>
                </li>
              );
            })}
          </ul>
        </>
      </Card>
      <Card>
        <>
          <h2>Últimos Eventos</h2>
          <ul>
            {lastEvents.map((event) => {
              return <li key={event.id}>{event.message}</li>;
            })}
          </ul>
        </>
      </Card>
    </main>
  );
};
