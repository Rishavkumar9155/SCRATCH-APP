import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Loading = () => {
  const backgroundRef = useRef(null);
  const textRef = useRef(null);
  const creatorRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      backgroundRef.current,
      { x: "-100%" },
      { x: "0%", duration: 1, ease: "power2.inOut" }
    );

    gsap.fromTo(
      textRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, delay: 1, ease: "back.out(1.7)" }
    );

    gsap.fromTo(
      creatorRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, delay: 1.5, ease: "back.out(1.7)" }
    );

    gsap.to(backgroundRef.current, {
      x: "100%",
      duration: 1,
      delay: 3,
      ease: "power2.inOut",
      onComplete: () => {
        backgroundRef.current.style.transform = "translateX(0)";
      }
    });
  }, []);

  return (
    <div className="loading-container z-[99] bg-gradient-to-r from-blue-500 to-purple-600 h-screen flex items-center justify-center" ref={backgroundRef}>
      <h1 ref={textRef} className="loading-text text-[15vh] font-mono text-black uppercase">
        PASTE APP BY RISHAV
      </h1>
    </div>
  );
};

export default Loading;
