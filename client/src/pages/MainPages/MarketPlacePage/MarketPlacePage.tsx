import MarketPlace from "../../../components/MainPagesComponents/MarketPlaceComponents/MarketPlace";
import styles from "./MarketPlacePage.module.css";

interface MarketPlacePageProps {
  userId: string;
}

const MarketPlacePage: React.FC<MarketPlacePageProps> = ({ userId }) => {
  return (
    <div className={`${styles.wrapper} d-f f-dir-col justify-between`}>
      <MarketPlace userId={userId} />
    </div>
  );
};

export default MarketPlacePage;
