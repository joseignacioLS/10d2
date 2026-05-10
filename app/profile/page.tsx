"use client";

import { Events } from "@/src/assets/bbdd";
import { Button } from "@/src/components/Core/Button";
import { Card } from "@/src/components/Core/Card";
import { CreateGroupModal } from "@/src/components/TTRPG/CreateGroupModal";
import { ToastContext } from "@/src/store/toast";
import { UserContext } from "@/src/store/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { token, userData, logout } = useContext(UserContext);
  const { createToast } = useContext(ToastContext);

  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  useEffect(() => {
    if (!token) {
      createToast("Debes estar logeado para acceder al perfil", "warning");
      router.push("/");
    }
  }, [token]);

  const events = Events.filter(({ origin }) => {
    return userData?.subscriptions.includes(origin);
  });

  if (!token) {
    return;
  }

  return (
    <main>
      <h2>Perfil de {userData?.username}</h2>
      <Card>
        <>
          <h3>Tus grupos </h3>
          <ul>
            {userData?.groups.map((group) => {
              return (
                <li key={group.id}>
                  <Link href={`/groups/${group.id}`}>{group.name}</Link>
                </li>
              );
            })}
          </ul>
          <Button onClick={() => setShowCreateGroupModal(true)}>
            Crear nuevo grupo
          </Button>
        </>
      </Card>
      <Card>
        <>
          <h3>Novedades de tus subscripciones</h3>
          {events.length > 0 ? (
            <ul>
              {events.map((event) => {
                return <li key={event.id}>{event.message}</li>;
              })}
            </ul>
          ) : (
            <p>No hay novedades en tus subscripciones</p>
          )}
        </>
      </Card>
      <Card>
        <Button onClick={logout} className={"danger"}>
          Logout
        </Button>
      </Card>
      {showCreateGroupModal && (
        <CreateGroupModal
          onClose={() => {
            setShowCreateGroupModal(false);
          }}
        />
      )}
    </main>
  );
}
