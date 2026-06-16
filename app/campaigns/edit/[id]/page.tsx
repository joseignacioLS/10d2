"use client";

import { getCampaign, putCampaign } from "@/src/api/ttrpg";
import { Button } from "@/src/components/Core/Button";
import { Card } from "@/src/components/Core/Card";
import { CrumbsHeader } from "@/src/components/Core/CrumbsHeader";
import { Form } from "@/src/components/Core/Form";
import { Input } from "@/src/components/Core/Input";
import { Spinner } from "@/src/components/Core/Spinner";
import Tiptap from "@/src/components/Core/TipTap";
import { useFetchData } from "@/src/hooks/useFetchData";
import { useHandleInput } from "@/src/hooks/useHandleInput";
import { ToastContext } from "@/src/store/toast";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Home() {
  const { id: campaignId } = useParams();
  const { data: campaign, loading } = useFetchData(getCampaign, [campaignId]);
  const { input, handleInput, resetInput } = useHandleInput({
    name: campaign?.name ?? "",
    short: campaign?.short ?? "",
    summary: campaign?.summary ?? "",
    nextSession: campaign?.nextSession?.toString() ?? "",
    invite: "",
  });

  const { createToast } = useContext(ToastContext);

  const router = useRouter();

  const handleSubmit = () => {
    putCampaign(
      campaignId as string,
      input.name,
      input.short,
      input.summary,
      input.nextSession,
    )
      .then(() => {
        createToast("Campaña modificada con éxito", "info");
        router.push(`/campaigns/${campaignId}`);
      })
      .catch((err) => {
        createToast(err, "error");
      });
  };

  const handleSubmitInvitation = () => {};

  const handleDeletePlayerFromCampaign = () => {};

  const handleRevokeInvitation = () => {};

  useEffect(() => {
    resetInput();
  }, [campaign]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <CrumbsHeader
        title={campaign?.name}
        crumbs={[
          {
            name: campaign?.short ?? "-",
            href: `/campaigns/${campaignId}`,
          },
        ]}
      />
      <Card>
        <>
          <h2>Información de la campaña</h2>
          <Form onSubmit={handleSubmit}>
            <>
              <Input
                id="short"
                name="name"
                label="Nombre"
                placeholder={campaign?.name ?? ""}
                value={input.name}
                onChange={handleInput}
              />
              <Input
                id="short"
                name="short"
                label="Acrónimo"
                placeholder={campaign?.short ?? ""}
                value={input.short}
                onChange={handleInput}
              />
              {input.summary && (
                <Tiptap
                  name="summary"
                  label="Resumen"
                  placeholder={campaign?.summary ?? ""}
                  value={input.summary}
                  onChange={handleInput}
                />
              )}
              <Input
                id="nextSession"
                name="nextSession"
                label="Siguiente sesión"
                type="date"
                value={input.nextSession}
                onChange={handleInput}
              />
            </>
          </Form>
        </>
      </Card>
      <Card>
        <>
          <h2>Jugadores</h2>
          <ul>
            {campaign?.members
              .filter(({ character: { role } }) => {
                return role !== "GM";
              })
              .map(({ id, name, character }) => {
                return (
                  <li key={id}>
                    <Button onClick={handleDeletePlayerFromCampaign}>X</Button>
                    {name} - {character.name}
                  </li>
                );
              })}
          </ul>
        </>
      </Card>
      <Card>
        <>
          <h2>Invitaciones</h2>
          <ul>
            {campaign?.invitations?.map(({ id, name }) => {
              return (
                <li key={id}>
                  <Button onClick={handleRevokeInvitation}>X</Button>
                  {name}
                </li>
              );
            })}
          </ul>
          <Form onSubmit={handleSubmitInvitation}>
            <Input
              id="invite"
              name="invite"
              value={input.invite}
              onChange={handleInput}
              placeholder="Wit Nimros"
            />
          </Form>
        </>
      </Card>
    </main>
  );
}
