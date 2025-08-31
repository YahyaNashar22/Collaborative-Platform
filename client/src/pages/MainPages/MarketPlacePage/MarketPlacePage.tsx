import MarketPlace from "../../../components/MainPagesComponents/MarketPlaceComponents/MarketPlace";
import { User } from "../../../interfaces/User";
import styles from "./MarketPlacePage.module.css";

interface MarketPlacePageProps {
  user: User | null;
}

const MarketPlacePage: React.FC<MarketPlacePageProps> = ({ user }) => {
  return (
    <div className={`${styles.wrapper} d-f f-dir-col justify-between`}>
      <MarketPlace user={user} />
    </div>
  );
};

export default MarketPlacePage;
