import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./CardSkeletonLoading.module.css";
const CardSkeletonLoading = () => {
    return (_jsx("div", { className: styles.gridWrapper, children: Array.from({ length: 9 }).map((_, index) => (_jsxs("div", { className: styles.skeletonCard, children: [_jsx("div", { className: `${styles.skeletonBox} ${styles.skeletonTooltip}` }), _jsx("div", { className: `${styles.skeletonBox} ${styles.skeletonImage}` }), _jsx("div", { className: `${styles.skeletonBox} ${styles.skeletonTitle}` }), _jsx("div", { className: `${styles.skeletonBox} ${styles.skeletonText}` }), _jsx("div", { className: `${styles.skeletonBox} ${styles.skeletonText}` }), _jsx("div", { className: `${styles.skeletonBox} ${styles.skeletonButton}` })] }, index))) }));
};
export default CardSkeletonLoading;
