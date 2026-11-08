"use client";

import { useEffect, useRef } from "react";
import { DOORDASH, LOCATIONS, MENU, menuCategory, money, type MenuItem } from "@/lib/data";
import { UI } from "@/lib/es";
import { Icon } from "./icons";
import { useLang } from "./lang";

function MenuCard({ item }: { item: MenuItem }) {
  const { lang } = useLang();
  return (
    <article className="mcard">
      <div className="row">
        <span className="name">{item.name}</span>
        <span className="price">{money(item.price)}</span>
      </div>
      <p>{item[lang]}</p>
      <a className="order" href={DOORDASH} target="_blank" rel="noopener">
        {UI[lang].order} →
      </a>
    </article>
  );
}

/** Home page taquería best sellers (first 8). */
export function BestSellers() {
  return (
    <div className="menu-cards" id="best-sellers">
      {menuCategory("best").items.slice(0, 8).map((it, i) => (
        <MenuCard key={i} item={it} />
      ))}
    </div>
  );
}

/** Catering party-pack price list (first 6). */
export function PacksList() {
  return (
    <ul className="price-list" id="packs-list">
      {menuCategory("packs").items.slice(0, 6).map((it, i) => (
        <li key={i}>
          <span className="n">{it.name}</span>
          <span className="d"></span>
          <span className="p">{money(it.price)}</span>
        </li>
      ))}
    </ul>
  );
}

/** Store cards with embedded maps. */
export function LocationGrid() {
  const { lang } = useLang();
  const ui = UI[lang];
  return (
    <div className="loc-grid" id="loc-grid">
      {LOCATIONS.map((l) => (
        <article className="loc" key={l.id}>
          <div className="map">
            <iframe title={`Map: ${l.street}`} src={l.embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div className="body">
            <span className="tag">{l.tag[lang]}</span>
            <h3>{l.name[lang]}</h3>
            <div className="line">
              <Icon name="pin" />
              <a href={l.maps} target="_blank" rel="noopener">
                {l.street}
                <br />
                {l.city}
              </a>
            </div>
            <div className="line">
              <Icon name="phone" />
              <a href={`tel:${l.tel}`}>{l.phone}</a>
            </div>
            <div className="line">
              <Icon name="clock" />
              <span>{l.hours[lang]}</span>
            </div>
            <div className="services">
              {ui.services.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <div className="actions">
              <a className="btn btn-gold btn-sm" href={l.maps} target="_blank" rel="noopener">
                <Icon name="dir" />
                {ui.directions}
              </a>
              <a className="btn btn-ghost btn-sm" href={`tel:${l.tel}`}>
                <Icon name="phone" />
                {ui.call}
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

/** /menu — sticky category tabs + every category. */
export function FullMenu() {
  const { lang } = useLang();
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const tabs = tabsRef.current;
    if (!tabs) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          tabs.querySelectorAll("a").forEach((a) => {
            const on = a.getAttribute("href") === "#" + e.target.id;
            a.classList.toggle("active", on);
            if (on) tabs.scrollTo({ left: a.offsetLeft - 16, behavior: "smooth" });
          });
        });
      },
      { rootMargin: "-160px 0px -60% 0px" }
    );
    document.querySelectorAll(".menu-cat").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <nav className="cat-tabs" aria-label="Menu categories">
        <div className="wrap" id="cat-tabs" ref={tabsRef}>
          {MENU.map((c) => (
            <a key={c.id} href={`#${c.id}`}>
              {c.title[lang]}
            </a>
          ))}
        </div>
      </nav>
      <div className="wrap" id="full-menu">
        {MENU.map((c) => (
          <section className="menu-cat" id={c.id} key={c.id}>
            <h2>{c.title[lang]}</h2>
            <div className="menu-cards">
              {c.items.map((it, i) => (
                <MenuCard key={i} item={it} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
