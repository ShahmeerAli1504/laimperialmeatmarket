/* eslint-disable @next/next/no-img-element -- plain <img> keeps the original markup/CSS identical */
import Link from "next/link";
import { CutGuide } from "@/components/cut-guide";
import { Icon } from "@/components/icons";
import { T } from "@/components/lang";
import { BestSellers, LocationGrid, PacksList } from "@/components/menu";
import { DOORDASH, INSTAGRAM } from "@/lib/data";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Restaurant", "ButcherShop"],
      name: "La Imperial Meat Market & Taqueria",
      servesCuisine: "Mexican",
      priceRange: "$10–20",
      telephone: "+1-775-623-9191",
      address: { "@type": "PostalAddress", streetAddress: "5184 E Winnemucca Blvd", addressLocality: "Winnemucca", addressRegion: "NV", postalCode: "89445", addressCountry: "US" },
      openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "08:00", closes: "20:00" }],
      sameAs: [INSTAGRAM],
    },
    {
      "@type": ["Restaurant", "GroceryStore"],
      name: "Imperial Meat Market & Taqueria — South Bridge",
      servesCuisine: "Mexican",
      telephone: "+1-775-623-2405",
      address: { "@type": "PostalAddress", streetAddress: "1200 S Bridge St", addressLocality: "Winnemucca", addressRegion: "NV", postalCode: "89445", addressCountry: "US" },
      openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "06:30", closes: "20:00" }],
    },
  ],
};

const MARQUEE = ["Carnicería", "Taquería", "Panadería", "Abarrotes", "Carne Asada", "Wild Game", "Birria", "Al Pastor", "Pan Dulce", "Aguas Frescas", "Catering"];
const IG_PHOTOS = ["al-pastor", "conchas", "beef-cuts", "aguas-frescas", "team-kitchen", "case-short-ribs"];

function DD({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <a className={className} href={DOORDASH} target="_blank" rel="noopener">
      {children}
    </a>
  );
}

function PriceCell({ price, unit }: { price: string; unit: "min" | "lb" }) {
  return (
    <>
      <b>{price}</b> {unit === "min" ? <T k="wild.min">minimum</T> : <T k="wild.lb">per pound</T>}
    </>
  );
}
const Pork = () => <T as="em" className="pork" k="wild.pork">50% pork</T>;

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-bg"><img src="/images/carne-asada.webp" alt="" fetchPriority="high" /></div>
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <T className="script" k="hero.script">Del Rancho a Tu Mesa</T>
            <h1>
              <T k="hero.h1a">Fresh Meat.</T>
              <T className="gold-text" k="hero.h1b">Authentic Flavor.</T>
              <T k="hero.h1c">Mexican Tradition.</T>
            </h1>
            <T as="p" className="lede" k="hero.lede">
              A family-run carnicería, taquería, panadería and Mexican grocery — all under one roof, at both of our Winnemucca stores. Cut fresh daily, cooked to order, never pre-made.
            </T>
            <div className="hero-ctas">
              <DD className="btn btn-red"><Icon name="bag" /><T k="cta.order">Order on DoorDash</T></DD>
              <Link className="btn btn-ghost" href="/menu"><T k="cta.menu">See the Menu</T></Link>
              <a className="btn btn-ghost" href="#locations"><Icon name="pin" /><T k="cta.find">Find a Store</T></a>
            </div>
            <div className="hero-badges">
              <span><Icon name="clock" /><T k="badge.open">Open 7 days a week</T></span>
              <span><Icon name="store" /><T k="badge.two">2 Winnemucca locations</T></span>
              <span><Icon name="knife" /><T k="badge.fresh">Meats cut fresh daily</T></span>
            </div>
          </div>
          <img className="hero-logo" src="/images/logo.webp" alt="Imperial Meat Market & Taqueria logo" width={698} height={484} />
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((w, i) => (
            <span key={i}>{w}</span>
          ))}
        </div>
      </div>

      {/* ================= FOUR DEPARTMENTS ================= */}
      <section className="section wood-bg">
        <div className="wrap">
          <div className="section-head center reveal">
            <T className="script" k="depts.script">Todo en un solo lugar</T>
            <T as="h2" k="depts.h2">One Stop. Four Traditions.</T>
            <T as="p" className="lede" k="depts.lede">
              Pick up the steak for Sunday&apos;s carne asada, grab lunch from the taquería, take home a bag of warm conchas and stock up on tortillas, cheese and salsas — without making a second stop.
            </T>
          </div>
          <div className="depts">
            <a className="dept reveal" href="#carniceria">
              <img src="/images/case-angus-ribeye.webp" alt="Certified Angus Beef ribeye steaks in the meat case" loading="lazy" />
              <span className="es-name">Carnicería</span>
              <T as="h3" k="dept1.h">Meat Market</T>
              <T as="p" k="dept1.p">Certified Angus Beef, house marinades and everything for your carne asada.</T>
              <T className="arrow" k="cta.explore">Explore →</T>
            </a>
            <a className="dept reveal" href="#taqueria">
              <img src="/images/al-pastor.webp" alt="Al pastor marinating with fresh pineapple" loading="lazy" />
              <span className="es-name">Taquería</span>
              <T as="h3" k="dept2.h">Taco Shop</T>
              <T as="p" k="dept2.p">Street tacos, quesabirria, burritos and breakfast — cooked to order.</T>
              <T className="arrow" k="cta.explore">Explore →</T>
            </a>
            <a className="dept reveal" href="#panaderia">
              <img src="/images/conchas.webp" alt="Pink and white conchas" loading="lazy" />
              <span className="es-name">Panadería</span>
              <T as="h3" k="dept3.h">Bakery</T>
              <T as="p" k="dept3.p">Conchas, cuernos, cookies, cakes and seasonal pan dulce every day.</T>
              <T className="arrow" k="cta.explore">Explore →</T>
            </a>
            <a className="dept reveal" href="#abarrotes">
              <img src="/images/store-bridge.webp" alt="Imperial store front with the team" loading="lazy" />
              <span className="es-name">Abarrotes</span>
              <T as="h3" k="dept4.h">Mexican Groceries</T>
              <T as="p" k="dept4.p">Tortillas, quesos, cremería, produce, salsas and drinks from home.</T>
              <T className="arrow" k="cta.explore">Explore →</T>
            </a>
          </div>
          <p className="both-stores reveal">
            <Icon name="store" width="20" height="20" style={{ color: "var(--gold)" }} />
            <T k="depts.both"><strong>All four, at both stores</strong> — Winnemucca Blvd &amp; South Bridge St.</T>
          </p>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section className="section" id="story">
        <div className="wrap story-grid">
          <div className="story-photos reveal">
            <img className="main" src="/images/team-kitchen.webp" alt="The Imperial team preparing marinated meat in the kitchen" loading="lazy" />
            <img className="inset" src="/images/grand-opening.webp" alt="The Humboldt Sun feature on the new Imperial store on South Bridge" loading="lazy" />
          </div>
          <div className="story-copy reveal">
            <T className="script" k="story.script">Nuestra Historia</T>
            <T as="h2" k="story.h2">A Family With a Dream</T>
            <T as="p" k="story.p1">
              We&apos;re not a big company or a famous name. Behind Imperial is a hardworking family and team with a dream, a lot of faith and big hearts. What started as one meat market and taquería on Winnemucca Blvd has grown into two full stores serving the whole community.
            </T>
            <T as="p" k="story.p2">
              Our mission is simple: fresh, quality products, great prices and the best service we possibly can. We know there&apos;s always room to improve — and we promise to never stop working to earn your trust.
            </T>
            <blockquote>
              <T k="story.quote">&quot;First, we thank God for making this dream possible — and every single customer who has supported us.&quot;</T>
              <T as="cite" k="story.cite">— Your Imperial family ❤️</T>
            </blockquote>
            <div className="timeline">
              <div><T as="b" k="story.t1h">The Original</T><T k="story.t1">5184 E Winnemucca Blvd — meat market, taquería, bakery &amp; groceries.</T></div>
              <div><T as="b" k="story.t2h">Now Open · 2026</T><T k="story.t2">1200 S Bridge St — our second store, featured in The Humboldt Sun.</T></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CARNICERIA ================= */}
      <section className="section wood-bg" id="carniceria">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="script">Carnes de Calidad</span>
            <T as="h2" k="meat.h2">The Carnicería</T>
            <T as="p" className="lede" k="meat.lede">
              Strength, quality and tradition in every cut. Our butchers cut fresh every day — from Certified Angus Beef steaks to house-marinated meats ready for the grill.
            </T>
          </div>
          <div className="banner-img reveal">
            <img src="/images/banner-meats.webp" alt="Imperial meat market banner: beef, pork, chicken, seafood, marinated meats and chorizo" loading="lazy" width={1206} height={393} />
          </div>
          <div className="meat-grid">
            <div className="gallery reveal">
              <figure className="tall"><img src="/images/case-angus-ribeye.webp" alt="Certified Angus Beef ribeyes" loading="lazy" /><T as="figcaption" k="gal.1">Certified Angus Beef</T></figure>
              <figure><img src="/images/beef-cuts.webp" alt="Fresh whole beef cuts" loading="lazy" /><T as="figcaption" k="gal.2">Fresh-cut daily</T></figure>
              <figure><img src="/images/case-short-ribs.webp" alt="Beef short ribs and fajita marinade" loading="lazy" /><T as="figcaption" k="gal.3">Short ribs &amp; fajitas</T></figure>
              <figure className="wide"><img src="/images/carne-asada.webp" alt="Seasoned carne asada with onion and cilantro" loading="lazy" /><T as="figcaption" k="gal.4">House-seasoned carne asada</T></figure>
              <figure><img src="/images/case-marinated-pork.webp" alt="Marinated pork, chorizo and ground beef in the case" loading="lazy" /><T as="figcaption" k="gal.5">Marinated &amp; chorizo</T></figure>
              <figure className="wide"><img src="/images/case-marinated-chicken.webp" alt="Marinated chicken for tacos" loading="lazy" /><T as="figcaption" k="gal.6">Chicken for tacos</T></figure>
            </div>
            <div className="reveal">
              <div className="price-card">
                <h3>
                  <Icon name="knife" width="22" height="22" style={{ color: "var(--gold)" }} />
                  <T k="meat.cardh">Fresh at the Counter</T>
                </h3>
                <T as="p" className="note" k="meat.note">Cut to order every day — by the pound, your way. Marinated or plain.</T>
                <ul className="checks">
                  <li><Icon name="check" /><T k="meat.c1">Beef, pork, chicken, seafood and chorizo</T></li>
                  <li><Icon name="check" /><T k="meat.c2">Special cuts, carnitas, barbacoa, lengua, tripas and menudo</T></li>
                  <li><Icon name="check" /><T k="meat.c3">Custom cuts and bulk orders for parties — just ask the counter</T></li>
                </ul>
                <a className="callout callout-wild" href="#wild-game">
                  <Icon name="antler" className="ico" />
                  <span>
                    <T as="b" k="meat.wildh">We Have Wild Game</T>
                    <T as="small" k="meat.wildp">Deer, elk, antelope &amp; more — cut, wrap, grind and sausage.</T>
                  </span>
                  <span className="go" aria-hidden="true">→</span>
                </a>
                <a className="callout" href="#cortes">
                  <Icon name="knife" className="ico" />
                  <span>
                    <T as="b" k="meat.cutsh">Pick Your Cut</T>
                    <T as="small" k="meat.cutsp">Tap the beef or pork diagram and send us your cut list.</T>
                  </span>
                  <span className="go" aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BUTCHER'S GUIDE (interactive) ================= */}
      <section className="section cuts-section" id="cortes">
        <div className="wrap">
          <div className="section-head center reveal">
            <T className="script" k="cuts.script">Guía del Carnicero</T>
            <T as="h2" k="cuts.h2">Pick Your Cut</T>
            <T as="p" className="lede" k="cuts.lede">
              Tap any part of the animal to see the cuts that come from it and what they&apos;re best for. Add what you want to your cut list and send it to our butchers — we&apos;ll have it ready.
            </T>
          </div>
          <CutGuide />
        </div>
      </section>

      {/* ================= WILD GAME ================= */}
      <section className="section wood-bg wild" id="wild-game">
        <div className="wrap">
          <div className="wild-intro reveal">
            <div>
              <T className="script" k="wild.script">Caza Silvestre</T>
              <h2>
                <T k="wild.h2a">We Have</T> <T className="gold-text" k="wild.h2b">Wild Game</T>
              </h2>
              <T as="p" className="lede" k="wild.lede">
                Wild game refers to animals that are hunted in the wild rather than raised on a farm for meat production. Examples include deer, elk, antelope, moose, and wild boar.
              </T>
              <div className="chips wild-chips">
                <T className="chip" k="wild.a1">Deer</T>
                <T className="chip" k="wild.a2">Elk</T>
                <T className="chip" k="wild.a3">Antelope</T>
                <T className="chip" k="wild.a4">Moose</T>
                <T className="chip" k="wild.a5">Wild Boar</T>
              </div>
            </div>
            <div className="wild-badge" aria-hidden="true">
              <svg viewBox="0 0 24 24"><use href="#i-antler" /></svg>
            </div>
          </div>

          <article className="flyer reveal" aria-labelledby="wg-title">
            <header className="flyer-head">
              <svg className="flyer-mtn" viewBox="0 0 1000 90" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 90 L90 40 L150 62 L240 12 L330 58 L400 30 L470 66 L560 18 L640 56 L720 26 L800 60 L880 22 L1000 70 L1000 90 Z" />
              </svg>
              <T as="h3" id="wg-title" k="wild.title">Wild Game Processing</T>
              <p className="flyer-addr">
                1200 S Bridge Street · Winnemucca, NV 89445 · <a href="tel:+17756232405">(775) 623-2405</a>
              </p>
              <T as="p" className="flyer-tag" k="wild.tag">Clean, simple pricing for cut, wrap, grind, and sausage services</T>
            </header>

            <div className="flyer-block">
              <T className="ribbon" k="wild.s1">Basic Processing</T>
              <div className="flyer-row">
                <svg className="flyer-ico" viewBox="0 0 64 64" aria-hidden="true">
                  <g transform="rotate(-40 32 32)"><rect x="18" y="4" width="22" height="26" rx="3" fill="currentColor" /><circle cx="35" cy="10" r="2.6" fill="#f6eedb" /><rect x="25" y="29" width="8" height="26" rx="3.5" fill="currentColor" /></g>
                  <g transform="rotate(40 32 32)"><rect x="24" y="4" width="22" height="26" rx="3" fill="currentColor" /><circle cx="29" cy="10" r="2.6" fill="#f6eedb" /><rect x="31" y="29" width="8" height="26" rx="3.5" fill="currentColor" /></g>
                </svg>
                <table className="flyer-table">
                  <tbody>
                    <tr><T as="th" k="wild.r1">Deer, Antelope, Bighorn</T><td><PriceCell price="$220.00" unit="min" /></td></tr>
                    <tr><T as="th" k="wild.r2">Elk &amp; Other Large Animals</T><td><PriceCell price="$1.65" unit="lb" /></td></tr>
                    <tr><T as="th" k="wild.r3">Grind/Wrap Game Trim</T><td><PriceCell price="$1.65" unit="lb" /></td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flyer-block">
              <T className="ribbon" k="wild.s2">Value Added</T>
              <div className="flyer-row">
                <svg className="flyer-ico" viewBox="0 0 64 64" aria-hidden="true">
                  <g fill="#fff" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
                    <path d="M10 34 24 28l12 6-14 6Z" /><path d="M10 34v12l12 6V40Z" /><path d="M22 40v12l14-6V34Z" />
                    <path d="M30 20 42 15l12 5-12 5Z" /><path d="M30 20v11l12 5V25Z" /><path d="M42 25v11l12-5V20Z" />
                  </g>
                </svg>
                <table className="flyer-table">
                  <tbody>
                    <tr><T as="th" k="wild.r4">Beef Fat</T><td><PriceCell price="$1.99" unit="lb" /></td></tr>
                    <tr><T as="th" k="wild.r5">Pork Fat</T><td><PriceCell price="$2.99" unit="lb" /></td></tr>
                    <tr><T as="th" k="wild.r6">Lean Pork</T><td><PriceCell price="$4.49" unit="lb" /></td></tr>
                    <tr><T as="th" k="wild.r7">Lean Beef</T><td><PriceCell price="$3.99" unit="lb" /></td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flyer-block">
              <T className="ribbon" k="wild.s3">Sausage Making</T>
              <div className="flyer-row">
                <svg className="flyer-ico" viewBox="0 0 64 64" aria-hidden="true">
                  <g fill="currentColor">
                    <rect x="4" y="18" width="46" height="14" rx="7" transform="rotate(-12 27 25)" />
                    <rect x="10" y="32" width="46" height="14" rx="7" transform="rotate(-12 33 39)" />
                    <circle cx="50" cy="48" r="9" fill="#f1c4b8" stroke="currentColor" strokeWidth="3" />
                  </g>
                  <g fill="currentColor"><circle cx="47" cy="46" r="1.4" /><circle cx="52" cy="50" r="1.4" /><circle cx="51" cy="44" r="1.2" /></g>
                </svg>
                <table className="flyer-table">
                  <tbody>
                    <tr><T as="th" k="wild.r8">Salami / Summer Sausage</T><td><PriceCell price="$3.49" unit="lb" /></td></tr>
                    <tr>
                      <th><T k="wild.r9">Basque Chorizos</T><T as="small" k="wild.nopork">(not including price of pork)</T></th>
                      <td><PriceCell price="$3.49" unit="lb" /> <Pork /></td>
                    </tr>
                    <tr><T as="th" k="wild.r10">American Sausage Bulk</T><td><PriceCell price="$2.49" unit="lb" /> <Pork /></td></tr>
                    <tr><T as="th" k="wild.r11">Italian Sausage Bulk</T><td><PriceCell price="$2.49" unit="lb" /> <Pork /></td></tr>
                    <tr>
                      <th><T k="wild.r12">Italian Link Hot or Mild</T><T as="small" k="wild.nopork">(not including price of pork)</T></th>
                      <td><PriceCell price="$2.99" unit="lb" /> <Pork /></td>
                    </tr>
                    <tr><T as="th" k="wild.r13">Jerky</T><td><PriceCell price="$3.99" unit="lb" /></td></tr>
                    <tr><th>Pepperoni</th><td><PriceCell price="$4.99" unit="lb" /></td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flyer-notes">
              <div className="notes-label">
                <T k="wild.noteh">Important Information &amp; Notes</T>
                <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-antler" /></svg>
              </div>
              <ul>
                <T as="li" k="wild.n1">We cannot accept animals that are <strong>NOT CLEANED.</strong></T>
                <T as="li" k="wild.n2">Animals must be completely skinned with <strong>NO</strong> head, feet, or any organ attached.</T>
                <T as="li" k="wild.n3">To store head or hide, it must be sealed in a plastic bag and boxed.</T>
                <T as="li" k="wild.n4">All Uptown sausage recipes are for <strong>25-pound batches.</strong></T>
                <T as="li" k="wild.n5">We will add pork or beef to your order to make the correct weight.</T>
                <T as="li" k="wild.n6">We make our wild game sausage with <strong>50% pork.</strong></T>
              </ul>
            </div>

            <footer className="flyer-foot">
              <T as="p" className="flyer-banner" k="wild.call">Please call ahead with questions or special requests.</T>
              <div className="flyer-ctas">
                <a className="btn btn-red" href="tel:+17756232405"><Icon name="phone" />(775) 623-2405</a>
                <a className="btn btn-flyer" href="https://www.google.com/maps/search/?api=1&query=1200+S+Bridge+St+Winnemucca+NV+89445" target="_blank" rel="noopener">
                  <Icon name="dir" />
                  <T k="ui.directions">Directions</T>
                </a>
              </div>
              <T as="p" className="flyer-fine" k="wild.fine">Prices subject to change without notice.</T>
            </footer>
          </article>
        </div>
      </section>

      {/* ================= TAQUERIA ================= */}
      <section className="section taq" id="taqueria">
        <div className="wrap">
          <div className="taq-top">
            <div className="section-head reveal" style={{ margin: 0 }}>
              <span className="script">La Taquería</span>
              <T as="h2" k="taq.h2">Cooked to Order. Never Pre-Made.</T>
              <T as="p" className="lede" k="taq.lede">
                Street tacos with that real street flavor, slow-cooked quesabirria dipped in consommé, burritos, tortas and Mexican breakfast — made with the same fresh meat from our counter.
              </T>
            </div>
            <div className="taq-photos reveal">
              <img src="/images/al-pastor.webp" alt="Al pastor with pineapple" loading="lazy" />
              <img src="/images/team-kitchen.webp" alt="Our cooks with fresh marinated meat" loading="lazy" />
            </div>
          </div>
          <BestSellers />
          <div className="taq-actions reveal">
            <DD className="btn btn-red"><Icon name="bag" /><T k="cta.orderNow">Order Now on DoorDash</T></DD>
            <Link className="btn btn-ghost" href="/menu"><T k="cta.fullmenu">View Full Menu</T></Link>
          </div>
          <T as="p" className="dd-note" k="dd.note">Prices as listed on DoorDash and may differ in store.</T>
        </div>
      </section>

      {/* ================= AGUAS ================= */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap aguas">
          <img className="reveal" src="/images/aguas-frescas.webp" alt="Horchata and cucumber-lime agua fresca in Imperial cups" loading="lazy" />
          <div className="reveal">
            <span className="script">Aguas Frescas</span>
            <T as="h2" k="aguas.h2">Made Fresh, Served Cold</T>
            <T as="p" className="lede" k="aguas.lede">
              Wash it all down with a big cup of house agua fresca — creamy horchata, tangy jamaica and more — or an ice-cold Mexican Coke and Jarritos.
            </T>
            <div className="chips">
              <span className="chip">Horchata</span>
              <span className="chip">Jamaica</span>
              <T className="chip" k="aguas.c3">Pepino con Limón</T>
              <span className="chip">Mexican Coca-Cola</span>
              <span className="chip">Jarritos</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PANADERIA ================= */}
      <section className="section bakery" id="panaderia">
        <div className="wrap">
          <div className="section-head center reveal">
            <span className="script">Pan Fresco</span>
            <T as="h2" k="bak.h2">The Panadería</T>
            <T as="p" className="lede" k="bak.lede">
              Siempre fresco, siempre para ti. Traditional recipes made with love — grab a tray, pick your favorites and take home a taste of Mexico.
            </T>
          </div>
          <div className="banner-img reveal">
            <img src="/images/banner-bakery.webp" alt="Imperial bakery banner with pan dulce, donuts, cakes and cookies" loading="lazy" width={1206} height={390} />
          </div>
          <div className="bakery-grid">
            <figure className="b1 reveal">
              <img src="/images/bakery-case-pan.webp" alt="Pan dulce case with conchas, cuernos and pan de muerto" loading="lazy" />
            </figure>
            <div className="b2 reveal">
              <img src="/images/conchas.webp" alt="Fresh conchas" loading="lazy" />
              <div className="bakery-list">
                <div><b>Conchas</b><T k="bak.i1">Our best seller — vanilla, pink &amp; chocolate</T></div>
                <div><b>Cuernos</b><T k="bak.i2">Soft, buttery horns</T></div>
                <div><b>Pan de Muerto</b><T k="bak.i3">Seasonal · Día de Muertos</T></div>
                <div><b>Galletas</b><T k="bak.i4">Cookies of every kind</T></div>
                <div><b>Pasteles</b><T k="bak.i5">Cakes &amp; slices</T></div>
                <div><b>Donas &amp; Hojaldres</b><T k="bak.i6">Donuts &amp; puff pastries</T></div>
              </div>
            </div>
          </div>
          <div className="bakery-cases reveal">
            <img src="/images/bakery-case-cookies.webp" alt="Cookie, polvorón and pastry case" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ================= ABARROTES ================= */}
      <section className="section wood-bg" id="abarrotes">
        <div className="wrap">
          <div className="section-head center reveal">
            <span className="script">Abarrotes</span>
            <T as="h2" k="gro.h2">Mexican Groceries</T>
            <T as="p" className="lede" k="gro.lede">The brands and staples you grew up with — and everything else your kitchen needs — at great prices.</T>
          </div>
          <div className="grocery-grid reveal">
            <div className="g-item"><div className="ico">🫓</div><b>Tortillas</b><T k="gro.1">Corn &amp; flour</T></div>
            <div className="g-item"><div className="ico">🧀</div><b>Quesos</b><T k="gro.2">Cheeses</T></div>
            <div className="g-item"><div className="ico">🥛</div><b>Cremería</b><T k="gro.3">Dairy &amp; crema</T></div>
            <div className="g-item"><div className="ico">🥑</div><b>Verduras</b><T k="gro.4">Fresh produce</T></div>
            <div className="g-item"><div className="ico">🌶️</div><b>Salsas</b><T k="gro.5">Salsas &amp; chiles</T></div>
            <div className="g-item"><div className="ico">🥤</div><b>Bebidas</b><T k="gro.6">Drinks</T></div>
          </div>
        </div>
      </section>

      {/* ================= CATERING ================= */}
      <section className="section catering" id="catering">
        <div className="bg"><img src="/images/case-marinated-pork.webp" alt="" loading="lazy" /></div>
        <div className="wrap cater-grid">
          <div className="reveal">
            <span className="script">Catering &amp; Eventos</span>
            <T as="h2" k="cat.h2">Planning a Celebration?</T>
            <T as="p" className="lede" k="cat.lede">
              Graduation party, family gathering or special event — we&apos;ll help you plan it with fresh meats, Mexican food and catering made with flavor and quality. Place your order early and let us make your celebration easier.
            </T>
            <ul className="cater-list">
              <li><Icon name="check" /><T k="cat.1">Fresh cuts / Cortes frescos</T></li>
              <li><Icon name="check" /><T k="cat.2">Carne asada options</T></li>
              <li><Icon name="check" /><T k="cat.3">Graduations &amp; events</T></li>
              <li><Icon name="check" /><T k="cat.4">Family-friendly service</T></li>
            </ul>
            <div className="hero-ctas">
              <a className="btn btn-gold" href="tel:+17756239191"><Icon name="phone" />(775) 623-9191</a>
              <a className="btn btn-ghost" href="tel:+17756232405"><Icon name="phone" />(775) 623-2405</a>
            </div>
          </div>
          <div className="packs reveal">
            <h3><T k="cat.packs">Party Packs</T></h3>
            <T as="p" className="note" style={{ color: "var(--dim)", fontSize: 13, margin: "4px 0 14px" }} k="cat.packsnote">
              Ready to order on DoorDash — or call for bigger events.
            </T>
            <PacksList />
            <a className="btn btn-red" style={{ marginTop: 20, width: "100%" }} href={DOORDASH} target="_blank" rel="noopener">
              <Icon name="party" />
              <T k="cat.orderpack">Order a Party Pack</T>
            </a>
          </div>
        </div>
      </section>

      {/* ================= LOCATIONS ================= */}
      <section className="section wood-bg" id="locations">
        <div className="wrap">
          <div className="section-head center reveal">
            <T className="script" k="loc.script">Visítanos</T>
            <T as="h2" k="loc.h2">Two Stores in Winnemucca</T>
            <T as="p" className="lede" k="loc.lede">Meat market, taquería, bakery and groceries at both locations. Stop in today.</T>
          </div>
          <LocationGrid />
        </div>
      </section>

      {/* ================= INSTAGRAM ================= */}
      <section className="section" style={{ paddingBottom: "clamp(64px,8vw,100px)" }}>
        <div className="wrap">
          <div className="ig-head reveal">
            <div>
              <T className="script" k="ig.script">Síguenos</T>
              <h2>@laimperialmeatmarket</h2>
            </div>
            <a className="btn btn-ghost" href={INSTAGRAM} target="_blank" rel="noopener">
              <Icon name="ig" />
              <T k="ig.follow">Follow on Instagram</T>
            </a>
          </div>
          <div className="ig-grid reveal">
            {IG_PHOTOS.map((p) => (
              <a key={p} href={INSTAGRAM} target="_blank" rel="noopener" aria-label="Instagram">
                <img src={`/images/${p}.webp`} alt="" loading="lazy" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
