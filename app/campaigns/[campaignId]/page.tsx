"use client";

import { getCampaign } from "@/src/api/ttrpg";
import { Spinner } from "@/src/components/Core/Spinner";
import { Campaign } from "@/src/components/TTRPG/Campaign";
import { useFetchData } from "@/src/hooks/useFetchData";
import { useRouteGuard } from "@/src/hooks/useRouteGuard";
import { useParams } from "next/navigation";

export default function Home() {
  const { campaignId } = useParams();
  const {
    data: campaign,
    loading: loadingCampaign,
    error,
  } = useFetchData(getCampaign, [campaignId]);

  const { loading } = useRouteGuard(
    loadingCampaign,
    error,
    false,
    undefined,
    "/",
  );
  if (loading || !campaign) {
    return <Spinner />;
  }
  return (
    <main>
      <Campaign campaign={campaign} />
    </main>
  );
}
