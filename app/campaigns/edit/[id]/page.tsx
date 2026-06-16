"use client";

import { getCampaign, putCampaign } from "@/src/api/ttrpg";
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
    </main>
  );
}
