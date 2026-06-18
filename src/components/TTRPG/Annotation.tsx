import { UserTextBubble } from "@/src/components/Core/UserTextBubble";

type Props = {
  text: string;
  author: string;
};

export const Annotation: React.FC<Props> = ({ text, author = "Unknown" }) => {
  return (
    <UserTextBubble color={"#5941b1"} width="full">
      <span dangerouslySetInnerHTML={{ __html: text }}></span>
      <span>
        <i> - {author}</i>
      </span>
    </UserTextBubble>
  );
};
