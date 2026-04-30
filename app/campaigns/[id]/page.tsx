"use client"

import { Campaign } from "@/src/components/Campaign";
import { useParams } from "next/navigation";


export default function Home() {

    const { id } = useParams();
    return <main>
        <Campaign campaignId={(id as string) ?? ""} />
    </main>
}
