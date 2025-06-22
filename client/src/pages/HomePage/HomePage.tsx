import About from "../../components/HomeComponents/About/About";
import Contact from "../../components/HomeComponents/Contact/Contact";
import Hero from "../../components/HomeComponents/Hero/Hero";
import Partners from "../../components/HomeComponents/Partners/Partners";
import Quote from "../../components/HomeComponents/Quote/QuoteComponent";
import Services from "../../components/HomeComponents/Services/Services";
import Statistic from "../../components/HomeComponents/Statistic/Statistic";

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
