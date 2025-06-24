import styles from "./Vision.module.css";

import logo from "../../../../assets/icons/logo_white.png";
import vision from "../../../../assets/icons/vision_ico.png";
import mission from "../../../../assets/icons/mission_ico.png";
import expertise from "../../../../assets/icons/project_management_ico.png";

const Vision = () => {
  return (
    <section
      className={`${styles.wrapper} d-f align-center justify-center`}
      id="vision"
    >
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
        <div className={styles.leftText}>
          YOUR GATEWAY <br />
          <div>
            TO <span className="purple"> SAUDI</span>
          </div>
          <div className="purple">ARABIA'S</div>
          <div>BUSINESS</div>
          <div className={`circled ${styles.landscape}`}>LANDSCAPE</div>
          <br />
          <div className={styles.dots}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div className={`align-text ${styles.right}`}>
        {/* vision block */}
        <div className={styles.block}>
          <h3 className={styles.blockTitle}>
            <span className={styles.blockIcon}>
              <img src={vision} alt="vision" width={40} height={40} />
            </span>
            VISION
          </h3>
          <div className={styles.blockText}>
            To be the premier destination for specialized consulting in
            <span className="purple"> Saudi Arabia </span> by providing an
            integrated platform that allows individuals and companies to access
            a select group of experts, thereby fostering
            <span className="purple"> innovation </span>, supporting economic
            growth, and contributing to the achievement of
            <span className="purple"> Vision 2030's </span> objectives.
          </div>
        </div>
        {/* mission block */}
        <div className={styles.block}>
          <h3 className={styles.blockTitle}>
            <span className={styles.blockIcon}>
              <img src={mission} alt="mission" width={40} height={40} />
            </span>
            MISSION
          </h3>
          <div className={styles.blockText}>
            We are committed to empowering individuals and companies by offering{" "}
            <span className="purple">high-quality consulting solutions</span>{" "}
            and connecting them with the best experts locally and
            internationally, ensuring{" "}
            <span className="purple">professionalism and competitiveness.</span>{" "}
            We strive to facilitate strategic decision-making, enhance business
            success, and support their expansion in local and global markets.
          </div>
        </div>
        {/* expertise block  */}
        <div className={styles.block}>
          <h3 className={styles.blockTitle}>
            <span className={styles.blockIcon}>
              <img src={expertise} alt="expertise" width={40} height={40} />
            </span>
            EXPERTISE
          </h3>
          <div className={styles.blockText}>
            Our team consists of{" "}
            <span className="purple">top professionals</span> and industry
            experts dedicated to providing strategic solutions tailored to your
            business needs. With diverse expertise across multiple sectors, we
            ensure that our clients receive the best consultancy services to
            drive success and{" "}
            <span className="purple">sustainable growth.</span>
          </div>
        </div>
      </div>
      <p className={styles.consultingText}>CONSULTING</p>
    </section>
  );
};

export default Vision;
