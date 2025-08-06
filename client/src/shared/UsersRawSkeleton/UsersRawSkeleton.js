import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./UsersRawSkeleton.module.css";
const UsersRawSkeleton = (count) => {
    return Array.from({ length: count }).map((_, index) => (_jsxs("tr", { className: styles.skeletonRow, children: [_jsx("td", { children: _jsx("div", { className: styles.shimmerBox }) }), _jsx("td", { children: _jsx("div", { className: styles.shimmerBox }) }), _jsx("td", { children: _jsx("div", { className: styles.shimmerBox }) }), _jsx("td", { children: _jsx("div", { className: styles.shimmerBox }) })] }, index)));
};
export default UsersRawSkeleton;
