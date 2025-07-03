import Card from "../Card/Card";
import styles from "./cards.module.css";

type CardData = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  offerDeadline: string;
};

type CardsProps = {
  data: CardData[];
  onCardClick: (id: string) => void;
};

const Cards = ({ data, onCardClick }: CardsProps) => {
  return (
    <div className={styles.cardsContainer}>
      {data.map(({ id, title, description, deadline, offerDeadline }) => (
        <Card
          key={id}
          title={title}
          description={description}
          deadline={deadline}
          offerDeadline={offerDeadline}
          onClick={() => onCardClick(id)}
        />
      ))}
    </div>
  );
};

export default Cards;
