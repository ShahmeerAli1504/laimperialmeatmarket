"use client";

/* ==========================================================================
   La Imperial — interactive Butcher's Guide ("Pick Your Cut")
   Tap a section of the beef or pork diagram → see its cuts → build a cut
   list → text / call / copy the request to a store.
   Cut names, descriptions and options live in lib/cuts.ts.
   ========================================================================== */
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { ANIMALS, OPTS, S, type AnimalId, type CutItem, type OptKind, type Region } from "@/lib/cuts";
import { LOCATIONS, type Lang } from "@/lib/data";
import { Icon } from "./icons";
import { useLang } from "./lang";

const KEY = "imperial-cutlist-v1";

type FormState = { name: string; phone: string; store: string; date: string; notes: string };
type Pair = [string, string];

const reg = (animal: AnimalId, id: string) => ANIMALS[animal].regions.find((r) => r.id === id)!;
const both = (p: Pair) => (p[0] === p[1] ? p[0] : p[0] + " / " + p[1]);
const opt = (kind: OptKind, id: string) => OPTS[kind].find((o) => o.id === id) || OPTS[kind][0];

function buildMessage(list: CutItem[], f: FormState) {
  const st = LOCATIONS.find((l) => l.id === f.store);
  const lines = ["La Imperial — Cut request / Pedido de cortes"];
  if (f.name) lines.push("Name / Nombre: " + f.name);
  if (f.phone) lines.push("Phone / Tel: " + f.phone);
  if (f.date || st) lines.push("Pickup / Recoger: " + [f.date, st ? st.street : ""].filter(Boolean).join(" @ "));
  lines.push("");
  list.forEach((it, i) => {
    const r = reg(it.a, it.r);
    const c = r.cuts[it.c];
    lines.push(`${i + 1}) ${it.a === "beef" ? "Beef/Res" : "Pork/Cerdo"} · ${both(c)} — ${it.lbs} lb, ${opt("thick", it.th).en}, ${opt("prep", it.pr).en}`);
  });
  if (f.notes) {
    lines.push("");
    lines.push("Notes / Notas: " + f.notes);
  }
  return lines.join("\n");
}

function fallbackCopy(txt: string) {
  const ta = document.createElement("textarea");
  ta.value = txt;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
  } catch {}
  document.body.removeChild(ta);
}

const CLEAVER = (
  <g className="cleaver">
    <rect x="-26" y="-34" width="40" height="26" rx="3" className="blade" />
    <circle cx="-18" cy="-27" r="2.6" className="hole" />
    <rect x="12" y="-28" width="26" height="9" rx="4" className="handle" />
  </g>
);

function labelWords(r: Region, L: Lang): string[] {
  let words = L === "en" && r.lab ? r.lab : L === "es" && r.labEs ? r.labEs : [r[L].split(" / ")[0]];
  if (L === "es" && !r.out && words[0].length > 11) {
    const parts = words[0].split(" ");
    if (parts.length > 1) words = [parts[0], parts.slice(1).join(" ")];
  }
  return words;
}

function AnimalSvg({ animal, sel, L, chop, hover, onPick, onHover }: {
  animal: AnimalId; sel: string; L: Lang; chop: number; hover: string | null;
  onPick: (id: string) => void; onHover: (id: string | null) => void;
}) {
  const A = ANIMALS[animal];
  const cur = reg(animal, sel);
  const onKey = (e: KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onPick(id);
    }
  };
  return (
    <svg className={"animal " + animal} viewBox="20 80 780 380" role="group" aria-label={S[L][animal]}
      onMouseOver={(e) => onHover((e.target as Element).closest(".cut")?.getAttribute("data-id") ?? null)}
      onMouseLeave={() => onHover(null)}>
      <defs>
        <clipPath id={"clip-" + animal}><path d={A.body} /></clipPath>
        <linearGradient id="g-sel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6d27a" />
          <stop offset="1" stopColor="#d89a2c" />
        </linearGradient>
      </defs>
      <path className="shadow" d={A.body} />
      <path className="base" d={A.body} />
      {A.regions.map((r) => {
        const on = r.id === sel;
        return (
          <g
            key={r.id}
            className={"cut" + (on ? " on" : "")}
            data-id={r.id}
            role="button"
            tabIndex={0}
            aria-pressed={on}
            aria-label={r[L]}
            style={{ "--dx": r.v[0] + "px", "--dy": r.v[1] + "px" } as CSSProperties}
            onClick={() => onPick(r.id)}
            onKeyDown={(e) => onKey(e, r.id)}
          >
            <g clipPath={`url(#clip-${animal})`}>
              <path className="fill" d={r.d} />
              <path className="seam" d={r.d} />
            </g>
          </g>
        );
      })}
      <path className="outline" d={A.body} />
      {A.extras}
      {A.regions.map((r) => {
        const words = labelWords(r, L);
        return (r.lp || [[r.lx, r.ly]]).map((pt, pi) => (
          <text
            key={r.id + pi}
            className={"lbl" + (r.out ? " out" : "") + (r.id === sel ? " on" : "") + (hover === r.id ? " hov" : "")}
            data-for={r.id}
            x={pt[0]}
            y={pt[1] - (words.length - 1) * 9}
          >
            {words.map((w, i) => (
              <tspan key={i} x={pt[0]} dy={i ? 18 : 0}>{w}</tspan>
            ))}
          </text>
        ));
      })}
      <g key={chop} className={"knife" + (chop ? " chop" : "")} transform={`translate(${cur.lx} ${cur.ly - 14})`}>
        {CLEAVER}
      </g>
    </svg>
  );
}

export function CutGuide() {
  const { lang: L } = useLang();
  const s = S[L];
  const [animal, setAnimal] = useState<AnimalId>("beef");
  const [sel, setSel] = useState<Record<AnimalId, string>>({ beef: ANIMALS.beef.start, pork: ANIMALS.pork.start });
  const [list, setList] = useState<CutItem[]>([]);
  const [form, setForm] = useState<FormState>({ name: "", phone: "", store: "", date: "", notes: "" });
  const [loaded, setLoaded] = useState(false);
  const [chop, setChop] = useState(0);
  const [hover, setHover] = useState<string | null>(null);
  const [bump, setBump] = useState(0);
  const [note, setNote] = useState<{ text: string; ok: boolean } | null>(null);
  const [copied, setCopied] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  // restore saved list + contact details
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "null");
      if (saved && saved.list) {
        setList(saved.list);
        setForm((f) => ({ ...f, ...(saved.form || {}) }));
      }
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ list, form }));
    } catch {}
  }, [list, form, loaded]);

  // on phones, bring the details panel into view after tapping the diagram
  useEffect(() => {
    if (!chop || window.innerWidth >= 900 || !panelRef.current) return;
    const top = panelRef.current.getBoundingClientRect().top;
    if (top > window.innerHeight * 0.85) panelRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [chop]);

  const select = (id: string) => {
    setSel((p) => ({ ...p, [animal]: id }));
    setChop((c) => c + 1);
  };

  const switchAnimal = (a: AnimalId) => {
    setAnimal(a);
    setChop(0);
  };

  const region = reg(animal, sel[animal]);
  const inList = (ci: number) => list.some((it) => it.a === animal && it.r === region.id && it.c === ci);

  const toggleCut = (ci: number) => {
    const idx = list.findIndex((it) => it.a === animal && it.r === region.id && it.c === ci);
    if (idx > -1) setList(list.filter((_, i) => i !== idx));
    else {
      setList([...list, { a: animal, r: region.id, c: ci, lbs: 2, th: "std", pr: "plain" }]);
      setBump((b) => b + 1);
    }
  };

  const updateItem = (i: number, patch: Partial<CutItem>) => setList(list.map((it, j) => (j === i ? { ...it, ...patch } : it)));
  const setQty = (i: number, dir: number) => {
    const lbs = list[i].lbs;
    updateItem(i, { lbs: Math.max(0.5, Math.min(100, Math.round((lbs + dir * 0.5) * 2) / 2)) });
  };
  const setField = (k: keyof FormState, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const targetStore = () => LOCATIONS.find((l) => l.id === form.store) || LOCATIONS[0];

  const act = (kind: "text" | "call" | "copy") => {
    if (!list.length) return setNote({ text: s.need, ok: false });
    const st = targetStore();
    if (kind === "text") {
      if (!form.name.trim() || !form.phone.trim()) {
        setNote({ text: s.needInfo, ok: false });
        (!form.name.trim() ? nameRef : phoneRef).current?.focus();
        return;
      }
      window.location.href = "sms:" + st.tel + "?&body=" + encodeURIComponent(buildMessage(list, form));
      return;
    }
    if (kind === "call") {
      window.location.href = "tel:" + st.tel;
      return;
    }
    const txt = buildMessage(list, form);
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(txt).then(done, () => { fallbackCopy(txt); done(); });
    else {
      fallbackCopy(txt);
      done();
    }
  };

  const count = list.length;
  const pair = (p: Pair) => (L === "es" ? p[1] : p[0]);

  return (
    <div id="cut-guide" className="cut-guide reveal">
      <div className="cg-tabs" role="tablist">
        {(["beef", "pork"] as AnimalId[]).map((a) => (
          <button key={a} type="button" role="tab" aria-selected={animal === a} onClick={() => switchAnimal(a)}>
            {s[a]}
          </button>
        ))}
      </div>

      <div className="cg-grid">
        <div className="board">
          <div className="board-svg">
            {/* keyed: remount per animal so the browser re-resolves the clip-path reference */}
            <AnimalSvg key={animal} animal={animal} sel={sel[animal]} L={L} chop={chop} hover={hover} onPick={select} onHover={setHover} />
          </div>
          <p className="hint"><Icon name="knife" />{s.tap}</p>
          <div className="rchips">
            {ANIMALS[animal].regions.map((r) => (
              <button key={r.id} type="button" className={"rchip" + (r.id === sel[animal] ? " on" : "")} onClick={() => select(r.id)}>
                {r[L].split(" / ")[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="cut-panel" ref={panelRef}>
          <div className="cut-panel-in" key={animal + region.id}>
            <span className="kicker">{s[animal]}</span>
            <h3>{L === "es" ? region.es : region.en}</h3>
            <span className="alt">{L === "es" ? region.en : region.es}</span>
            <p>{L === "es" ? region.des : region.den}</p>
            {region.t > 0 && (
              <div className="meter">
                <span>{s.tender}</span>
                <div className="dots" aria-label={region.t + "/5"}>
                  {[1, 2, 3, 4, 5].map((i) => <i key={i} className={i <= region.t ? "on" : ""}></i>)}
                </div>
              </div>
            )}
            <div className="best">
              <span>{s.best}</span>
              {region.best.map((b, i) => <em key={i}>{pair(b)}</em>)}
            </div>
            <h4>{s.cuts}</h4>
            <ul className="cut-options">
              {region.cuts.map((c, ci) => {
                const has = inList(ci);
                return (
                  <li key={ci}>
                    <span>
                      <b>{pair(c)}</b>
                      {c[0] !== c[1] && <small>{L === "es" ? c[0] : c[1]}</small>}
                    </span>
                    <button type="button" className={"add" + (has ? " has" : "")} onClick={() => toggleCut(ci)}>
                      <Icon name={has ? "check" : "plus"} />
                      {has ? s.added : s.add}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="cg-order" id="cut-order">
        <div className="cg-order-head">
          <h3>
            {s.list}
            {count > 0 && (
              <>
                {" "}
                <span key={bump} className={"count" + (bump ? " bump" : "")}>{count} {count === 1 ? s.item : s.items}</span>
              </>
            )}
          </h3>
          {count > 0 && (
            <button type="button" className="link-btn" onClick={() => setList([])}>{s.clear}</button>
          )}
        </div>
        <div className="cg-order-grid">
          <div>
            {!count ? (
              <p className="empty">{s.empty}</p>
            ) : (
              <ul className="cut-list">
                {list.map((it, i) => {
                  const r = reg(it.a, it.r);
                  const c = r.cuts[it.c];
                  return (
                    <li className="cl-item" key={`${it.a}-${it.r}-${it.c}`}>
                      <div className="cl-top">
                        <span className={"tag " + it.a}>{s[it.a]}</span>
                        <b>{pair(c)}</b>
                        <small>{r[L]}</small>
                        <button type="button" className="rm" aria-label={s.remove} onClick={() => setList(list.filter((_, j) => j !== i))}>
                          <Icon name="trash" />
                        </button>
                      </div>
                      <div className="cl-opts">
                        <div className="qty">
                          <button type="button" aria-label="−" onClick={() => setQty(i, -1)}><Icon name="minus" /></button>
                          <span>{it.lbs} {s.lbs}</span>
                          <button type="button" aria-label="+" onClick={() => setQty(i, 1)}><Icon name="plus" /></button>
                        </div>
                        <label>
                          <span>{s.thick}</span>
                          <select value={it.th} onChange={(e) => updateItem(i, { th: e.target.value })}>
                            {OPTS.thick.map((o) => <option key={o.id} value={o.id}>{o[L]}</option>)}
                          </select>
                        </label>
                        <label>
                          <span>{s.prep}</span>
                          <select value={it.pr} onChange={(e) => updateItem(i, { pr: e.target.value })}>
                            {OPTS.prep.map((o) => <option key={o.id} value={o.id}>{o[L]}</option>)}
                          </select>
                        </label>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="req-form">
            <h4>{s.form}</h4>
            <div className="fgrid">
              <label>
                <span>{s.name}</span>
                <input ref={nameRef} autoComplete="name" value={form.name} onChange={(e) => setField("name", e.target.value)} />
              </label>
              <label>
                <span>{s.phone}</span>
                <input ref={phoneRef} type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={(e) => setField("phone", e.target.value)} />
              </label>
              <label>
                <span>{s.store}</span>
                <select value={form.store} onChange={(e) => setField("store", e.target.value)}>
                  <option value="">{s.any}</option>
                  {LOCATIONS.map((l) => <option key={l.id} value={l.id}>{l.street} · {l.phone}</option>)}
                </select>
              </label>
              <label>
                <span>{s.date}</span>
                <input type="date" value={form.date} onChange={(e) => setField("date", e.target.value)} />
              </label>
              <label className="full">
                <span>{s.notes}</span>
                <textarea rows={2} placeholder={s.notesPh} value={form.notes} onChange={(e) => setField("notes", e.target.value)} />
              </label>
            </div>
            <p className={"msg" + (note ? (note.ok ? " ok" : " err") : "")} role="status" aria-live="polite">{note?.text}</p>
            <div className="req-ctas">
              <button type="button" className="btn btn-red" onClick={() => act("text")}><Icon name="msg" />{s.text}</button>
              <button type="button" className="btn btn-gold" onClick={() => act("call")}><Icon name="phone" />{s.call}</button>
              <button type="button" className="btn btn-ghost" onClick={() => act("copy")}><Icon name="copy" /><span>{copied ? s.copied : s.copy}</span></button>
            </div>
            <p className="tip">{s.tip}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
