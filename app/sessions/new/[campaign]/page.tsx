"use client";

import { getCampaignDetail, postSession } from "@/src/api/ttrpg";
import { Form } from "@/src/components/Core/Form";
import { Input } from "@/src/components/Core/Input";
import Tiptap from "@/src/components/Core/TipTap";
import { useFetchData } from "@/src/hooks/useFetchData";
import { useHandleInput } from "@/src/hooks/useHandleInput";
import { useWrapFnWithToast } from "@/src/hooks/useWrapFnWithToast";
import { ToastContext } from "@/src/store/toast";
import { UserContext } from "@/src/store/user";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Home() {
  const { campaign: campaignId } = useParams();
  const { input, handleInput } = useHandleInput(["name", "summary"]);
  const { userData } = useContext(UserContext);
  const { data: campaign } = useFetchData(getCampaignDetail, [campaignId]);
  const { createToast } = useContext(ToastContext);
  const router = useRouter();

  const handleCreateSession = useWrapFnWithToast(async () => {
    if (!userData || !campaignId) throw "User error";
    const { data: sessionId } = await postSession(
      userData.id,
      campaignId as string,
      input.name,
      input.summary,
      userData.id,
    );
    if (!sessionId) throw "Error creando la sesión";

    router.push(`/sessions/${sessionId}`);
    return "Sesión creada con éxito";
  });

  useEffect(() => {
    if (!userData) {
      createToast("Debes estar logeado para acceder al perfil", "warning");
      router.push(`/campaigns/${campaignId}`);
    }
  }, [userData]);
  return (
    <main>
      <h2>Nueva sesión de {campaign?.name}</h2>
      <Form
        onSubmit={handleCreateSession}
        disabled={input.name.length < 12 || input.summary.length < 64}
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
