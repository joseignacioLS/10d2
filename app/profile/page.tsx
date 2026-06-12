"use client";

import { Events } from "@/src/assets/bbdd";
import { Button } from "@/src/components/Core/Button";
import { Card } from "@/src/components/Core/Card";
import { ToastContext } from "@/src/store/toast";
import { UserContext } from "@/src/store/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { token, userData, logout } = useContext(UserContext);
  const { createToast } = useContext(ToastContext);

  useEffect(() => {
    if (!token) {
      createToast("Debes estar logeado para acceder al perfil", "warning");
      router.push("/");
    }
  }, [token]);

  if (!token) {
    return;
  }

  console.log({ userData });

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
