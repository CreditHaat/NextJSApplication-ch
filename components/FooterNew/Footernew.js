"use client";

import React from "react";
import Link from "next/link";
import { Roboto } from "next/font/google";
import styles from "./Footernew.module.css";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const Footernew = () => {
  return (
    <footer className={`${styles.footer} ${roboto.className}`}>
      <div className={styles.companyText}>
        <h3>
         CreditHaat is a brand of Vibhuprada Services Private Limited, registered in India under the Companies Act, 2013 (CIN - U74999PN2020PTC194528)
        </h3>
      </div>

      <div className={styles.tandC}>
        <div>
          <Link href="https://www.credithaat.com/termsC">Terms & Conditions</Link>
        </div>

        <div>
          <Link href="https://www.credithaat.com/privacy">Privacy Policy</Link>
        </div>
      </div>

      <div className={styles.lastChildsec}>
        We use cookies to improve your experience and analyze usage. By
        continuing, you agree to our {" "}
        <Link href="https://www.credithaat.com/privacy" className={styles.privacyLink}>
          Privacy Policy.
        </Link>
      </div>
    </footer>
  );
};

export default Footernew;