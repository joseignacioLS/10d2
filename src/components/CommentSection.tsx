import { Members, } from "../assets/bbdd";
import type { Comment } from "../types/ttrpg";
import styles from "./CommentSection.module.css";
import { UserTextBubble } from "./Core/UserTextBubble";

type Props = {
    comments: Comment[]
}

export const CommentSection: React.FC<Props> = ({ comments }) => {
    return <section>
        <h2>Comentarios</h2>
        <div className={styles.commentWrapper}>

            {comments.map(({ text, member: memberId, date }, index) => {
                const member = Members.find(({ id }) => id === memberId);
                return <UserTextBubble key={index} width="full">
                    <p>
                        {text}
                    </p>
                    <span><i>{member?.name}</i> - {date.toLocaleString()}</span>
                </UserTextBubble>
            })}
        </div>
    </section >
}