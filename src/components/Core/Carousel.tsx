import styles from "./Carousel.module.css";

type Props = {
  cards: {
    text: string;
    img: string;
  }[];
};

export const Carousel: React.FC<Props> = ({ cards }) => {
  console.log(cards);
  return (
    <div className={styles.carouselWrapper}>
      {cards.map(({ text, img }) => {
        return (
          <div
            key={img}
            style={{
              backgroundImage: `url("${img}")`,
            }}
          >
            <p>{text}</p>
          </div>
        );
      })}
    </div>
  );
};
