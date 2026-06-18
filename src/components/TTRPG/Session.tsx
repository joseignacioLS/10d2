"use client";

import { CrumbsHeader } from "@/src/components/Core/CrumbsHeader";
import { TextEntrySection } from "@/src/components/TTRPG/TextEntrySection";
import { TTRPGSessionContext } from "@/src/store/ttrpgsession";
import { UserContext } from "@/src/store/user";
import { SessionDetail } from "@/src/types/ttrpg";
import type React from "react";
import { useContext, useEffect } from "react";
import styles from "./Session.module.css";

type Props = {
  session: SessionDetail;
};

export const Session: React.FC<Props> = ({ session }) => {
  const { userData } = useContext(UserContext);

  const { updateAnnotatePermission } = useContext(TTRPGSessionContext);

  useEffect(() => {
    updateAnnotatePermission(
      ["player", "GM"].includes(userData.permissions[session.campaign.id]),
    );
  }, [session.campaign.id, userData.permissions]);

  return (
    <div className={styles.sessionSummary}>
      <CrumbsHeader
        title={session.title || ""}
        crumbs={[
          {
            name: session.campaign?.short || "",
            href: `/campaigns/${session.campaign?.id}`,
          },
        ]}
      />
      <p>
        {session.author.name} //{" "}
        {session.date.toLocaleString("es", {
          dateStyle: "full",
        })}
      </p>
      <div className="scrolleableBlock">
        {session && (
          <TextEntrySection
            text={session.summary}
            annotations={session.annotations}
          />
        )}
      </div>
    </div>
  );
};
