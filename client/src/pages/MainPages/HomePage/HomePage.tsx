import About from "../../../components/MainPagesComponents/HomeComponents/About/About";
import Contact from "../../../components/MainPagesComponents/HomeComponents/Contact/Contact";
import Hero from "../../../components/MainPagesComponents/HomeComponents/Hero/Hero";
import Partners from "../../../components/MainPagesComponents/HomeComponents/Partners/Partners";
import Quote from "../../../components/MainPagesComponents/HomeComponents/Quote/Quote";
import Services from "../../../components/MainPagesComponents/HomeComponents/Services/Services";
import Statistic from "../../../components/MainPagesComponents/HomeComponents/Statistic/Statistic";

const HomePage = () => {
  return (
    <div className=" d-f f-dir-col justify-between">
      <Hero />
      <Quote />
      <div className="container">
        <Services />
        <About />
        <Partners />
      </div>
      <Statistic />
      <Contact />
    </div>
  );
};

export default HomePage;
