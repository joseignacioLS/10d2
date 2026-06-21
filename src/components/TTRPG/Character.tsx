import { getCharacter } from "@/src/api/ttrpg";
import { CrumbsHeader } from "@/src/components/Core/CrumbsHeader";
import { Spinner } from "@/src/components/Core/Spinner";
import { useFetchData } from "@/src/hooks/useFetchData";
import { UserContext } from "@/src/store/user";
import { useContext } from "react";

type Props = {
  characterId: string;
};

export const Character: React.FC<Props> = ({ characterId }) => {
  const {
    data: character,
    loading,
    error,
  } = useFetchData(getCharacter, [characterId]);

  const { userData } = useContext(UserContext);
  if (loading) {
    return <Spinner />;
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
      {userData?.id === character.member && "Hola!"}
    </section>
  );
};
