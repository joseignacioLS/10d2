import Link from "next/link";
import { getCampaign, getGroup } from "../api/ttrpg";
import { Sessions } from "../assets/bbdd";
import { useFetchData } from "../hooks/useFetchData";
import { type Campaign as TCampaign } from "../types/ttrpg";
import { CrumbsHeader } from "./Core/CrumbsHeader";

type Props = {
  campaignId: TCampaign["id"];
};

export const Campaign: React.FC<Props> = ({ campaignId }) => {
  const { data: campaign, loading } = useFetchData(getCampaign, [campaignId]);

  if (loading) {
    return "Cargando...";
  }
  return (
    <section>
      <CrumbsHeader
        title={campaign?.name ?? ""}
        crumbs={[
          {
            name: campaign?.group?.name || "",
            href: `/groups/${campaign?.group?.id}`,
          },
        ]}
      />
      <p>{campaign?.summary}</p>
      <h3>Personajes</h3>
      <ul>
        {campaign?.characters.map(({ id, name }) => {
          return (
            <li key={name}>
              <Link href={`/characters/${id}`}>
                {name} ({name})
              </Link>
            </li>
          );
        })}
        <li>GM ({campaign?.GM.name})</li>
      </ul>
      <h3>Sesiones</h3>
      <ul>
        {campaign?.sessions.map(({ id, number, title }) => {
          return (
            <li key={id}>
              <Link href={`/sessions/${id}`}>
                #{(number ?? 0) + 1} {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
