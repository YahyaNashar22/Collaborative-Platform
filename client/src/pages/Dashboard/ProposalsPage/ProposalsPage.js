import { jsx as _jsx } from "react/jsx-runtime";
import Proposals from "../../../components/DashboadComponents/Proposals/Proposals";
import styles from "./ProposalsPage.module.css";
const ProposalsPage = () => {
    return (_jsx("div", { className: `${styles.wrapper} d-f w-100`, children: _jsx(Proposals, {}) }));
};
export default ProposalsPage;
