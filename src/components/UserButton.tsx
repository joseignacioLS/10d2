import { useStore } from "@nanostores/react";
import type React from "react";
import { useState } from "react";
import { login } from "../api/user";
import { user } from "../store/user";
import { Button } from "./Core/Button";

import styles from "./UserButton.module.css"

export const UserButton: React.FC<{}> = ({ }) => {
    const $user = useStore(user);
    const [loading, setLoading] = useState(false);


    const handleClick = async () => {
        if (loading) return;
        if ($user.username === undefined) {
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
        {!loading && !$user.username && "Login"}
        {!loading && $user.username && $user.username}
    </Button>
}