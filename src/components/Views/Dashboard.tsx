"use client";

import {
  getAnnouncements,
  getLastCampaigns,
  getLastSessions,
} from "@/src/api/ttrpg";
import { Card } from "@/src/components/Core/Card";
import { Carousel } from "@/src/components/Core/Carousel";
import { Spinner } from "@/src/components/Core/Spinner";
import { useFetchData } from "@/src/hooks/useFetchData";
import Link from "next/link";
import styles from "./Dashboard.module.css";

export const Dashboard = () => {
  const { data: lastSessions, loading: loadingSessions } = useFetchData(
    getLastSessions,
    [5],
  );
  const { data: announcements } = useFetchData(getAnnouncements, []);
  const { data: lastCampaigns, loading: loadingCampaigns } = useFetchData(
    getLastCampaigns,
    [5],
  );

  return (
    <main className={styles.dashboard}>
      {announcements && announcements?.length > 0 && (
        <Carousel cards={announcements ?? []}></Carousel>
      )}
      <Card>
        <>
          <h2>Campañas Activas</h2>
          {loadingCampaigns && <Spinner />}
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
          {loadingSessions && <Spinner />}
          <ul>
            {lastSessions?.map((session) => {
              return (
                <li key={session.id}>
                  <Link href={`/campaigns/${session.campaign}/${session.id}`}>
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
