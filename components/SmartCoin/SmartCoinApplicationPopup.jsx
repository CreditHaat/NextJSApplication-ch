import React from "react";

const SmartCoinApplicationPopup = ({ link }) => {
  const handleButtonClick = () => {
    window.location.href = link;
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.7)", // Adjust opacity and color as needed
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999, // Ensure it's on top of other content
        }}
      >
        <div
          style={{
            position: "relative",
            backgroundColor: "white", // Optional: Background color for loader content
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", // Optional: Box shadow for loader content
            animation: "fadeIn 1s ease-out",
            textAlign: "center", // Center text
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "green",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontSize: "24px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              animation: "bounceIn 0.5s ease-out",
              margin: "0 auto", // Center the checkmark
              marginBottom: "20px",
            }}
          >
            ✓
          </div>
          Application Created successfully
          <br />
          <center>
            <button
              className="btn btn-primary"
              style={{
                color: "white",
                backgroundColor: "#3e2780",
                marginTop: "20px",
                border: "none",
              }}
              onClick={handleButtonClick}
            >
              Click to complete final step
            </button>
          </center>
        </div>
        <style>
          {`
                @keyframes fadeIn {
                  from {
                    opacity: 0;
                    transform: scale(0.9);
                  }
                  to {
                    opacity: 1;
                    transform: scale(1);
                  }
                }
      
                @keyframes bounceIn {
                  0% {
                    opacity: 0;
                    transform: scale(0.3);
                  }
                  50% {
                    opacity: 1;
                    transform: scale(1.05);
                  }
                  70% {
                    transform: scale(0.9);
                  }
                  100% {
                    transform: scale(1);
                  }
                }
              `}
        </style>
      </div>
    </>
  );
};

export default SmartCoinApplicationPopup;
