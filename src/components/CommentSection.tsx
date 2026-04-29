import { Members, type Comment } from "../assets/bbdd";

type Props = {
    comments: Comment[]
}

export const CommentSection: React.FC<Props> = ({ comments }) => {
    return <section>
        <h2>Comentarios</h2>
        <div className="comment-wrapper">

            {comments.map(({ text, member: memberId, date }, index) => {
                const member = Members.find(({ id }) => id === memberId);
                return <div key={index} className="comment" >
                    <div>
                        <p>
                            {text}
                        </p>
                        
                            <span><i>{member?.name}</i> - {date.toLocaleString()}</span>
                    </div>
                </div>
            })}
        </div>
    </section>
}