import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./styles/WalkingCharacter.css";

gsap.registerPlugin(ScrollTrigger);

const WalkerSVG = () => (
  <svg
    className="walker-svg"
    viewBox="0 0 60 120"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <circle cx="30" cy="14" r="12" stroke="#c2a4ff" strokeWidth="3" />
    <line x1="30" y1="26" x2="30" y2="65" stroke="#c2a4ff" strokeWidth="3" strokeLinecap="round" />
    <line x1="30" y1="38" x2="8" y2="55" stroke="#c2a4ff" strokeWidth="3" strokeLinecap="round" className="arm-left" />
    <line x1="30" y1="38" x2="52" y2="30" stroke="#c2a4ff" strokeWidth="3" strokeLinecap="round" />
    <line x1="30" y1="65" x2="14" y2="100" stroke="#c2a4ff" strokeWidth="3" strokeLinecap="round" className="leg-left" />
    <line x1="30" y1="65" x2="46" y2="100" stroke="#c2a4ff" strokeWidth="3" strokeLinecap="round" className="leg-right" />
    <g className="speech-bubble">
      <rect x="36" y="-10" width="80" height="28" rx="8" fill="#1a0a2e" stroke="#c2a4ff" strokeWidth="1.5" />
      <polygon points="44,18 52,18 48,26" fill="#1a0a2e" />
      <text x="76" y="8" textAnchor="middle" fill="#c2a4ff" fontSize="10" fontFamily="Equinox,sans-serif" fontWeight="500">I know</text>
      <text x="76" y="20" textAnchor="middle" fill="#eae5ec" fontSize="9" fontFamily="Equinox,sans-serif">all of these!</text>
    </g>
  </svg>
);

const WalkingCharacter = () => {
  const charRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!charRef.current) return;

    gsap.fromTo(
      charRef.current,
      { left: "-80px" },
      {
        left: "calc(100% + 80px)",
        ease: "none",
        scrollTrigger: {
          trigger: ".techstack",
          start: "top bottom",
          endTrigger: ".icon-cloud-section",
          end: "bottom top",
          scrub: 1,
          scroller: "#smooth-content",
        },
      }
    );
  }, []);

  return (
    <div className="walker-track">
      <div className="walking-character" ref={charRef}>
        <WalkerSVG />
      </div>
    </div>
  );
};

export default WalkingCharacter;
