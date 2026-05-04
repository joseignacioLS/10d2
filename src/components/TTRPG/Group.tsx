"use client";

import Link from "next/link";
import { getGroup } from "../../api/ttrpg";
import { useFetchData } from "../../hooks/useFetchData";
import { CrumbsHeader } from "../Core/CrumbsHeader";

type Props = { groupId: string };

export const Group: React.FC<Props> = ({ groupId }) => {
  const { data: group, loading, error } = useFetchData(getGroup, [groupId]);

  if (loading) {
    return "Cargando...";
  }

  if (error !== null) {
    return "Ha habido un error cargando el contenido";
  }

  return (
    <section>
      <CrumbsHeader title={group.name || ""} />
      <section>
        <h3>Miembros</h3>
        <ul>
          {group.members.map(({ id, name }) => {
            return <li key={id}>{name}</li>;
          })}
        </ul>
      </section>
      <section>
        <h3>Campañas</h3>
        <ul>
          {group.campaigns.map(({ id, name }) => {
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
