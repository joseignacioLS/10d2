"use client";

import { getCampaign } from "@/src/api/ttrpg";
import { CrumbsHeader } from "@/src/components/Core/CrumbsHeader";
import { Spinner } from "@/src/components/Core/Spinner";
import { useFetchData } from "@/src/hooks/useFetchData";
import { useRouteGuard } from "@/src/hooks/useRouteGuard";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Home() {
  const { campaignId } = useParams();

  const {
    data: campaign,
    loading: loadingSession,
    error,
  } = useFetchData(getCampaign, [campaignId], undefined);

  const { loading } = useRouteGuard(
    loadingSession,
    error,
    false,
    undefined,
    `/campaigns/`,
  );

  if (loading || !campaign) {
    return <Spinner />;
  }

  return (
    <main style={{ display: "grid", gridTemplateRows: "auto 1fr" }}>
      <CrumbsHeader
        title={"Todas las sesiones"}
        crumbs={[
          {
            name: campaign.short,
            href: `/campaigns/${campaign.id}`,
          },
        ]}
      ></CrumbsHeader>
      <ul className="scrolleableBlock">
        {campaign.sessions.map((session) => {
          return (
            <li key={session.id}>
              <Link href={`/sessions/${session.id}`}>
                {session.number} - {session.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
