import { Link } from "react-router-dom";
import HeroWrapper from "../../../../shared/HeroWrapper.tsx/HeroWrapper";
import styles from "./Hero.module.css";
import { useOutletContext } from "react-router-dom";
import { User } from "../../../../interfaces/User";

interface contextType {
  user: { user: User | null };
}

const Hero = () => {
  const { user } = useOutletContext<contextType>();

  return (
    <HeroWrapper>
      <div className={"d-f f-dir-col justify-center"}>
        <h1 className={styles.heroText}>
          WELCOME TO <span className="purple">TAKATUF</span>
          <div>PLATFORM</div>
        </h1>
        {!user && (
          <div className={`${styles.boxContainer} d-f align-center`}>
            <div
              className={`${styles.box} ${styles.leftBox} d-f f-dir-col align-center w-100`}
            >
              <Link to={"/auth/provider"} className="w-100 pointer">
                BECOME A PARTNER
              </Link>
              <div>Become a Partner In 6 Steps to grow your business</div>
            </div>
            <div className={`${styles.box} d-f f-dir-col align-center w-100`}>
              <Link to={"/auth/client"} className="w-100 pointer">
                BECOME A CLIENT
              </Link>
              <div>Become a client In 3 Steps to Settle your project</div>
            </div>
          </div>
        )}
      </div>
    </HeroWrapper>
  );
};

export default Hero;
