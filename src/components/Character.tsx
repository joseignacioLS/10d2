import { useEffect, useState } from "react";
import { Campaigns, Characters, Groups } from "../assets/bbdd";
import { Character as TCharacter } from "../types/ttrpg";
import { CrumbsHeader } from "./Core/CrumbsHeader";
import { useGameData } from "../hooks/useGameData";

type Props = {
  characterId: string;
};

export const Character: React.FC<Props> = ({ characterId }) => {
  const { character } = useGameData({
    characterId,
  });

  if (!character) {
    return "Cargando...";
  }

  return (
    <section>
      <CrumbsHeader title={""} crumbs={[]} />
      <h3>{character.name}</h3>
    </section>
  );
};
