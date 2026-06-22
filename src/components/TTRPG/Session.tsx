"use client";

import { publishSession } from "@/src/api/ttrpg";
import { Button } from "@/src/components/Core/Button";
import { CrumbsHeader } from "@/src/components/Core/CrumbsHeader";
import { TextEntrySection } from "@/src/components/TTRPG/TextEntrySection";
import { TTRPGSessionContext } from "@/src/store/ttrpgsession";
import { UserContext } from "@/src/store/user";
import Link from "next/link";
import type React from "react";
import { useContext } from "react";
import styles from "./Session.module.css";

type Props = {};

export const Session: React.FC<Props> = () => {
  const { session, refetchSession } = useContext(TTRPGSessionContext);
  const { userData } = useContext(UserContext);

  const isAuthor =
    userData.campaigns.find(({ id }) => id === session?.campaign.id)?.character
      .id === session?.author.id;

  return (
    <div className={styles.sessionSummary}>
      <CrumbsHeader
        title={session?.title || ""}
        crumbs={[
          {
            name: session?.campaign?.short || "",
            href: `/campaigns/${session?.campaign?.id}`,
          },
        ]}
      />
      <p>
        {session?.author.name} //{" "}
        {session?.date.toLocaleString("es", {
          dateStyle: "full",
        })}
      </p>
      <div className="scrolleableBlock">{<TextEntrySection />}</div>
      {isAuthor && (
        <div className={styles.actions}>
          {session?.status === "draft" && (
            <Button>
              <Link
                href={`/campaigns/${session?.campaign.id}/${session?.id}/edit`}
              >
                Editar
              </Link>
            </Button>
          )}
          {session?.status === "draft" && (
            <Button
              onClick={() => {
                publishSession(session?.id).then(() => {
                  refetchSession();
                });
              }}
            >
              Publicar
            </Button>
          )}
          {session?.status === "published" && <Button>Eliminar</Button>}
        </div>
      )}
    </div>
  );
};
