"use client";

import { getGroupDetail } from "@/src/api/ttrpg";
import { Button } from "@/src/components/Core/Button";
import { Card } from "@/src/components/Core/Card";
import { CrumbsHeader } from "@/src/components/Core/CrumbsHeader";
import { CreateCampaignModal } from "@/src/components/TTRPG/CreateCampaignModal";
import { useFetchData } from "@/src/hooks/useFetchData";
import { ToastContext } from "@/src/store/toast";
import { UserContext } from "@/src/store/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

type Props = { groupId: string };

export const Group: React.FC<Props> = ({ groupId }) => {
  const { userData } = useContext(UserContext);
  const { createToast } = useContext(ToastContext);
  const {
    data: group,
    loading,
    error,
  } = useFetchData(getGroupDetail, [groupId]);
  const [showCreateCampaignModal, setShowCreateCampaignModal] = useState(false);

  const router = useRouter();

  const isAdmin =
    group?.members.find(({ id }) => id === userData?.id)?.role === "admin";

  if (loading) {
    return "Cargando...";
  }

  if (error !== null) {
    createToast(error, "error");
    router.push("/");
    return null;
  }

  if (group.state === "deleted") {
    createToast("El grupo que buscas ya no existe", "error");
    router.push("/");
    return null;
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
              .filter(({ role }) => {
                return role === "admin";
              })
              .map(({ id, name }) => {
                return <li key={id}>{name}</li>;
              })}
          </ul>
          <h4>Jugadores</h4>
          <ul>
            {group.members
              .filter(({ role }) => {
                return role === "member";
              })
              .map(({ id, name }) => {
                return <li key={id}>{name}</li>;
              })}
          </ul>
        </>
      </Card>
      <Card>
        <>
          <h3 className="title_with_btn">
            Campañas{" "}
            {isAdmin && (
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
