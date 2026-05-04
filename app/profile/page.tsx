"use client";

import { Button } from "@/src/components/Core/Button";
import { CreateGroupModal } from "@/src/components/TTRPG/CreateGroupModal";
import { UserContext } from "@/src/store/user";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { username, logout } = useContext(UserContext);

  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  useEffect(() => {
    if (!username) {
      router.push("/");
    }
  }, [username]);

  return (
    <main>
      <h2>Perfil de {username}</h2>
      <Button onClick={() => setShowCreateGroupModal(true)}>Crear Grupo</Button>
      <Button onClick={logout}>Logout</Button>
      {showCreateGroupModal && (
        <CreateGroupModal onClose={() => setShowCreateGroupModal(false)} />
      )}
    </main>
  );
}
