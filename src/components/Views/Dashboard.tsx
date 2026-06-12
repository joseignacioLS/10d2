"use client";

import { getLastEvents, getLastSessions } from "@/src/api/ttrpg";
import { Card } from "@/src/components/Core/Card";
import { Carousel } from "@/src/components/Core/Carousel";
import { Event } from "@/src/types/events";
import { FilledSession } from "@/src/types/ttrpg";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const [lastSessions, setLastSessions] = useState<FilledSession[]>([]);
  const [lastEvents, setLastEvents] = useState<Event[]>([]);

  useEffect(() => {
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
    </main>
  );
};
