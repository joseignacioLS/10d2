import { getCampaign, getCharacter, getGroup } from "../api/ttrpg";
import { useFetchData } from "../hooks/useFetchData";
import { CrumbsHeader } from "./Core/CrumbsHeader";

type Props = {
  characterId: string;
};

export const Character: React.FC<Props> = ({ characterId }) => {
  const {
    data: character,
    loading,
    error,
  } = useFetchData(getCharacter, [characterId]);

  if (loading) {
    return "Cargando...";
  }

  if (error !== null) {
    return "Ha habido un error";
  }

  return (
    <section>
      <CrumbsHeader
        title={character.name}
        crumbs={[
          {
            href: `/campaigns/${character.campaign?.id}`,
            name: character.campaign.name ?? "",
          },
        ]}
      />
    </section>
  );
};
