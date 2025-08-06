import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import About from "../../../components/MainPagesComponents/HomeComponents/About/About";
import Contact from "../../../components/MainPagesComponents/HomeComponents/Contact/Contact";
import Hero from "../../../components/MainPagesComponents/HomeComponents/Hero/Hero";
import Quote from "../../../components/MainPagesComponents/HomeComponents/Quote/Quote";
import Services from "../../../components/MainPagesComponents/HomeComponents/Services/Services";
import Statistic from "../../../components/MainPagesComponents/HomeComponents/Statistic/Statistic";
const HomePage = () => {
    return (_jsxs("div", { className: " d-f f-dir-col justify-between", children: [_jsx(Hero, {}), _jsx(Quote, {}), _jsxs("div", { className: "container", children: [_jsx(Services, {}), _jsx(About, {})] }), _jsx(Statistic, {}), _jsx(Contact, {})] }));
};
export default HomePage;
