import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from ".//ServiceSkeletonLoading.module.css";
const ServiceSkeletonLoading = () => {
    return (_jsx("div", { className: styles.compactCardsContainer, children: Array.from({ length: 6 }).map((_, index) => (_jsxs("div", { className: styles.compactCard, children: [_jsx("div", { className: styles.skeletonTitle }), _jsx("div", { className: styles.skeletonDesc })] }, index))) }));
};
export default ServiceSkeletonLoading;
