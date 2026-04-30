"use client";

import { useMemo } from "react"
import { Campaigns, Groups, Members, } from "../assets/bbdd"
import { type Member, type Campaign } from "../types/ttrpg"
import { CrumbsHeader } from "./Core/CrumbsHeader"
import Link from "next/link";

type Props = { groupId: string }

export const Group: React.FC<Props> = ({ groupId }) => {
    const group = Groups.find(({ id }) => id === groupId)

    const members = useMemo(() => {
        return (group ?? { members: [] })
            .members
            .map((memberId) => {
                return Members.find(({ id }) => id === memberId)
            }) as Member[]
    }, [groupId])

    const campaigns = useMemo(() => {
        return (group ?? { campaigns: [] })
            .campaigns
            .map((campaignId) => {
                return Campaigns.find(({ id }) => id === campaignId)
            }) as Campaign[]
    }, [groupId])


    return <section>
        <CrumbsHeader title={group?.name || ""} />
        <section>
            <h3>Miembros</h3>
            <ul>
                {members.map(({ id, name }) => {
                    return <li key={id}>{name}</li>
                })
                }
            </ul>
        </section>
        <section>
            <h3>Campañas</h3>
            <ul>
                {campaigns.map(({ id, name }) => {
                    return <li key={id}>
                        <Link href={`/campaigns/${id}`}>
                            {name}
                        </Link>
                    </li>
                })
                }
            </ul>
        </section>
    </section>
}