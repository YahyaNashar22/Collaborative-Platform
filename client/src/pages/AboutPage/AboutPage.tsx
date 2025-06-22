import Hero from "../../components/AboutComponents/Hero/Hero";
import About from "../../components/AboutComponents/About/About";
import Quote from "../../components/AboutComponents/Quote/Quote";
import Vision from "../../components/AboutComponents/Vision/Vision";
import Strategy from "../../components/AboutComponents/Strategy/Strategy";
import Subscribe from "../../components/AboutComponents/Subscribe/Subscribe";

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
