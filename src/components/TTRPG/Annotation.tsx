import { Button } from "@/src/components/Core/Button";
import { UserTextBubble } from "@/src/components/Core/UserTextBubble";

import { TTRPGSessionContext } from "@/src/store/ttrpgsession";
import { UserContext } from "@/src/store/user";
import { useContext } from "react";
import styles from "./Annotation.module.css";

type Props = {
  id: string;
  text: string;
  author: {
    id: string;
    name: string;
  };
};

export const Annotation: React.FC<Props> = ({
  id,
  text,
  author = { id: undefined, name: "Unknown" },
}) => {
  const { userData } = useContext(UserContext);
  const { session, handleDeleteAnnotation } = useContext(TTRPGSessionContext);
  const isAuthor =
    userData.campaigns.find(({ id }) => id === session?.campaign.id)?.character
      .id === author.id;

  return (
    <UserTextBubble color={"#5941b1"} width="full">
      <span dangerouslySetInnerHTML={{ __html: text }}></span>
      <span>
        <i> - {author.name}</i>
      </span>
      {isAuthor && (
        <Button
          onClick={() => handleDeleteAnnotation(id)}
          className={styles.deleteBtn}
        >
          Eliminar
        </Button>
      )}
    </UserTextBubble>
  );
};
