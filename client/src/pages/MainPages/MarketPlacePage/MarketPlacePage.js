import { jsx as _jsx } from "react/jsx-runtime";
import MarketPlace from "../../../components/MainPagesComponents/MarketPlaceComponents/MarketPlace";
import styles from "./MarketPlacePage.module.css";
const MarketPlacePage = () => {
    return (_jsx("div", { className: `${styles.wrapper} d-f f-dir-col justify-between`, children: _jsx(MarketPlace, {}) }));
};
export default MarketPlacePage;
