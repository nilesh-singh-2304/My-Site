import { useEffect, useState } from "react";
import "./styles/Career.css";

const Career = () => {

  const [experience, setExperience] = useState<any[]>([]);
  const [_loading, setLoading] = useState(true);

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