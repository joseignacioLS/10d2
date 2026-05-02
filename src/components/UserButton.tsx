"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { useContext } from "react";
import { UserContext } from "../store/user";
import { Button } from "./Core/Button";
import styles from "./UserButton.module.css";

export const UserButton: React.FC<{}> = ({}) => {
  const { username, openLoginModal } = useContext(UserContext);
  const router = useRouter();

  const handleClick = async () => {
    if (username === undefined) {
      openLoginModal();
      return;
    }
    router.push("/profile");
  };

  return (
    <>
      <Button className={styles.userButton} onClick={handleClick}>
        {username?.substring(0, 1).toUpperCase() || <img src="/chicken.svg" />}
      </Button>
    </>
  );
};
