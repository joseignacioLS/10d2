import {
  getLastCampaigns,
  getLastGroups,
  getLastSessions,
} from "@/src/api/ttrpg";
import { Campaign, FilledSession, Group } from "@/src/types/ttrpg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card } from "../Core/Card";

import styles from "./Dashboard.module.css";

export const Dashboard = () => {
  const [lastGroups, setLastGroups] = useState<Group[]>([]);
  const [lastCampaigns, setLastCampaigns] = useState<Campaign[]>([]);
  const [lastSessions, setLastSessions] = useState<FilledSession[]>([]);

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
  return (
    <>
      <section className={styles.dashboardSection}>
        <Card>
          <>
            <h2>Últimas Sesiones</h2>
            <ul>
              {lastSessions.map((session) => {
                return (
                  <li key={session.id}>
                    <Link href={`/sessions/${session.id}`}>
                      {session.title} ({session.campaign.short}#{session.number}
                      )
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        </Card>
      </section>
      <section className={styles.dashboardSection}>
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
      </section>
      <section className={styles.dashboardSection}>
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
      </section>
    </>
  );
};
