"use client";

import { Button } from "@/src/components/Core/Button";
import { UserContext } from "@/src/store/user";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { username, logout } = useContext(UserContext);
  useEffect(() => {
    if (!username) {
      router.push("/");
    }
  }, [username]);
  return (
    <main>
      <h2>Perfil</h2>
      <Button onClick={logout}>Logout</Button>
    </main>
  );
}
