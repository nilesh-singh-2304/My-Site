import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import {
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiMongodb,
  SiMysql, SiTypescript, SiJavascript, SiHtml5, SiCss,
  SiTailwindcss, SiGit, SiGithub, SiDocker, SiFirebase,
  SiRedux, SiGraphql, SiFigma, SiLinux, SiPython,
  SiThreedotjs, SiWebgl, SiPostgresql, SiPrisma, SiVite,
  SiVercel,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import { IconType } from "react-icons";
import "./styles/TechStackModal.css";

export type TechItem = { name: string; Icon: IconType; color: string };

export const techStackItems: TechItem[] = [
  { name: "React",      Icon: SiReact,       color: "#61DAFB" },
  { name: "Next.js",    Icon: SiNextdotjs,   color: "#ffffff" },
  { name: "Node.js",    Icon: SiNodedotjs,   color: "#8CC84B" },
  { name: "Express",    Icon: SiExpress,     color: "#ffffff" },
  { name: "MongoDB",    Icon: SiMongodb,     color: "#47A248" },
  { name: "MySQL",      Icon: SiMysql,       color: "#4479A1" },
  { name: "TypeScript", Icon: SiTypescript,  color: "#3178C6" },
  { name: "JavaScript", Icon: SiJavascript,  color: "#F7DF1E" },
  { name: "HTML5",      Icon: SiHtml5,       color: "#E34F26" },
  { name: "CSS3",       Icon: SiCss,         color: "#1572B6" },
  { name: "Tailwind",   Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Git",        Icon: SiGit,         color: "#F05032" },
  { name: "GitHub",     Icon: SiGithub,      color: "#ffffff" },
  { name: "Docker",     Icon: SiDocker,      color: "#2496ED" },
  { name: "Firebase",   Icon: SiFirebase,    color: "#FFCA28" },
  { name: "Redux",      Icon: SiRedux,       color: "#764ABC" },
  { name: "GraphQL",    Icon: SiGraphql,     color: "#E10098" },
  { name: "Figma",      Icon: SiFigma,       color: "#F24E1E" },
  { name: "Linux",      Icon: SiLinux,       color: "#FCC624" },
  { name: "Python",     Icon: SiPython,      color: "#3776AB" },
  { name: "Three.js",   Icon: SiThreedotjs,  color: "#ffffff" },
  { name: "WebGL",      Icon: SiWebgl,       color: "#990000" },
  { name: "PostgreSQL", Icon: SiPostgresql,  color: "#4169E1" },
  { name: "Prisma",     Icon: SiPrisma,      color: "#2D3748" },
  { name: "Vite",       Icon: SiVite,        color: "#646CFF" },
];

export const toolsItems: TechItem[] = [
  { name: "TypeScript", Icon: SiTypescript,        color: "#3178C6" },
  { name: "JavaScript", Icon: SiJavascript,        color: "#F7DF1E" },
  { name: "React",      Icon: SiReact,             color: "#61DAFB" },
  { name: "Node.js",    Icon: SiNodedotjs,         color: "#8CC84B" },
  { name: "Express",    Icon: SiExpress,           color: "#ffffff" },
  { name: "Next.js",    Icon: SiNextdotjs,         color: "#ffffff" },
  { name: "MongoDB",    Icon: SiMongodb,           color: "#47A248" },
  { name: "MySQL",      Icon: SiMysql,             color: "#4479A1" },
  { name: "PostgreSQL", Icon: SiPostgresql,        color: "#4169E1" },
  { name: "Firebase",   Icon: SiFirebase,          color: "#FFCA28" },
  { name: "Docker",     Icon: SiDocker,            color: "#2496ED" },
  { name: "Git",        Icon: SiGit,               color: "#F05032" },
  { name: "GitHub",     Icon: SiGithub,            color: "#ffffff" },
  { name: "Vercel",     Icon: SiVercel,            color: "#ffffff" },
  { name: "AWS",        Icon: FaAws,               color: "#FF9900" },
  { name: "HTML5",      Icon: SiHtml5,             color: "#E34F26" },
  { name: "CSS3",       Icon: SiCss,               color: "#1572B6" },
  { name: "Figma",      Icon: SiFigma,             color: "#F24E1E" },
  { name: "VS Code",    Icon: VscVscode,            color: "#007ACC" },
  { name: "Three.js",   Icon: SiThreedotjs,        color: "#ffffff" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } },
};

const tileVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 150, damping: 25 } },
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  items?: TechItem[];
};

export default function TechStackModal({
  isOpen,
  onClose,
  title = "Tech Stack",
  items = techStackItems,
}: Props) {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="ts-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="ts-modal"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 150, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="ts-close" onClick={onClose}>✕</button>
            <h3 className="ts-modal-title">{title}</h3>
            <motion.div className="ts-grid" variants={containerVariants} initial="hidden" animate="visible">
              {items.map(({ name, Icon, color }) => (
                <motion.div key={name} className="ts-tile" variants={tileVariants}>
                  <Icon style={{ color, fontSize: 36 }} />
                  <span className="ts-name">{name}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
