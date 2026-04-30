"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "./Core/Button";

import styles from "./UserButton.module.css"
import { login } from "@/src/api/user";

export const UserButton: React.FC<{}> = ({ }) => {
    const user = { username: undefined }
    const [loading, setLoading] = useState(false);


    const handleClick = async () => {
        if (loading) return;
        if (user.username === undefined) {
            try {
                setLoading(true);
                const { data, error } = await login("jose", "");
                if (error) throw error
                if (!data) throw alert("Ha habido un problema con las credenciales");
            }
            catch (err) {
                console.log(err)
            }
            finally {
                setLoading(false);
            }
            return
        }

        window.location.href = "/profile"

    }

    return <Button className={styles.userButton} onClick={handleClick}>
        {loading && "..."}
        {!loading && !user.username && "Login"}
        {!loading && user.username && user.username}
    </Button>
}