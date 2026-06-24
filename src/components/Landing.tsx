import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { useSiteData } from "../context/SiteDataContext";
import { FiGithub, FiLinkedin, FiMail, FiTwitter, FiInstagram } from "react-icons/fi";

const Landing = ({ children }: PropsWithChildren) => {
  const { landing } = useSiteData();

  const nameParts = landing?.name?.split(" ") ?? ["NILESH", "SINGH"];
  const firstName = nameParts[0] ?? "NILESH";
  const lastName = nameParts.slice(1).join(" ") || "SINGH";
  const line1 = landing?.line1 ?? "A Full-Stack";
  const word1 = landing?.word1 ?? "Developer";
  const word2 = landing?.word2 ?? "Engineer";

  const socials = [
    { href: landing?.email ? `mailto:${landing.email}` : null, icon: <FiMail />, label: "Email" },
    { href: landing?.github || null, icon: <FiGithub />, label: "GitHub" },
    { href: landing?.linkedin || null, icon: <FiLinkedin />, label: "LinkedIn" },
    { href: landing?.twitter || null, icon: <FiTwitter />, label: "Twitter" },
    { href: landing?.instagram || null, icon: <FiInstagram />, label: "Instagram" },
  ].filter((s) => s.href);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              {firstName}
              <br />
              <span>{lastName}</span>
            </h1>
            {socials.length > 0 && (
              <div className="landing-socials">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href!}
                    target={s.label !== "Email" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    data-cursor="disable"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="landing-info">
            <h3>{line1}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">{word1}</div>
              <div className="landing-h2-2">{word2}</div>
            </h2>
            <h2>
              <div className="landing-h2-info">{word2}</div>
              <div className="landing-h2-info-1">{word1}</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
