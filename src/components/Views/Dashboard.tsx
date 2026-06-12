"use client";

import { getLastCampaigns, getLastSessions } from "@/src/api/ttrpg";
import { Card } from "@/src/components/Core/Card";
import { Carousel } from "@/src/components/Core/Carousel";
import { useFetchData } from "@/src/hooks/useFetchData";
import Link from "next/link";

import styles from "./Dashboard.module.css";

export const Dashboard = () => {
  const { data: lastSessions } = useFetchData(getLastSessions, [5]);
  const { data: lastCampaigns } = useFetchData(getLastCampaigns, [5]);

  return (
    <main className={styles.dashboard}>
      <Card>
        <>
          <h2>Anuncios</h2>
          <Carousel srcs={["/chicken.svg", "/cat.svg"]}></Carousel>
        </>
      </Card>
      <Card>
        <>
          <h2>Campañas Activas</h2>
          <ul>
            {lastCampaigns?.map((campaign) => {
              return (
                <li key={campaign.id}>
                  <Link href={`/campaigns/${campaign.id}`}>
                    {campaign.name} ({campaign.short})
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      </Card>
      <Card>
        <>
          <h2>Últimas Sesiones</h2>
          <ul>
            {lastSessions?.map((session) => {
              return (
                <li key={session.id}>
                  <Link href={`/sessions/${session.id}`}>
                    {session.title} ({session.campaign}#{session.number})
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
