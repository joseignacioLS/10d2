"use client";

import { editSession, getSession } from "@/src/api/ttrpg";
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
import { useContext, useEffect } from "react";

export default function Home() {
  const { campaignId, sessionId } = useParams();
  const { input, handleInput } = useHandleInput({
    title: "",
    date: "",
    summary: "",
  });
  const { userData } = useContext(UserContext);
  const {
    data: session,
    loading: loadingCampaign,
    error,
  } = useFetchData(getSession, [sessionId]);
  const router = useRouter();

  const handleEditSession = useWrapFnWithToast(async () => {
    if (!userData || !sessionId) throw "User error";

    const { error } = await editSession(
      sessionId as string,
      input.title,
      input.date,
      input.summary as string,
    );
    if (error !== null) {
      throw "Ha habido un error creando la sesión";
    }
    router.push(`/campaigns/${campaignId}/${sessionId}`);

    return "Sesión creada con éxito";
  });

  useEffect(() => {
    if (!session) return;
    handleInput("title", session.title);
    handleInput("summary", session.summary);
    handleInput("date", session.date.toString());
  }, [session]);

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
        title={session?.title}
        crumbs={[
          {
            name: "<",
            href: `/campaigns/${campaignId}`,
          },
        ]}
      />
      <Form
        onSubmit={handleEditSession}
        disabled={
          input.title.length < 12 ||
          input.summary.length < 64 ||
          input.date === ""
        }
      >
        <>
          <Input
            id="title"
            name="title"
            placeholder="Título"
            onChange={handleInput}
            value={input.title}
            label="Nombre de la sesión"
            min={12}
            max={128}
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
          {session && (
            <Tiptap
              name="summary"
              value={input.summary}
              onChange={handleInput}
              placeholder={"Introducción a la campaña"}
              label="Resumen de la sesión"
              max={8000}
            />
          )}
        </>
      </Form>
    </main>
  );
}
