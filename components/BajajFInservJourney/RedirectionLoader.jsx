import React from "react";
import {Roboto} from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

function RedirectionLoader() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999, // Ensure it's on top of other content
      }}
    >
      {/* Loader Container */}
      <div
        style={{
          backgroundColor: "#ffffff", // White background
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)", // Soft box shadow
          textAlign: "center", // Center align text
          maxWidth: "300px", // Limit maximum width
          position: "relative", // Relative positioning for nested elements
        }}
      >
         <div className={`${roboto.className}`}>
        {/* Loader Text */}
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "1.5rem", margin: "0", color: "#3e2780" }}>
            Redirecting
          </h2>
          <p style={{ fontSize: "1rem", margin: "10px 0", color: "#555" }}>
            Please wait while we redirect ......
          </p>
        </div>
</div>
        {/* Horizontal Loader Bar */}
        <div
          style={{
            width: "100%",
            height: "8px",
            backgroundColor: "#f3f3f3", // Light gray background for loader bar
            borderRadius: "5px", // Rounded corners
            overflow: "hidden", // Hide overflow
          }}
        >
          <div
            style={{
              width: "50%", // Initial width for animation
              height: "100%",
              backgroundColor: "#3e2780", // Blue color for loader progress
              animation: "progress 2s ease-in-out infinite", // Animation for loader progress
            }}
          />
        </div>
      </div>

      {/* CSS Animation for Loader Progress */}
      <style>
        {`
          @keyframes progress {
            0% { width: 0; }
            100% { width: 100%; }
          }
        `}
      </style>
    </div>
  );
}

export default RedirectionLoader;