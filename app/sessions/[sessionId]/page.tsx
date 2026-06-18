"use client";

import { getSession } from "@/src/api/ttrpg";
import { Spinner } from "@/src/components/Core/Spinner";
import { Session } from "@/src/components/TTRPG/Session";
import { useFetchData } from "@/src/hooks/useFetchData";
import { useRouteGuard } from "@/src/hooks/useRouteGuard";
import { TTRPGSessionProvider } from "@/src/store/ttrpgsession";
import { useParams } from "next/navigation";

export default function Home() {
  const { sessionId } = useParams();
  const {
    data: session,
    loading: loadingSession,
    error,
    refetch,
  } = useFetchData(getSession, [sessionId], undefined, (data) => {
    return {
      ...data,
      date: Temporal.PlainDate.from(data.date),
    };
  });

  const { loading } = useRouteGuard(
    loadingSession,
    error,
    false,
    undefined,
    "/",
  );

  if (loading || !session) {
    return <Spinner />;
  }

  return (
    <main>
      <TTRPGSessionProvider>
        <Session session={session} refetchSession={refetch} />
      </TTRPGSessionProvider>
    </main>
  );
}
