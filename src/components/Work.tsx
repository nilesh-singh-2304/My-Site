import "./styles/Work.css";
import FlipCard from "./FlipCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useSiteData } from "../context/SiteDataContext";

gsap.registerPlugin(useGSAP);

const FALLBACK = [
  { name: "Project Name", category: "Web Development", image: "/images/placeholder.webp", description: "A brief description of what this project does and the problem it solves.", tools: "React, TypeScript, Node.js", link: "#", github: "#", author: "" },
  { name: "Project Name", category: "Full Stack",      image: "/images/placeholder.webp", description: "A brief description of what this project does and the problem it solves.", tools: "Next.js, MongoDB, Express",  link: "#", github: "#", author: "" },
  { name: "Project Name", category: "3D / WebGL",      image: "/images/placeholder.webp", description: "A brief description of what this project does and the problem it solves.", tools: "Three.js, GSAP, WebGL",      link: "#", github: "#", author: "" },
  { name: "Project Name", category: "Frontend",        image: "/images/placeholder.webp", description: "A brief description of what this project does and the problem it solves.", tools: "React, GSAP, CSS",           link: "#", github: "#", author: "" },
  { name: "Project Name", category: "Backend",         image: "/images/placeholder.webp", description: "A brief description of what this project does and the problem it solves.", tools: "Node.js, PostgreSQL, Docker", link: "#", github: "#", author: "" },
  { name: "Project Name", category: "UI / Motion",     image: "/images/placeholder.webp", description: "A brief description of what this project does and the problem it solves.", tools: "React, TypeScript, Framer Motion", link: "#", github: "#", author: "" },
];

const Work = () => {
  const { projects, loading } = useSiteData();
  const list = !loading && projects.length > 0 ? projects : FALLBACK;

  useGSAP(() => {
    let translateX = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document.querySelector(".work-container")!.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      const padding = parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", { x: -translateX, ease: "none" });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, [list]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>My <span>Work</span></h2>
        <div className="work-flex">
          {list.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <FlipCard data={project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
