import Link from "next/link";
import { Characters, Members, Sessions } from "../assets/bbdd";
import { useGameData } from "../hooks/useGameData";
import { type Campaign as TCampaign } from "../types/ttrpg";
import { CrumbsHeader } from "./Core/CrumbsHeader";

type Props = {
  campaignId: TCampaign["id"];
};

export const Campaign: React.FC<Props> = ({ campaignId }) => {
  const { group, campaign } = useGameData({ campaignId });

  if (!campaign || !group) {
    return "Cargando...";
  }
  return (
    <section>
      <CrumbsHeader
        title={campaign?.name}
        crumbs={[
          {
            name: group?.name || "",
            href: `/groups/${group?.id}`,
          },
        ]}
      />
      <p>{campaign.summary}</p>
      <h3>Personajes</h3>
      <ul>
        {campaign.characters.map((id) => {
          const { name, player } = Characters.find((c) => c.id === id) ?? {
            name: "",
            player: "",
          };
          return (
            <li key={name}>
              <Link href={`/characters/${id}`}>
                {name} ({Members.find((m) => m.id === player)?.name})
              </Link>
            </li>
          );
        })}
        <li>GM ({Members.find((m) => m.id === campaign.GM)?.name})</li>
      </ul>
      <h3>Sesiones</h3>
      <ul>
        {campaign.sessions.map((id) => {
          const session = Sessions.find((s) => s.id === id);
          return (
            <li key={id}>
              <Link href={`/sessions/${id}`}>
                #{(session?.number ?? 0) + 1} {session?.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
