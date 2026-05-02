"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../store/user";
import { Button } from "./Core/Button";
import styles from "./UserButton.module.css";

export const UserButton: React.FC<{}> = ({}) => {
  const { username, login, openLoginModal } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    if (loading) return;
    if (username === undefined) {
      openLoginModal();
      return;
    }

    router.push("/profile");
  };

  return (
    <>
      <Button className={styles.userButton} onClick={handleClick}>
        {loading && "..."}
        {!loading && !username && "Login"}
        {!loading && username && username.substring(0, 1).toUpperCase()}
      </Button>
    </>
  );
};
