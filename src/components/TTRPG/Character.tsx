import { getCharacter } from "@/src/api/ttrpg";
import { CrumbsHeader } from "@/src/components/Core/CrumbsHeader";
import { useFetchData } from "@/src/hooks/useFetchData";

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
            name: character.campaign.short ?? "",
          },
        ]}
      />
    </section>
  );
};
