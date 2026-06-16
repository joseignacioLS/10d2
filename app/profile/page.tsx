"use client";

import { Button } from "@/src/components/Core/Button";
import { Card } from "@/src/components/Core/Card";
import { Spinner } from "@/src/components/Core/Spinner";
import { useRouteGuard } from "@/src/hooks/useRouteGuard";
import { UserContext } from "@/src/store/user";
import Link from "next/link";
import { useContext } from "react";

export default function Home() {
  const { userData, logout } = useContext(UserContext);

  const { loading } = useRouteGuard(false, null, true, undefined, "/");

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <h2>Perfil de {userData?.username}</h2>
      <Card>
        <>
          <h3>Tus Campañas</h3>
          <ul>
            {userData?.campaigns?.map((campaign) => {
              return (
                <li key={campaign.id}>
                  <Link href={`/campaigns/${campaign.id}`}>
                    {campaign.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      </Card>
      <Button onClick={logout} className={"danger"}>
        Logout
      </Button>
    </main>
  );
}
