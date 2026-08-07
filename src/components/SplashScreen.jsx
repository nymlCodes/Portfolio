'use client'

import { useEffect, useState } from "react";

export default function SplashScreen({ onFinished }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Disable background scrolling while splash screen is active
    document.body.style.overflow = "hidden";

    // Start fading after 2.2 seconds
    const fadeTimer = setTimeout(() => setFadeOut(true), 2200);
    // Fully remove after fade completes
    const doneTimer = setTimeout(() => onFinished?.(), 3200);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onFinished]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0a0a0f",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 1s ease",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      <p style={{
        color: "#7c3aed",
        letterSpacing: "0.4em",
        fontSize: "0.75rem",
        textTransform: "uppercase",
        marginBottom: "16px"
      }}>
        Welcome to my portfolio
      </p>
      <h1 style={{
        fontSize: "clamp(3rem, 10vw, 7rem)",
        fontWeight: 800,
        color: "#fff",
        lineHeight: 1,
        marginBottom: "16px"
      }}>
        Neyamul{" "}
        <span style={{
          background: "linear-gradient(135deg, #7c3aed, #a855f7)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Islam
        </span>
      </h1>
      <p style={{
        color: "#94a3b8",
        fontWeight: 300,
        fontSize: "1.1rem"
      }}>
        MERN-Stack Developer 
      </p>
    </div>
  );
}