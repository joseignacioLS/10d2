"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Campaigns, Members } from "../assets/bbdd";
import { useGameData } from "../hooks/useGameData";
import { type Campaign, type Member } from "../types/ttrpg";
import { CrumbsHeader } from "./Core/CrumbsHeader";

type Props = { groupId: string };

export const Group: React.FC<Props> = ({ groupId }) => {
  const { group } = useGameData({ groupId });

  const members = useMemo(() => {
    return (group ?? { members: [] }).members.map((memberId) => {
      return Members.find(({ id }) => id === memberId);
    }) as Member[];
  }, [group]);

  const campaigns = useMemo(() => {
    return (group ?? { campaigns: [] }).campaigns.map((campaignId) => {
      return Campaigns.find(({ id }) => id === campaignId);
    }) as Campaign[];
  }, [group]);

  if (!group) {
    return "Cargando...";
  }

  return (
    <section>
      <CrumbsHeader title={group?.name || ""} />
      <section>
        <h3>Miembros</h3>
        <ul>
          {members.map(({ id, name }) => {
            return <li key={id}>{name}</li>;
          })}
        </ul>
      </section>
      <section>
        <h3>Campañas</h3>
        <ul>
          {campaigns.map(({ id, name }) => {
            return (
              <li key={id}>
                <Link href={`/campaigns/${id}`}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
};
