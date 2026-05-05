import { UserTextBubble } from "@/src/components/Core/UserTextBubble";
import type { Character } from "@/src/types/ttrpg";

type Props = {
  text: string;
  character?: Character;
};

export const Annotation: React.FC<Props> = ({
  text,
  character = { color: "#ddd", name: "Unknown" },
}) => {
  return (
    <UserTextBubble color={character?.color}>
      <span>{text}</span>
      <span>
        <i> - {character?.name}</i>
      </span>
    </UserTextBubble>
  );
};
