import { useGameData } from "../hooks/useGameData";
import { CrumbsHeader } from "./Core/CrumbsHeader";

type Props = {
  characterId: string;
};

export const Character: React.FC<Props> = ({ characterId }) => {
  const { character, campaign, group } = useGameData({
    characterId,
  });

  if (!character) {
    return "Cargando...";
  }

  return (
    <section>
      <CrumbsHeader
        title={character.name}
        crumbs={[
          {
            href: `/groups/${group?.id}`,
            name: group?.name ?? "",
          },
          {
            href: `/campaigns/${campaign?.id}`,
            name: campaign?.name ?? "",
          },
        ]}
      />
    </section>
  );
};
