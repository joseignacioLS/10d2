"use client";

import { Campaign } from "@/src/components/TTRPG/Campaign";
import { useParams } from "next/navigation";

export default function Home() {
  const { campaignId } = useParams();
  return (
    <main>
      <Campaign campaignId={(campaignId as string) ?? ""} />
    </main>
  );
}
