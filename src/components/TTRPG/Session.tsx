"use client";

import { CrumbsHeader } from "@/src/components/Core/CrumbsHeader";
import { TextEntrySection } from "@/src/components/TTRPG/TextEntrySection";
import { TTRPGSessionContext } from "@/src/store/ttrpgsession";
import type React from "react";
import { useContext } from "react";
import styles from "./Session.module.css";

type Props = {};

export const Session: React.FC<Props> = () => {
  const { session } = useContext(TTRPGSessionContext);

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
    </div>
  );
};
