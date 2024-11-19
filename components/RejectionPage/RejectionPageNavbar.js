import React from "react";
import "./RejectionPageNavbar.css"; // Import your CSS file for styling
import i from "./Rejectionpageimages/ch-logo.png";
import f from "./Rejectionpageimages/Formerly_BlackBG.png";
import Image from "next/image";

function RejectionPageNavbar() {
  return (
    <nav className="partner-navbar">
      <div className="partner-navbar-container">
        {/* Logo 2 */}
        <div className="partner-logo">
          <Image
            className="nav-logo"
            width={45}
            height={65}
            src={i}
            alt="Logo 2"
            layout="intrinsic"
          />
        </div>
      </div>
    </nav>
  );
}

export default RejectionPageNavbar;