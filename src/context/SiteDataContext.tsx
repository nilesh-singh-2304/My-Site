import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

const BASE = "https://opensheet.elk.sh/1WJ7wGz5YQkrgIfMzo15qLngTCEl5ZHOO5YdEty9p_PM";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const get = async (sheet: string) => {
  for (let i = 0; i < 4; i++) {
    if (i > 0) await sleep(2000 * i);
    try {
      const data = await fetch(`${BASE}/${sheet}`).then((r) => r.json());
      if (Array.isArray(data)) return data;
    } catch { /* retry */ }
  }
  console.warn(`[sheets] failed to fetch sheet: ${sheet}`);
  return [];
};

export interface LandingData { name: string; line1: string; word1: string; word2: string; email: string; github: string; linkedin: string; twitter: string; instagram: string; author: string }
export interface DescData    { description: string; author: string }
export interface CareerData  { year: string; role: string; company: string; description: string; author: string }
export interface ProjectData { name: string; category: string; image: string; description: string; tools: string; link: string; github: string; author: string }
export interface WhatData    { title: string; description: string; skills: string; author: string }

interface SiteData {
  author: string;
  landing: LandingData | null;
  description: DescData | null;
  career: CareerData[];
  projects: ProjectData[];
  what: WhatData[];
  loading: boolean;
}

const SiteDataContext = createContext<SiteData>({
  author: "", landing: null, description: null, career: [], projects: [], what: [], loading: true,
});

export const SiteDataProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<SiteData>({
    author: "", landing: null, description: null, career: [], projects: [], what: [], loading: true,
  });

  useEffect(() => {
    (async () => {
      try {
        const [authorRow] = await get("author");
        const author: string = (authorRow?.author ?? "").trim().toLowerCase();
        console.log("[sheets] author:", author);

        const [landingRows, descRows, careerRows, projectRows, whatRows] = await Promise.all([
          get("landing"), get("description"), get("career"), get("projects"), get("what"),
        ]);
        console.log("[sheets] Promise.all resolved");
        console.log("[what] raw:", whatRows);
        console.log("[what] filtered:", (whatRows as WhatData[]).filter((r) => r.author?.trim().toLowerCase() === author));

        setData({
          author,
          landing:     (landingRows  as LandingData[]).find((r) => r.author?.trim().toLowerCase() === author) ?? null,
          description: (descRows     as DescData[]).find((r) => r.author?.trim().toLowerCase() === author) ?? null,
          career:      (careerRows   as CareerData[]).filter((r) => r.author?.trim().toLowerCase() === author),
          projects:    (projectRows  as ProjectData[]).filter((r) => r.author?.trim().toLowerCase() === author),
          what:        (whatRows     as WhatData[]).filter((r) => r.author?.trim().toLowerCase() === author),
          loading: false,
        });
      } catch (e) {
        console.error("[sheets] outer catch:", e);
        setData((d) => ({ ...d, loading: false }));
      }
    })();
  }, []);

  return <SiteDataContext.Provider value={data}>{children}</SiteDataContext.Provider>;
};

export const useSiteData = () => useContext(SiteDataContext);
