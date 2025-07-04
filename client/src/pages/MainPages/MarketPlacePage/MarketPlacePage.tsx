import MarketPlace from "../../../components/MainPagesComponents/MarketPlaceComponents/MarketPlace";
import styles from "./MarketPlacePage.module.css";

const MarketPlacePage = () => {
  return (
    <div
      className={`${styles.wrapper} container d-f f-dir-col justify-between`}
    >
      <MarketPlace />
    </div>
  );
};

export default MarketPlacePage;
