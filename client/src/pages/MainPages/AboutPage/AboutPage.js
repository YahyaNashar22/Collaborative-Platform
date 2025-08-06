import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import About from "../../../components/MainPagesComponents/AboutComponents/About/About";
import Hero from "../../../components/MainPagesComponents/AboutComponents/Hero/Hero";
import Quote from "../../../components/MainPagesComponents/AboutComponents/Quote/Quote";
import Strategy from "../../../components/MainPagesComponents/AboutComponents/Strategy/Strategy";
import Subscribe from "../../../components/MainPagesComponents/AboutComponents/Subscribe/Subscribe";
import Vision from "../../../components/MainPagesComponents/AboutComponents/Vision/Vision";
const AboutPage = () => {
    return (_jsxs("div", { className: "d-f f-dir-col justify-between", children: [_jsx(Hero, {}), _jsx(About, {}), _jsx(Quote, {}), _jsxs("div", { className: "container", children: [_jsx(Vision, {}), _jsx(Strategy, {})] }), _jsx(Subscribe, {})] }));
};
export default AboutPage;
