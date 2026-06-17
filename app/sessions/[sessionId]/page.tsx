"use client";

import { getSession } from "@/src/api/ttrpg";
import { Spinner } from "@/src/components/Core/Spinner";
import { Session } from "@/src/components/TTRPG/Session";
import { useFetchData } from "@/src/hooks/useFetchData";
import { useRouteGuard } from "@/src/hooks/useRouteGuard";
import { ToastContext } from "@/src/store/toast";
import { TTRPGSessionProvider } from "@/src/store/ttrpgsession";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";

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

  const { createToast } = useContext(ToastContext);

  const router = useRouter();

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
