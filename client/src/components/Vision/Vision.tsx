import styles from "./Vision.module.css";

import logo from "../../assets/icons/logo_white.png";
import vision from "../../assets/icons/vision_ico.png";
import mission from "../../assets/icons/mission_ico.png";
import expertise from "../../assets/icons/project_management_ico.png";

const Vision = () => {
  return (
    <section className={styles.wrapper} id="vision">
      <div className={styles.left}>
        <div className={styles.logoContainer}>
          <img
            src={logo}
            className={styles.logo}
            width={72}
            height={72}
            alt="logo"
          />
        </div>
        <p className={styles.leftText}>
          WE ARE HERE TO <br /> <span className={styles.purple}>EMPOWER</span>{" "}
          YOUR <br /> BUSINESS & TAKE IT <br />{" "}
          <span className={styles.circled}>
            TO{" "}
            <span className={styles.purple}>
              THE NEXT LEVEL<span className={styles.circle}></span>! <br />
            </span>
          </span>
          <span className={styles.dots}>
            {" "}
            <span></span>
            <span></span>
            <span></span>
          </span>
        </p>
      </div>
      <div className={styles.right}>
        {/* vision block */}
        <div className={styles.block}>
          <h3 className={styles.blockTitle}>
            <span className={styles.blockIcon}>
              <img src={vision} alt="vision" width={40} height={40} />
            </span>
            VISION
          </h3>
          <p className={styles.blockText}>
            Our vision is “to be the leading provider of comprehensive
            professional services, empowering businesses from various sectors.
            Our primary focus is on delivering exceptional customer experiences
            and helping our clients track and enhance the worth of their
            businesses.”{" "}
          </p>
        </div>
        {/* mission block */}
        <div className={styles.block}>
          <h3 className={styles.blockTitle}>
            <span className={styles.blockIcon}>
              <img src={mission}  alt="mission" width={40} height={40} />
            </span>
            MISSION
          </h3>
          <p className={styles.blockText}>
            We differentiate ourselves by leveraging our extensive network of
            international partners to offer a global perspective and implement
            international best practices. Our mission is to provide solutions
            tailored to your business needs, whether it's strategic planning or
            seamless implementation. We are committed to standing by your side,
            providing support and guidance necessary to achieve your goals.
          </p>
        </div>
        {/* expertise block  */}
        <div className={styles.block}>
          <h3 className={styles.blockTitle}>
            <span className={styles.blockIcon}>
              <img src={expertise} alt="expertise" width={40} height={40} />
            </span>
            EXPERTISE
          </h3>
          <p className={styles.blockText}>
            We are a team of dynamic consultants with diverse expertise in
            finance, accounting, tax, analysis, HR, and platform/APP design. Our
            passion lies in sharing our extensive experience and knowledge to
            help you achieve remarkable success in your business. Our proven
            track record demonstrates that effective communication and expert
            collaboration are the key drivers to enhance your bottom line. Join
            forces with us and witness the transformative power of our
            collective expertise on your business!
          </p>
        </div>
      </div>
      <p className={styles.consultingText}>CONSULTING</p>
    </section>
  );
};

export default Vision;
