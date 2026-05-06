"use client";

import { getMember } from "@/src/api/user";
import { Button } from "@/src/components/Core/Button";
import { CreateGroupModal } from "@/src/components/TTRPG/CreateGroupModal";
import { ToastContext } from "@/src/store/toast";
import { UserContext } from "@/src/store/user";
import { FilledMember } from "@/src/types/ttrpg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { user, logout } = useContext(UserContext);
  const { createToast } = useContext(ToastContext);
  const [userData, setUserData] = useState<FilledMember | null>(null);

  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  useEffect(() => {
    if (!user) {
      createToast("Debes estar logeado para acceder al perfil", "warning");
      router.push("/");
    }
  }, [!user]);

  const getUserData = async () => {
    if (!user) return;
    getMember(user.id).then(({ data }) => {
      if (!data) return;
      setUserData(data);
    });
  };

  useEffect(() => {
    getUserData();
  }, [user]);

  if (!user) {
    return;
  }

  return (
    <main>
      <h2 className="title_with_btn">
        Perfil de {userData?.name}
        <Button onClick={logout}>Logout</Button>
      </h2>
      <h3 className="title_with_btn">
        Tus grupos{" "}
        <Button onClick={() => setShowCreateGroupModal(true)}>+</Button>
      </h3>
      <ul>
        {userData?.groups.map((group) => {
          return (
            <li key={group.id}>
              <Link href={`/groups/${group.id}`}>{group.name}</Link>
            </li>
          );
        })}
      </ul>
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
