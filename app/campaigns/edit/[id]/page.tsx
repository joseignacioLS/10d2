"use client";

import { Campaign } from "@/src/components/TTRPG/Campaign";
import { useParams } from "next/navigation";

export default function Home() {
  const { id } = useParams();
  return (
    <main>
      <p>Editar</p>
    </main>
  );
}
