"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../store/user";
import { Button } from "./Core/Button";
import styles from "./UserButton.module.css";

export const UserButton: React.FC<{}> = ({}) => {
  const { username, login } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    if (loading) return;
    if (username === undefined) {
      try {
        setLoading(true);
        const username = prompt("Username") ?? "";
        const password = prompt("Password") ?? "";
        await login(username, password);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
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
