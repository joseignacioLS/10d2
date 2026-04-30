"use client";

import { Groups } from "@/src/assets/bbdd";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <p>
        ¡Bienvenido a 10d2! Un espacio para compartir tus partidas de rol en
        texto, con comentarios de toda la party
      </p>
      <h2>Grupos Actuales</h2>
      <h3>Abiertos</h3>
      <ul>
        {
          Groups.filter((g) => g.state === "open").map((g) => {
            return (
              <li key={g.id}>
                <Link href={`/groups/${g.id}`}>{g.name}</Link>
              </li>
            );
          })
        }
      </ul>
      <h3>Cerrados</h3>
      <ul>
        {
          Groups.filter((g) => g.state === "closed").map((g) => {
            return (
              <li key={g.id}>
                <Link href={`/groups/${g.id}`}>{g.name}</Link>
              </li>
            );
          })
        }
      </ul>
      <h3>Inactivos</h3>
      <ul>
        {
          Groups.filter((g) => g.state === "inactive").map((g) => {
            return (
              <li key={g.id}>
                <Link href={`/groups/${g.id}`}>{g.name}</Link>
              </li>
            );
          })
        }
      </ul>
    </main>
  );
}
