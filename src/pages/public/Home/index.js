import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import styles from "./Home.module.scss";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import SpinLogoBlack from "../../../static/images/logo/spinByLablacoLogoBlack.svg";

const Home = () => {
  const [currentTab, setCurrentTab] = useState(null);
  const { appTitles } = useSelector((state) => state.authReducer);

  return (
      <div className={styles.Home}>
        <Header />
        <div className={styles.main}>
          <div
              className={`${styles.section} ${styles.spin} ${
                  currentTab === "spin" ? styles.active : ""
              }`}
              onClick={() => setCurrentTab("spin")}
          >
            <img src={SpinLogoBlack} width="130px" alt="spinLogoBlack" />
            <p>
              SPIN is shaping the next-generation lifestyle of Circular Fashion
              for everyone in a global platform powered by Blockchain.
              <br />
              <br />
              Through SPIN, users can list and tokenize pre-owned items with
              traceable digital ownership across circular models : swap, share,
              borrow, and trade back to your favorite brands.
              <br />
              <br />
              Start to SPIN your items and make a positive impact on fashion,
              today.
            </p>
            <a
                href="https://spin.lablaco.com/login"
                target="_blank"
                rel="noopener noreferrer"
            >
              <Button color="white" size="large">
                START SPINNING
              </Button>
            </a>
          </div>
          <div
              className={`${styles.section} ${styles.lplus} ${
                  currentTab === "lplus" ? styles.active : ""
              }`}
              onClick={() => setCurrentTab("lplus")}
          >
            <h2>{appTitles.spinConnect}</h2>
            <p>
              A Circular-Retail-as-a-Service (CRaaS) platform for brands and
              retailers to easily tokenize products on Blockchain, activating
              circular business models in a few clicks.
              <br />
              <br />
              {appTitles.spinConnect} enables data traceability of product origin,
              authenticity, environmental impact, and individual ownership over
              the whole product journey, in a universal circular economy.
              <br />
              <br />
              Make omni-channel circularity the next wave of your business growth.
            </p>
            <a
                href="https://lplus.lablaco.com/login"
                target="_blank"
                rel="noopener noreferrer"
            >
              <Button color="white" size="large">
                START TOKENIZING
              </Button>
            </a>
          </div>
          <div
              className={`${styles.section} ${styles.cfs} ${
                  currentTab === "cfs" ? styles.active : ""
              }`}
              onClick={() => setCurrentTab("cfs")}
          >
            <h2>CFS</h2>
            <p>
              Circular Fashion Summit is a Global Collective Action Summit,
              supporting the United Nations Sustainable Development Goals 2030.
              <br />
              <br />
              We gather leaders of change in Design, Technology and Sustainability
              to accelerate circular fashion, and set three measurable goals to be
              achieved collectively every 12 months.
              <br />
              <br />
              Let’s empower impact design with evolutionary partnerships for a
              better fashion.
            </p>
            <a
                href="https://www.circularfashionsummit.com/"
                target="_blank"
                rel="noopener noreferrer"
            >
              <Button color="white" size="large">
                JOIN THE ACTION
              </Button>
            </a>
          </div>
        </div>
      </div>
  );
};

export default Home;
