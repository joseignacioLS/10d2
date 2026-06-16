"use client";

import { Character } from "@/src/components/TTRPG/Character";
import { useParams } from "next/navigation";

export default function Home() {
  const { characterId } = useParams();
  return (
    <main>
      <Character characterId={(characterId as string) ?? ""} />
    </main>
  );
}
