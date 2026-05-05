"use client";

import { getGroup } from "@/src/api/ttrpg";
import { Button } from "@/src/components/Core/Button";
import { Card } from "@/src/components/Core/Card";
import { CrumbsHeader } from "@/src/components/Core/CrumbsHeader";
import { CreateCampaignModal } from "@/src/components/TTRPG/CreateCampaignModal";
import { useFetchData } from "@/src/hooks/useFetchData";
import { UserContext } from "@/src/store/user";
import Link from "next/link";
import { useContext, useState } from "react";

type Props = { groupId: string };

export const Group: React.FC<Props> = ({ groupId }) => {
  const { user } = useContext(UserContext);
  const { data: group, loading, error } = useFetchData(getGroup, [groupId]);
  const [showCreateCampaignModal, setShowCreateCampaignModal] = useState(false);

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
          <h4>Administradores</h4>
          <ul>
            {group.members
              .filter(({ id }) => {
                return group.admins.includes(id);
              })
              .map(({ id, name, role }) => {
                return (
                  <li key={id}>
                    {name} ({role.join(", ")})
                  </li>
                );
              })}
          </ul>
          <h4>Jugadores</h4>
          <ul>
            {group.members
              .filter(({ id }) => {
                return !group.admins.includes(id);
              })
              .map(({ id, name, role }) => {
                return (
                  <li key={id}>
                    {name} ({role.join(", ")})
                  </li>
                );
              })}
          </ul>
        </>
      </Card>
      <Card>
        <>
          <h3>
            Campañas
            {group.admins.includes(user?.id ?? "-1") && (
              <Button
                onClick={() => {
                  setShowCreateCampaignModal(true);
                }}
              >
                +
              </Button>
            )}
          </h3>
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
      {showCreateCampaignModal && (
        <CreateCampaignModal
          groupId={groupId}
          onClose={() => setShowCreateCampaignModal(false)}
        ></CreateCampaignModal>
      )}
    </section>
  );
};
