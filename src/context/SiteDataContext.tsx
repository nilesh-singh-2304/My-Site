import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

const BASE = "https://opensheet.elk.sh/1WJ7wGz5YQkrgIfMzo15qLngTCEl5ZHOO5YdEty9p_PM";

const get = (sheet: string) => fetch(`${BASE}/${sheet}`).then((r) => r.json());

export interface LandingData  { name: string; line1: string; word1: string; word2: string; author: string }
export interface DescData     { description: string; author: string }
export interface CareerData   { year: string; role: string; company: string; description: string; author: string }
export interface ProjectData  { name: string; category: string; image: string; description: string; tools: string; link: string; github: string; author: string }

interface SiteData {
  author: string;
  landing: LandingData | null;
  description: DescData | null;
  career: CareerData[];
  projects: ProjectData[];
  loading: boolean;
}

const SiteDataContext = createContext<SiteData>({
  author: "", landing: null, description: null, career: [], projects: [], loading: true,
});

export const SiteDataProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<SiteData>({
    author: "", landing: null, description: null, career: [], projects: [], loading: true,
  });

  useEffect(() => {
    (async () => {
      try {
        const [authorRows] = await get("author");
        const author: string = authorRows?.author ?? "";

        const [landingRows, descRows, careerRows, projectRows] = await Promise.all([
          get("landing"), get("description"), get("career"), get("projects"),
        ]);

        const landing = (landingRows as LandingData[]).find((r) => r.author === author) ?? null;
        const description = (descRows as DescData[]).find((r) => r.author === author) ?? null;
        const career = (careerRows as CareerData[]).filter((r) => r.author === author);
        const projects = (projectRows as ProjectData[]).filter((r) => r.author === author);

        setData({ author, landing, description, career, projects, loading: false });
      } catch {
        setData((d) => ({ ...d, loading: false }));
      }
    })();
  }, []);

  return <SiteDataContext.Provider value={data}>{children}</SiteDataContext.Provider>;
};

export const useSiteData = () => useContext(SiteDataContext);
