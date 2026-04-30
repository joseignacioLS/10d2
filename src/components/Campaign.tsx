import Link from "next/link";
import { Campaigns, Characters, Groups, Members, Sessions, } from "../assets/bbdd";
import { type Campaign as TCampaign } from "../types/ttrpg";
import { CrumbsHeader } from "./Core/CrumbsHeader";

type Props = {
    campaignId: TCampaign["id"]
}

export const Campaign: React.FC<Props> = ({ campaignId }) => {
    const group = Groups.find(({ id }) => id === campaignId.split("-")[0]);
    const campaign = Campaigns.find((c) => c.id === campaignId);
    if (!campaign) return <section>Campaign not found</section>
    return <section>
        <CrumbsHeader
            title={campaign?.name}
            crumbs={[{
                name: group?.name || "",
                href: `/groups/${group?.id}`
            }
            ]}
        />
        <p>{campaign.summary}</p>
        <h3>Personajes</h3>
        {campaign.characters.map((id) => {
            const { name, player } = Characters.find((c) => c.id === id) ?? { name: "", player: "" };
            return <p key={name}>{name} ({Members.find(m => m.id === player)?.name})</p>
        })}
        <p>GM ({Members.find(m => m.id === campaign.GM)?.name})</p>
        <h3>Sesiones</h3>
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px"
        }}>

            {campaign.sessions.map((id) => {
                const session = Sessions.find((s) => s.id === id);
                return <Link key={id} href={`/sessions/${id}`}>#{(session?.number ?? 0) + 1} {session?.title}</Link>
            })}
        </div>
    </section>
}