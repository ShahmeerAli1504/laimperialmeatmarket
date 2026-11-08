"use client";

import { createContext, createElement, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { ES } from "@/lib/es";
import type { Lang } from "@/lib/data";

const KEY = "imperial-lang";

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LangContext = createContext<Ctx>({ lang: "en", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Same rule as the old site: saved choice, else browser language, else English.
  useEffect(() => {
    let l: string = "en";
    try {
      l = localStorage.getItem(KEY) || ((navigator.language || "").slice(0, 2) === "es" ? "es" : "en");
    } catch {}
    if (l === "es") setLangState("es");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {}
  }, []);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

type TProps = {
  /** key in the Spanish dictionary (lib/es.ts) */
  k: string;
  /** element to render (default span) */
  as?: string;
  /** English content */
  children?: ReactNode;
  [attr: string]: unknown;
};

/**
 * Renders `children` (English) or the Spanish string for `k`.
 * Equivalent of the old `data-i18n` attribute. Spanish strings may contain <strong>.
 */
export function T({ k, as = "span", children, ...rest }: TProps) {
  const { lang } = useLang();
  const es = lang === "es" ? ES[k] : undefined;
  if (es != null) return createElement(as, { ...rest, dangerouslySetInnerHTML: { __html: es } });
  return createElement(as, rest, children);
}
