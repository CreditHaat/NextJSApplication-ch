import React, { useEffect } from "react";

const PortfolioPopup = ({ availablePortfolioValue, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        background: "white", // Full white background
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        zIndex: "1000",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Green congratulations text */}
      <h3 style={{ color: "#0AAC57", fontSize: "18px", fontWeight: "bold", marginBottom: "15px" }}>
        CONGRATULATIONS!
      </h3>

      {/* Main message */}
      <h2 style={{ color: "#111", fontSize: "26px", fontWeight: "bold", marginBottom: "10px" }}>
        You're eligible for <br /> a loan amount of
      </h2>

      {/* Loan Amount */}
      <p style={{ fontSize: "40px", fontWeight: "bold", color: "#0AAC57", margin: "10px 0" }}>
        ₹{availablePortfolioValue}
      </p>

      {/* Continue Button */}
      <button
        onClick={onClose}
        style={{
          marginTop: "20px",
          padding: "15px 30px",
          background: "#6200EA",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        Continue
      </button>
    </div>
  );
};

export default PortfolioPopup;
