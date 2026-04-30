"use client";

import { Group } from "@/src/components/Group";
import { useParams } from "next/navigation";


export default function Home() {
    const { id } = useParams();
    return <main>
        <Group groupId={(id as string) ?? ""} />
    </main>
}
