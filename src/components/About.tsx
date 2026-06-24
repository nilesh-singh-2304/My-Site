import "./styles/About.css";
import { useSiteData } from "../context/SiteDataContext";

const About = () => {
  const { description } = useSiteData();

  const text = description?.description ?? `I build scalable web applications and digital products that combine
  performance, usability, and modern technology.

  From AI-powered learning platforms to investor networking ecosystems,
  I've developed solutions that solve real-world problems and create
  meaningful user experiences using React.js, Next.js, Node.js, and
  modern web technologies.`;

  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">{text}</p>
      </div>
    </div>
  );
};

export default About;
