import About from "../../../components/MainPagesComponents/AboutComponents/About/About";
import Hero from "../../../components/MainPagesComponents/AboutComponents/Hero/Hero";
import Quote from "../../../components/MainPagesComponents/AboutComponents/Quote/Quote";
import Strategy from "../../../components/MainPagesComponents/AboutComponents/Strategy/Strategy";
import Subscribe from "../../../components/MainPagesComponents/AboutComponents/Subscribe/Subscribe";
import Vision from "../../../components/MainPagesComponents/AboutComponents/Vision/Vision";

const AboutPage = () => {
  return (
    <div className="d-f f-dir-col justify-between">
      <Hero />
      <About />
      <Quote />
      <div className="container">
        <Vision />
        <Strategy />
      </div>
      <Subscribe />
    </div>
  );
};

export default AboutPage;
