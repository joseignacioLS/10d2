"use client";

import { Character } from "@/src/components/TTRPG/Character";
import { useParams } from "next/navigation";

export default function Home() {
  const { id } = useParams();
  return (
    <main>
      <Character characterId={(id as string) ?? ""} />
    </main>
  );
}
