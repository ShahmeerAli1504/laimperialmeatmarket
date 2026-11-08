/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Icon } from "@/components/icons";
import { T } from "@/components/lang";
import { LocationGrid } from "@/components/menu";
import { DOORDASH, INSTAGRAM } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us | La Imperial Meat Market & Taqueria — Winnemucca, NV",
  description:
    "Contact La Imperial Meat Market & Taqueria in Winnemucca, NV — phone numbers, hours, directions, catering, custom cuts, wild game processing and FAQs.",
};

const FAQ: [string, string, string, string][] = [
  ["faq.q1", "What are your hours?", "faq.a1", "Both stores are open 7 days a week. Winnemucca Blvd is open 8:00 AM – 8:00 PM, and South Bridge St opens early at 6:30 AM and closes at 8:00 PM."],
  ["faq.q2", "Do both stores carry the same things?", "faq.a2", "Yes — both locations have a full meat market, taquería, panadería and Mexican grocery. Wild game processing is done at the South Bridge St store."],
  ["faq.q3", "Can I order online or get delivery?", "faq.a3", "Yes. Our taquería menu and party packs are on DoorDash for delivery or pickup. DoorDash prices may differ from in-store prices."],
  ["faq.q4", "Can you cut meat a special way or prepare a large order?", "faq.a4", "Absolutely. Ask our butchers at the counter for custom cuts, thickness and bulk orders for parties. For big orders, call ahead so we can have everything ready."],
  ["faq.q5", "What kinds of meat do you carry?", "faq.a5", "Certified Angus Beef, pork, chicken, seafood and chorizo, plus house-marinated meats for carne asada, carnitas, barbacoa, lengua, tripas and menudo."],
  ["faq.q6", "Do you do catering for graduations and events?", "faq.a6", "Yes. We help with graduation parties, family gatherings and special events — fresh cuts, carne asada options and Mexican food. Smaller party packs are on DoorDash; for bigger events, call either store and order early."],
  ["faq.q7", "What do I need to know before bringing in wild game?", "faq.a7", "Animals must be cleaned and completely skinned, with no head, feet or organs attached. If you want to keep the head or hide, seal it in a plastic bag and box it. Call (775) 623-2405 with questions."],
  ["faq.q8", "Is the bakery bread fresh?", "faq.a8", "Every day. Conchas, cuernos, cookies, cakes, donuts and seasonal pan dulce are baked fresh — come early for the best selection."],
  ["faq.q9", "Where can I get breakfast early?", "faq.a9", "Our South Bridge St store opens at 6:30 AM — perfect for breakfast burritos and chilaquiles on your way to work."],
  ["faq.q10", "Do you speak Spanish?", "faq.a10", "¡Claro que sí! Our team speaks English and Spanish, so feel free to call or visit in whichever you prefer."],
];

function PhoneLinks({ blvd = true, bridge = true }: { blvd?: boolean; bridge?: boolean }) {
  return (
    <>
      {blvd && <a href="tel:+17756239191"><Icon name="phone" />(775) 623-9191</a>}
      {bridge && <a href="tel:+17756232405"><Icon name="phone" />(775) 623-2405</a>}
    </>
  );
}

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="bg"><img src="/images/store-bridge.webp" alt="" /></div>
        <div className="wrap">
          <T className="script" k="ct.script">Contáctanos</T>
          <T as="h1" className="gold-text" k="ct.h1">Get in Touch</T>
          <T as="p" className="lede" k="ct.lede">
            Questions about a special cut, a party order or wild game processing? Call either store — a real person from our family team will help you, in English or Spanish.
          </T>
          <div className="taq-actions ct-hero-ctas">
            <a className="btn btn-gold" href="tel:+17756239191"><Icon name="phone" /><T k="ct.callBlvd">Call Winnemucca Blvd</T></a>
            <a className="btn btn-ghost" href="tel:+17756232405"><Icon name="phone" /><T k="ct.callBridge">Call South Bridge St</T></a>
            <a className="btn btn-red" href="#message"><Icon name="check" /><T k="cf.send">Send Message</T></a>
          </div>
        </div>
      </section>

      {/* ================= HOW CAN WE HELP ================= */}
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="section-head center reveal">
            <T className="script" k="ct.helpScript">¿En qué te ayudamos?</T>
            <T as="h2" k="ct.helpH2">Who to Call For What</T>
            <T as="p" className="lede" k="ct.helpLede">Pick what you need and we&apos;ll point you to the fastest way to get it.</T>
          </div>
          <div className="ct-help">
            <article className="ct-card reveal">
              <div className="ct-ico"><Icon name="party" /></div>
              <T as="h3" k="ct.h1t">Catering &amp; Party Orders</T>
              <T as="p" k="ct.h1p">Graduations, birthdays, family gatherings. Call either store to plan meats and food for your event — the earlier you order, the better.</T>
              <div className="ct-links"><PhoneLinks /></div>
            </article>
            <article className="ct-card reveal">
              <div className="ct-ico"><Icon name="knife" /></div>
              <T as="h3" k="ct.h2t">Custom Cuts &amp; Bulk Meat</T>
              <T as="p" k="ct.h2p">Need a special cut, a thicker steak or a big order of carne asada? Ask at the counter or call ahead so it&apos;s ready when you arrive.</T>
              <div className="ct-links"><PhoneLinks /></div>
            </article>
            <article className="ct-card reveal">
              <div className="ct-ico"><Icon name="antler" /></div>
              <T as="h3" k="ct.h3t">Wild Game Processing</T>
              <T as="p" k="ct.h3p">Deer, elk, antelope and more — cut, wrap, grind, sausage and jerky. Processing is at our South Bridge St store; please call ahead.</T>
              <div className="ct-links">
                <PhoneLinks blvd={false} />
                <a href="/#wild-game"><Icon name="check" /><T k="ct.seePrices">See prices</T></a>
              </div>
            </article>
            <article className="ct-card reveal">
              <div className="ct-ico"><Icon name="bag" /></div>
              <T as="h3" k="ct.h4t">Delivery &amp; Online Orders</T>
              <T as="p" k="ct.h4p">Order tacos, burritos, breakfast and party packs for delivery or pickup on DoorDash. For questions about an order, call the store it came from.</T>
              <div className="ct-links">
                <a href={DOORDASH} target="_blank" rel="noopener"><Icon name="bag" /><T k="cta.order">Order on DoorDash</T></a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ================= MESSAGE FORM ================= */}
      <section className="section wood-bg" id="message">
        <div className="wrap ct-form-wrap">
          <div className="section-head center reveal">
            <T className="script" k="cf.script">Escríbenos</T>
            <T as="h2" k="cf.h2">Send Us a Message</T>
            <T as="p" className="lede" k="cf.lede">Planning a party, need a special order or just have a question? Fill this out and we&apos;ll get back to you.</T>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* ================= STORES ================= */}
      <section className="section" id="locations">
        <div className="wrap">
          <div className="section-head center reveal">
            <T className="script" k="loc.script">Visítanos</T>
            <T as="h2" k="loc.h2">Two Stores in Winnemucca</T>
            <T as="p" className="lede" k="ct.storesLede">
              Both stores are open every day of the week, with the meat market, taquería, bakery and groceries under one roof.
            </T>
          </div>
          <LocationGrid />
          <div className="ct-hours reveal">
            <T as="h3" k="ct.hoursH">Store Hours</T>
            <table>
              <tbody>
                <tr><th>Winnemucca Blvd</th><T as="td" k="ct.hoursBlvd">Monday – Sunday · 8:00 AM – 8:00 PM</T></tr>
                <tr><th>South Bridge St</th><T as="td" k="ct.hoursBridge">Monday – Sunday · 6:30 AM – 8:00 PM</T></tr>
              </tbody>
            </table>
            <T as="p" className="ct-fine" k="ct.hoursNote">Holiday hours may vary — give us a quick call before you head over.</T>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="section" id="faq">
        <div className="wrap ct-faq-wrap">
          <div className="section-head center reveal">
            <T className="script" k="ct.faqScript">Preguntas Frecuentes</T>
            <T as="h2" k="ct.faqH2">Questions We Hear Every Day</T>
          </div>
          <div className="ct-faq reveal">
            {FAQ.map(([qk, q, ak, a], i) => (
              <details key={qk} open={i === 0}>
                <T as="summary" k={qk}>{q}</T>
                <T as="p" k={ak}>{a}</T>
              </details>
            ))}
          </div>
          <div className="ct-still reveal">
            <T as="p" k="ct.still">Still have a question? We&apos;re happy to help.</T>
            <div className="taq-actions">
              <a className="btn btn-red" href="tel:+17756239191"><Icon name="phone" />(775) 623-9191</a>
              <a className="btn btn-ghost" href="tel:+17756232405"><Icon name="phone" />(775) 623-2405</a>
              <a className="btn btn-ghost" href={INSTAGRAM} target="_blank" rel="noopener"><Icon name="ig" />Instagram</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
