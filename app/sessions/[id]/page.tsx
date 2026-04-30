"use client";

import { Session } from "@/src/components/Session";
import { useParams } from "next/navigation";


export default function Home() {
    const { id } = useParams();
    return <main>
        <Session sessionId={(id as string) ?? ""} />
    </main>
}
