import "./styles/FlipCard.css";
import { MdArrowOutward } from "react-icons/md";

export interface FlipCardData {
  name: string;
  category: string;
  image: string;
  alt?: string;
  description: string;
  tools: string;
  link?: string;
  github?: string;
}

const FlipCard = ({ data }: { data: FlipCardData }) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        {/* Front: image */}
        <div className="flip-card-front">
          <img src={data.image} alt={data.alt ?? data.name} />
        </div>

        {/* Back: project info */}
        <div className="flip-card-back">
          <div className="flip-card-back-content">
            <p className="flip-card-category">{data.category}</p>
            <h3 className="flip-card-name">{data.name}</h3>
            <p className="flip-card-description">{data.description}</p>
            <div className="flip-card-tools">
              <span>Tools</span>
              <div className="flip-card-tool-tiles">
                {data.tools.split(",").map((t) => (
                  <span key={t.trim()} className="flip-card-tool-tile">{t.trim()}</span>
                ))}
              </div>
            </div>
            <div>
              {data.link && (
              <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flip-card-link"
                data-cursor="disable"
              >
                View Project <MdArrowOutward />
              </a>
              )}
              {data.github && (
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flip-card-link"
                  data-cursor="disable"
                >
                  View GitHub <MdArrowOutward />
                </a>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
