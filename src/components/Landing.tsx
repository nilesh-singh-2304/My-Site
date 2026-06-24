import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { useSiteData } from "../context/SiteDataContext";

const Landing = ({ children }: PropsWithChildren) => {
  const { landing } = useSiteData();

  const nameParts = landing?.name?.split(" ") ?? ["NILESH", "SINGH"];
  const firstName = nameParts[0] ?? "NILESH";
  const lastName = nameParts.slice(1).join(" ") || "SINGH";
  const line1 = landing?.line1 ?? "A Full-Stack";
  const word1 = landing?.word1 ?? "Developer";
  const word2 = landing?.word2 ?? "Engineer";

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
          </div>
          <div className="landing-info">
            <h3>{line1}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">{word1}</div>
              <div className="landing-h2-2">{word2}</div>
            </h2>
            <h2>
              <div className="landing-h2-info">{word1}</div>
              <div className="landing-h2-info-1">{word2}</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
