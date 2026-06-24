import { useEffect, useState } from "react";
import "./styles/Career.css";

const experiences = [
  {
    role: "Btech - ENC",
    company: "JC Bose UST",
    year: "2022-26",
    description:
      "Started my engineering journey and discovered my passion for software development.",
  },
  {
    role: "Secretary",
    company: "Microbird" ,
    year: "2024-25",
    description:
      "Organized technical events, led initiatives, and strengthened leadership and teamwork skills.",
  },
  {
    role: "FullStack Dev",
    company: "StarkSeek",
    year: "2024-25",
    description:
      "Developed an event management platform using React.js, Next.js, Node.js, and MongoDB, improving lead conversions and platform performance.",
  },
  {
    role: "Fontend Dev",
    company: "Factacy AI",
    year: "2025-26",
    description:
      "Developing AI-powered and enterprise-scale platforms with React.js, Next.js, Socket.io, RBAC, payment systems, and large-scale API integrations.",
  },
];

const Career = () => {

  const [experience, setExperience] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch(
          "https://opensheet.elk.sh/1WJ7wGz5YQkrgIfMzo15qLngTCEl5ZHOO5YdEty9p_PM/career"
        );

        const data = await res.json();
        setExperience(data);
      } catch (error) {
        console.error("Failed to fetch experience:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  console.log("Experience is : " , experience);
  
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>

        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          {experience.map((exp, index) => (
            <div className="career-info-box" key={index}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{exp.company}</h4>
                  <h5>{exp.role}</h5>
                </div>
                <h3>{exp.year}</h3>
              </div>

              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;