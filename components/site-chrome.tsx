"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DOORDASH, INSTAGRAM } from "@/lib/data";
import { Icon } from "./icons";
import { T, useLang } from "./lang";

/* ---------- header + mobile nav ---------- */
export function Header() {
  const path = usePathname();
  const home = path === "/";
  const h = (id: string) => (home ? `#${id}` : `/#${id}`);
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [path]);

  const solid = !home || open;
  const cls = ["header", scrolled && "scrolled", solid && "solid"].filter(Boolean).join(" ");
  const active = (p: string) => (path === p ? "active" : undefined);

  return (
    <>
      <header className={cls} id="top">
        <div className="wrap">
          <Link href="/" className="brand" aria-label="La Imperial Meat Market & Taqueria — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-sm.png" alt="Imperial Meat Market & Taqueria" width={256} height={177} />
          </Link>
          <nav className="nav" aria-label="Main">
            <T as="a" k="nav.market" href={h("carniceria")}>Meat Market</T>
            <T as="a" k="nav.taqueria" href={h("taqueria")}>Taqueria</T>
            <T as="a" k="nav.bakery" href={h("panaderia")}>Bakery</T>
            <T as="a" k="nav.groceries" href={h("abarrotes")}>Groceries</T>
            <T as="a" k="nav.catering" href={h("catering")}>Catering</T>
            <T as="a" k="nav.locations" href={h("locations")}>Locations</T>
            <Link href="/menu" className={active("/menu")}><T k="nav.menu">Menu</T></Link>
            <Link href="/contact" className={active("/contact")}><T k="nav.contact">Contact</T></Link>
          </nav>
          <div className="header-actions">
            <div className="lang" role="group" aria-label="Language">
              <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
              <button type="button" aria-pressed={lang === "es"} onClick={() => setLang("es")}>ES</button>
            </div>
            <a className="btn btn-red btn-sm order-btn" href={DOORDASH} target="_blank" rel="noopener">
              <Icon name="bag" />
              <T k="cta.order">Order on DoorDash</T>
            </a>
            <button
              className="menu-toggle"
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((o) => !o)}
            >
              <Icon name={open ? "x" : "menu"} />
            </button>
          </div>
        </div>
      </header>
      <nav
        className={"mobile-nav" + (open ? " open" : "")}
        id="mobile-nav"
        aria-label="Mobile"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setOpen(false);
        }}
      >
        <T as="a" className="link" k="nav.market" href={h("carniceria")}>Meat Market</T>
        {home && <T as="a" className="link" k="nav.cuts" href="#cortes">Pick Your Cut</T>}
        {home && <T as="a" className="link" k="nav.wild" href="#wild-game">Wild Game</T>}
        <T as="a" className="link" k="nav.taqueria" href={h("taqueria")}>Taqueria</T>
        <T as="a" className="link" k="nav.bakery" href={h("panaderia")}>Bakery</T>
        <T as="a" className="link" k="nav.groceries" href={h("abarrotes")}>Groceries</T>
        <T as="a" className="link" k="nav.catering" href={h("catering")}>Catering</T>
        <T as="a" className="link" k="nav.locations" href={h("locations")}>Locations</T>
        <Link className="link" href="/menu"><T k="nav.fullmenu">Full Menu</T></Link>
        <Link className="link" href="/contact"><T k="nav.contact">Contact</T></Link>
        <a className="btn btn-red" href={DOORDASH} target="_blank" rel="noopener">
          <Icon name="bag" />
          <T k="cta.order">Order on DoorDash</T>
        </a>
      </nav>
    </>
  );
}

/* ---------- footer ---------- */
export function Footer() {
  const home = usePathname() === "/";
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="flogo" src="/images/logo.webp" alt="Imperial Meat Market & Taqueria" loading="lazy" />
            <T as="p" k="foot.about">
              Fresh meat. Authentic flavor. Mexican tradition. A family-owned meat market, taquería, bakery and grocery in Winnemucca, Nevada.
            </T>
          </div>
          <div>
            <h4>Winnemucca Blvd</h4>
            <ul>
              <li>5184 E Winnemucca Blvd<br />Winnemucca, NV 89445</li>
              <li><a href="tel:+17756239191">(775) 623-9191</a></li>
              <T as="li" k="foot.h1">Daily · 8 AM – 8 PM</T>
            </ul>
          </div>
          <div>
            <h4>South Bridge St</h4>
            <ul>
              <li>1200 S Bridge St<br />Winnemucca, NV 89445</li>
              <li><a href="tel:+17756232405">(775) 623-2405</a></li>
              <T as="li" k="foot.h2">Daily · 6:30 AM – 8 PM</T>
            </ul>
          </div>
          <div>
            <T as="h4" k="foot.explore">Explore</T>
            <ul>
              <li><Link href="/menu"><T k="nav.fullmenu">Full Menu</T></Link></li>
              <li><T as="a" k="cta.order" href={DOORDASH} target="_blank" rel="noopener">Order on DoorDash</T></li>
              <li><T as="a" k="nav.catering" href={home ? "#catering" : "/#catering"}>Catering</T></li>
              <li><Link href="/contact"><T k="nav.contact">Contact Us</T></Link></li>
              <li><a href={INSTAGRAM} target="_blank" rel="noopener">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {year ?? ""} La Imperial Meat Market &amp; Taqueria</span>
          <span className="script">Del Rancho a Tu Mesa</span>
        </div>
        <div className="foot-credit">
          <a href="https://www.nexoradigital.live/" target="_blank" rel="noopener">
            Powered by
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/nexora-logo-sm.png" alt="" width={20} height={20} loading="lazy" />
            <strong>Nexora Digital</strong>
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ---------- sticky mobile order bar ---------- */
export function OrderBar() {
  const home = usePathname() === "/";
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={"order-bar" + (show ? " show" : "")} id="order-bar">
      <a className="btn btn-red" href={DOORDASH} target="_blank" rel="noopener">
        <Icon name="bag" />
        <T k="cta.orderShort">Order Now</T>
      </a>
      <a className="btn btn-ghost" href={home ? "#locations" : "/#locations"}>
        <Icon name="phone" />
        <T k="cta.call">Call / Visit</T>
      </a>
    </div>
  );
}

/* ---------- reveal-on-scroll for every .reveal element ---------- */
export function RevealOnScroll() {
  const path = usePathname();
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);
  return null;
}
