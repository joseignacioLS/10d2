import { UserTextBubble } from "@/src/components/Core/UserTextBubble";
import type { Comment } from "@/src/types/ttrpg";

import styles from "./CommentSection.module.css";

type Props = {
  comments: Comment[];
};

export const CommentSection: React.FC<Props> = ({ comments }) => {
  return (
    <section>
      <h2>Comentarios</h2>
      <div className={styles.commentWrapper}>
        {comments.map(({ text, member: memberId, date }, index) => {
          return (
            <UserTextBubble key={index} width="full">
              <p>{text}</p>
              <span>
                <i>-</i> - {date.toLocaleString()}
              </span>
            </UserTextBubble>
          );
        })}
      </div>
    </section>
  );
};
