"use client";

import Link from "next/link";
import { getGroup } from "../../api/ttrpg";
import { useFetchData } from "../../hooks/useFetchData";
import { Card } from "../Core/Card";
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
      <Card>
        <>
          <h3>Miembros</h3>
          <ul>
            {group.members.map(({ id, name }) => {
              return <li key={id}>{name}</li>;
            })}
          </ul>
        </>
      </Card>
      <Card>
        <>
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
        </>
      </Card>
    </section>
  );
};
