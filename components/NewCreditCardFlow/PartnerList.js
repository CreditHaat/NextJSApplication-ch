import Image from "next/image";
import styles from "./PartnerList.module.css";

// Logos referenced below live in the /public folder (e.g. /public/HDFCLogo.png)
// so they can be linked with a plain root-relative path — no import needed.
const logos = [
  { src: "/HDFCLogo.png", alt: "HDFC Bank" },
  { src: "/SBICardLogo.png", alt: "SBI Card" },
  { src: "/YesBankLogo.png", alt: "Yes Bank" },
  { src: "/axisbanklogo.png", alt: "Axis Bank" },
  { src: "/IciciBankLogo.png", alt: "ICICI Bank" },
  { src: "/IDFCFirstBankLogo.png", alt: "IDFC First Bank" },
  { src: "/RupiCardLogo.png", alt: "Rupi Card" },
  { src: "/ANQLogo.png", alt: "ANQ" },
];

// Repeat the set so the marquee loops seamlessly (3x, matching the original)
const marqueeLogos = [...logos, ...logos, ...logos];

export default function PartnerList() {
  // Consistent px/sec speed regardless of how many logos you render —
  // more logos = longer duration, so each one crosses the screen at
  // roughly the same speed instead of the whole loop just taking longer.
  const SECONDS_PER_LOGO = 0.85;
  const marqueeDuration = `${marqueeLogos.length * SECONDS_PER_LOGO}s`;

  return (
    <div className={styles.ppartnerListContainer}>
      {/* <h1 className={styles.ppartnerHeading} style={{ fontWeight: "normal" }}>
        45+ Partner lenders including
      </h1> */}

      <div className={styles.pmarqueeContainer}>
        <div
          className={styles.pmarquee}
          style={{ "--marquee-duration": marqueeDuration }}
        >
          <div className={styles.pmarqueeContent}>
            {marqueeLogos.map((logo, index) => (
              <div className={styles.pbrandboxes} key={`${logo.alt}-${index}`}>
                <div className={styles.pbrandImgWrapper}>
                  <Image
                    className={styles.pbrandImg}
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    sizes="(max-width: 768px) 100px, 120px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className={styles.pviewAllContainer}>
        <a href="/lendingpartners" className={styles.pviewAllLink}>
          View All
        </a>
      </div> */}
    </div>
  );
}
