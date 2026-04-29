import { Characters, type Annotation } from "../assets/bbdd";

type Props = { annotations: Annotation[], showAnnotations: boolean }

export const Annotations: React.FC<Props> = ({ annotations, showAnnotations }) => {
    return <span className={`annotations-wrapper ${showAnnotations ? "show" : ""}`}>
        {
            annotations.map(({ text, character }, index) => {
                const char = Characters.find((c) => c.id === character);
                return <span
                    key={index}
                    className={`annotation`}
                    style={{
                        backgroundColor: char?.color
                    }}
                >
                    <img className="annotation-avatar" src="/cat.svg" />
                    <span>
                        <span>
                            {text}
                        </span>
                        <span><i> - {char?.name}</i></span>
                    </span>
                </span>
            })
        }
    </span>
}