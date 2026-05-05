import { getCampaign } from "@/src/api/ttrpg";
import { Card } from "@/src/components/Core/Card";
import { CrumbsHeader } from "@/src/components/Core/CrumbsHeader";
import { useFetchData } from "@/src/hooks/useFetchData";
import { type Campaign as TCampaign } from "@/src/types/ttrpg";
import Link from "next/link";

type Props = {
  campaignId: TCampaign["id"];
};

export const Campaign: React.FC<Props> = ({ campaignId }) => {
  const {
    data: campaign,
    loading,
    error,
  } = useFetchData(getCampaign, [campaignId]);
  console.log({ campaign });
  if (loading) {
    return "Cargando...";
  }
  if (error !== null) {
    return "Ha habido un error";
  }

  return (
    <section>
      <CrumbsHeader
        title={campaign.name ?? ""}
        crumbs={[
          {
            name: campaign.group?.name || "",
            href: `/groups/${campaign.group?.id}`,
          },
        ]}
      />
      <Card>
        <p dangerouslySetInnerHTML={{ __html: campaign.summary }}></p>
      </Card>
      <Card>
        <>
          <h3>Personajes</h3>
          <ul>
            {campaign.characters.map(({ id, name }) => {
              return (
                <li key={name}>
                  <Link href={`/characters/${id}`}>
                    {name} ({name})
                  </Link>
                </li>
              );
            })}
            <li>GM ({campaign.GM.name})</li>
          </ul>
        </>
      </Card>
      <Card>
        <>
          <h3>Sesiones</h3>
          <ul>
            {campaign.sessions.map(({ id, number, title }) => {
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
    </section>
  );
};
