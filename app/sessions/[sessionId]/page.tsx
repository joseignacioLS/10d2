"use client";

import { Session } from "@/src/components/TTRPG/Session";
import { TTRPGSessionProvider } from "@/src/store/ttrpgsession";
import { useParams } from "next/navigation";

export default function Home() {
  const { sessionId } = useParams();
  return (
    <main>
      <TTRPGSessionProvider>
        <Session sessionId={(sessionId as string) ?? ""} />
      </TTRPGSessionProvider>
    </main>
  );
}
