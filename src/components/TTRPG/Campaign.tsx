import { Button } from "@/src/components/Core/Button";
import { Calendar } from "@/src/components/Core/Calendar";
import { Card } from "@/src/components/Core/Card";
import { CrumbsHeader } from "@/src/components/Core/CrumbsHeader";
import { UserContext } from "@/src/store/user";
import { CampaignDetail } from "@/src/types/ttrpg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Temporal } from "temporal-polyfill";
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
                router.push(`/campaigns/${campaign.id}/new`);
              }}
            >
              Nueva Sesión
            </Button>
            {canEdit && (
              <Button
                onClick={() => {
                  router.push(`/campaigns/${campaign.id}/edit`);
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
                    <Link href={`/campaigns/${campaign.id}/${id}`}>
                      #{number ?? 1} {title}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link href={`/campaigns/${campaign.id}/sessions`}>
                  Ver todas
                </Link>
              </li>
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
                    router.push(`/campaigns/${campaign.id}/${id}`);
                  },
                };
              }),
              {
                date: campaign?.nextSession,
                onClick: () => {
                  if (!canEdit) {
                    return;
                  }
                  const params = new URLSearchParams({
                    action: "TEMPLATE",
                    text: `Sesión ${(campaign?.sessions[0]?.number ?? 0) + 1} de ${campaign?.short}`,
                    dates:
                      campaign?.nextSession?.toString().replaceAll("-", "") ??
                      "",
                  });
                  window.open(
                    `https://calendar.google.com/calendar/render?${params.toString()}`,
                    "_blank",
                  );
                },
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
