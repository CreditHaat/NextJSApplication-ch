"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./ZypeStatus.module.css";

export default function ZypeStatus() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mobile = searchParams.get("mobile");

  const [result, setResult] = useState(null);

  useEffect(() => {
    if (mobile) {
      fetchStatus(mobile);
    }
  }, [mobile]);

  const fetchStatus = async (mobileNumber) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}api/zype/status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=",
          },
          body: JSON.stringify({ mobile: mobileNumber }),
        }
      );

      const data = await response.json();
      setResult(data);
      console.log("Zype status data:" ,data);
    } catch (error) {
      console.error("Zype status error:", error);
      setResult({ status: "error" });
    }
  };

  if (!result) {
    return (
      <div className={styles.containerCenter}>
        Loading...
      </div>
    );
  }
    const redirectToOtherOffers = () => {
    window.location.href = `https://app.credithaat.com/embedded_journey?sso=yes&mobilenumber=${mobile}&chaid=true`;
  };

  // SUCCESS
  if (result.status === 5) {
    return (
      <div className={`${styles.containerCenter} ${styles.bgSuccess}`}>
        <div className={styles.card}>
          <div className={styles.iconSuccess}>✔</div>
          <h1 className={styles.title}>Success!</h1>
          <p className={styles.subtitle}>Your loan has been disbursed</p>
          {result?.disbursed && (
            <div className={styles.amountBadge}>
              <p className={styles.amountText}>₹{result.disbursed}</p>
            </div>
          )}
           {/* <button
          className={styles.btnSuccess}
          onClick={redirectToOtherOffers}
        >
          View Other Loan Offers
        </button> */}
          {/* <button
            className={styles.btnSuccess}
            onClick={() => router.push("/")}
          >
            Go to Home
          </button> */}
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.containerCenter} ${styles.bgReject}`}>
      <div className={styles.card}>
        <div className={styles.iconReject}>✖</div>

        <h1 className={styles.title}>Rejected</h1>
        <p className={styles.subtitle}>
          Unfortunately, your application was not approved.
        </p>

        <p className={styles.subtitle}>
          <strong>Would you like to check offers from other lenders?</strong>
        </p>

        <button
          className={styles.btnReject}
          onClick={redirectToOtherOffers}
        >
          View Other Loan Offers
        </button>
      </div>
    </div>
  );
}

