"use client";

import { getCampaign, postSession } from "@/src/api/ttrpg";
import { CrumbsHeader } from "@/src/components/Core/CrumbsHeader";
import { Form } from "@/src/components/Core/Form";
import { Input } from "@/src/components/Core/Input";
import { Spinner } from "@/src/components/Core/Spinner";
import Tiptap from "@/src/components/Core/TipTap";
import { useFetchData } from "@/src/hooks/useFetchData";
import { useHandleInput } from "@/src/hooks/useHandleInput";
import { useRouteGuard } from "@/src/hooks/useRouteGuard";
import { useWrapFnWithToast } from "@/src/hooks/useWrapFnWithToast";
import { UserContext } from "@/src/store/user";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";

export default function Home() {
  const { campaignId } = useParams();
  const { input, handleInput } = useHandleInput({
    name: "",
    number: "",
    date: "",
    summary: "",
  });
  const { userData } = useContext(UserContext);
  const {
    data: campaign,
    loading: loadingCampaign,
    error,
  } = useFetchData(getCampaign, [campaignId]);
  const router = useRouter();

  const handleCreateSession = useWrapFnWithToast(async () => {
    if (!userData || !campaignId) throw "User error";

    const { data: sessionId, error } = await postSession(
      campaignId as string,
      input.name as string,
      Number(input.number),
      input.date,
      input.summary as string,
    );
    if (error !== null) {
      throw "Ha habido un error creando la sesión";
    }
    router.push(`/campaigns/${campaignId}/${sessionId}`);

    return "Sesión creada con éxito";
  });

  const { loading } = useRouteGuard(
    loadingCampaign,
    error,
    true,
    undefined,
    `/campaigns/${campaignId}`,
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <CrumbsHeader
        title={"Nueva sesión"}
        crumbs={[
          {
            name: campaign?.short ?? "",
            href: `/campaigns/${campaignId}`,
          },
        ]}
      />
      <h2>Nueva sesión de {campaign?.name}</h2>
      <Form
        onSubmit={handleCreateSession}
        disabled={
          input.name.length < 12 ||
          input.summary.length < 64 ||
          input.number === "" ||
          input.date === ""
        }
      >
        <>
          <Input
            id="name"
            name="name"
            placeholder="Nombre"
            onChange={handleInput}
            value={input.name}
            label="Nombre de la sesión"
            min={12}
            max={128}
          />
          <Input
            id="number"
            name="number"
            placeholder="37"
            onChange={handleInput}
            value={input.number}
            label="Número de la sesión"
            type="number"
            min={0}
            max={Infinity}
          />
          <Input
            id="date"
            name="date"
            placeholder="2026-06-13"
            onChange={handleInput}
            value={input.date}
            label="Fecha de la sesión"
            type="date"
          />
          <Tiptap
            name="summary"
            value={input.summary}
            onChange={handleInput}
            placeholder={"Introducción a la campaña"}
            label="Resumen de la sesión"
          />
        </>
      </Form>
    </main>
  );
}
