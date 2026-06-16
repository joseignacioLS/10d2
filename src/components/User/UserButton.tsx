"use client";

import { Button } from "@/src/components/Core/Button";
import { UserContext } from "@/src/store/user";
import { useRouter } from "next/navigation";
import type React from "react";
import { useContext } from "react";
import styles from "./UserButton.module.css";

export const UserButton: React.FC<{}> = ({}) => {
  const { token, userData, openLoginModal } = useContext(UserContext);
  const router = useRouter();

  const handleClick = async () => {
    if (!token) {
      openLoginModal();
      return;
    }
    router.push("/profile");
  };

  return (
    <Button className={styles.userButton} onClick={handleClick}>
      {userData.state === "login" && (
        <span>{userData?.username?.substring(0, 1).toUpperCase()}</span>
      )}
      {userData.state === "logout" && <img src="/chicken.svg" />}
      {userData.state === "loading" && <img src="/dice.svg" />}
    </Button>
  );
};
