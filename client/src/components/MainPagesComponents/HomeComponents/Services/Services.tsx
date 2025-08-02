import styles from "./Services.module.css";
import box_1 from "../../../../assets/images/box_1.png";
import box_2 from "../../../../assets/images/box_2.png";
import box_3 from "../../../../assets/images/box_3.png";
import BoxCard from "../../../../shared/BoxCard/BoxCard";

interface boxType {
  image: string;
  title: string;
  alt: string;
}
const Services = () => {
  const boxesContent: boxType[] = [
    {
      image: box_1,
      title: "MARKETING SERVICE",
      alt: "MARKETING SERVICE",
    },
    {
      image: box_2,
      title: "FINANCIAL SERVICE",
      alt: "FINANCIAL SERVICE",
    },
    {
      image: box_3,
      title: "DIGITAL CONSULTING",
      alt: "DIGITAL CONSULTING",
    },
  ];
  return (
    <section
      className={`${styles.wrapper} d-f w-100 justify-center align-center f-dir-col`}
      id="market_place"
    >
      <h3 className="title">SERVICES</h3>

      <div className={`align-text ${styles.boxsContainer} d-f align-center`}>
        {boxesContent.map((box, index) => (
          <BoxCard
            key={index}
            image={box.image}
            alt={box.alt}
            title={box.title}
            status="OPEN"
            providerName="Provider name"
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
