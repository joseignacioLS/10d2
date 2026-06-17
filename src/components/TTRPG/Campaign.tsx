import { Button } from "@/src/components/Core/Button";
import { Card } from "@/src/components/Core/Card";
import { CrumbsHeader } from "@/src/components/Core/CrumbsHeader";
import { UserContext } from "@/src/store/user";
import Link from "next/link";
import { useContext } from "react";
import { Temporal } from "temporal-polyfill";
import { Calendar } from "../Core/Calendar";

import { CampaignDetail } from "@/src/types/ttrpg";
import { useRouter } from "next/navigation";
import styles from "./Campaign.module.css";

type Props = {
  campaign: CampaignDetail;
};

export const Campaign: React.FC<Props> = ({ campaign }) => {
  const { userData } = useContext(UserContext);

  const router = useRouter();

  const author = ["player", "GM"].includes(userData.permissions[campaign.id]);
  const canEdit = userData.permissions[campaign.id] === "GM";

  return (
    <section className={styles.campaign}>
      <CrumbsHeader title={<span>{campaign?.name} </span>} />

      {(author || canEdit) && (
        <Card>
          <>
            <Button
              onClick={() => {
                router.push(`/sessions/new/${campaign.id}`);
              }}
            >
              Nueva Sesión
            </Button>
            {canEdit && (
              <Button
                onClick={() => {
                  router.push(`/campaigns/edit/${campaign.id}`);
                }}
              >
                Editar
              </Button>
            )}
          </>
        </Card>
      )}

      <Card>
        <p dangerouslySetInnerHTML={{ __html: campaign?.summary ?? "" }}></p>
      </Card>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 3fr",
          gap: "8px",
        }}
      >
        <Card>
          <>
            <h2>Personajes</h2>
            <ul>
              {campaign.members.map(
                ({ character: { id, name }, name: memberName }) => {
                  return (
                    <li key={id}>
                      <Link href={`/characters/${id}`}>
                        {name} ({memberName})
                      </Link>
                    </li>
                  );
                },
              )}
            </ul>
          </>
        </Card>
        <Card>
          <>
            <h2>Sesiones</h2>
            <ul>
              {campaign?.sessions.slice(0, 5).map(({ id, number, title }) => {
                return (
                  <li key={id}>
                    <Link href={`/sessions/${id}`}>
                      #{number ?? 1} {title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        </Card>
      </div>

      <Card>
        <>
          <h2>Calendario</h2>
          <Calendar
            events={[
              ...(campaign?.sessions ?? []).map(({ date, id }) => {
                return {
                  date,
                  onClick: () => {
                    router.push(`/sessions/${id}`);
                  },
                };
              }),
              {
                date: campaign?.nextSession,
                onClick: () => {},
              },
            ].filter(
              (
                event,
              ): event is { date: Temporal.PlainDate; onClick: () => void } =>
                event.date !== undefined,
            )}
          />
        </>
      </Card>
    </section>
  );
};
