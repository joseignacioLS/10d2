import { campaigns, Characters, Members, type Campaign as TCampaign } from "../assets/bbdd";

type Props = {
    campaignId: TCampaign["id"]
}

export const Campaign: React.FC<Props> = ({ campaignId }) => {
    const campaign = campaigns.find((c) => c.id === campaignId);
    if (!campaign) return <section>Campaign not found</section>
    return <section>
        <h2>{campaign.name}</h2>
        <h3>Miembros</h3>
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

            {campaign.sessions.map((session) => <a key={session.id} href={`/sessions/${session.id}`}>#{session.number + 1} {session.title}</a>)}
        </div>
    </section>
}