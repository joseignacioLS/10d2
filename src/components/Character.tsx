import { getCampaign, getCharacter, getGroup } from "../api/ttrpg";
import { useFetchData } from "../hooks/useFetchData";
import { CrumbsHeader } from "./Core/CrumbsHeader";

type Props = {
  characterId: string;
};

export const Character: React.FC<Props> = ({ characterId }) => {
  const { data: character } = useFetchData(getCharacter, [characterId]);

  if (!character) {
    return "Cargando...";
  }

  return (
    <section>
      <CrumbsHeader
        title={character?.name}
        crumbs={[
          {
            href: `/campaigns/${character?.campaign?.id}`,
            name: character?.campaign.name ?? "",
          },
        ]}
      />
    </section>
  );
};
