import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./PhasesSkeletonLoading.module.css";
const PhasesSkeletonLoading = () => (_jsx("div", { className: styles.wrapper, children: Array(3)
        .fill(0)
        .map((_, idx) => (_jsxs("div", { className: styles.phaseCard, children: [_jsxs("div", { className: styles.header, children: [_jsx("div", { className: `${styles.title} ${styles.skeleton}` }), _jsx("div", { className: `${styles.badge} ${styles.skeleton}` })] }), _jsx("div", { className: `${styles.lineShort} ${styles.skeleton}` }), _jsx("div", { className: `${styles.textArea} ${styles.skeleton}` }), _jsxs("div", { className: styles.dateRow, children: [_jsx("div", { className: `${styles.dateField} ${styles.skeleton}` }), _jsx("div", { className: `${styles.dateField} ${styles.skeleton}` })] }), _jsxs("div", { className: styles.footer, children: [_jsx("div", { className: `${styles.status} ${styles.skeleton}` }), _jsx("div", { className: `${styles.button} ${styles.skeleton}` })] })] }, idx))) }));
export default PhasesSkeletonLoading;
