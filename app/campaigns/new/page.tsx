"use client";

import { Form } from "@/src/components/Core/Form";
import { Input } from "@/src/components/Core/Input";
import Tiptap from "@/src/components/Core/TipTap";
import { useHandleInput } from "@/src/hooks/useHandleInput";
import { useWrapFnWithToast } from "@/src/hooks/useWrapFnWithToast";
import { ToastContext } from "@/src/store/toast";
import { UserContext } from "@/src/store/user";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Home() {
  const { input, handleInput } = useHandleInput(["name", "short", "summary"]);
  const { userData } = useContext(UserContext);
  const { createToast } = useContext(ToastContext);
  const router = useRouter();

  const handleCreateCampaign = () => {};

  useEffect(() => {
    if (!userData) {
      createToast("Debes estar logeado para acceder al perfil", "warning");
      router.push(`/`);
    }
  }, [userData]);
  return (
    <main>
      <h2>Nueva campaña del grupo</h2>
      <Form
        onSubmit={handleCreateCampaign}
        disabled={
          input.name.length < 12 ||
          input.short.length < 2 ||
          input.summary.length < 64
        }
      >
        <>
          <Input
            id="name"
            name="name"
            placeholder="Nombre"
            onChange={handleInput}
            value={input.name}
            label="Nombre de la campaña"
            min={12}
            max={128}
          />
          <Input
            id="short"
            name="short"
            placeholder="Acrónimo"
            onChange={handleInput}
            value={input.short}
            label="Acrónimo del nombre"
            min={3}
            max={9}
          />
          <Tiptap
            name="summary"
            value={input.summary}
            onChange={handleInput}
            placeholder={"Introducción a la campaña"}
            label="Introducción a la campaña"
          />
        </>
      </Form>
    </main>
  );
}
