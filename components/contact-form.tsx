"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ES } from "@/lib/es";
import { Icon } from "./icons";
import { T, useLang } from "./lang";

type Status = "form" | "done" | "soon";

export function ContactForm() {
  const { lang } = useLang();
  const tx = (k: string, en: string) => (lang === "es" && ES[k] ? ES[k] : en);
  const [status, setStatus] = useState<Status>("form");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status !== "form") resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [status]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    if (get("_gotcha")) return; // bot
    if (!get("name") || !get("phone") || !get("message")) {
      setError(tx("cf.err", "Please fill in your name, phone number and message."));
      return;
    }
    const data = {
      name: get("name"),
      phone: get("phone"),
      email: get("email"),
      store: get("store"),
      topic: get("topic"),
      date: get("date"),
      message: get("message"),
      language: lang,
      _gotcha: get("_gotcha"),
    };
    setSending(true);
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (r.status === 503) return setStatus("soon"); // email not configured yet
      if (!r.ok) throw new Error(String(r.status));
      setStatus("done");
    } catch {
      setError(tx("cf.fail", "Sorry, that didn't send. Please try again or give us a call."));
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <form className="ct-form reveal" id="contact-form" noValidate hidden={status !== "form"} onSubmit={onSubmit}>
        <div className="cf-row">
          <label>
            <T k="cf.name">Your name</T> <b>*</b>
            <input type="text" name="name" autoComplete="name" required maxLength={120} />
          </label>
          <label>
            <T k="cf.phone">Phone number</T> <b>*</b>
            <input type="tel" name="phone" autoComplete="tel" inputMode="tel" required maxLength={40} />
          </label>
        </div>
        <div className="cf-row">
          <label>
            <T k="cf.email">Email</T> <T as="small" k="cf.optional">(optional)</T>
            <input type="email" name="email" autoComplete="email" maxLength={200} />
          </label>
          <label>
            <T k="cf.store">Which store?</T>
            <select name="store" defaultValue="Winnemucca Blvd">
              <option value="Winnemucca Blvd">Winnemucca Blvd</option>
              <option value="South Bridge St">South Bridge St</option>
              <option value="Either">{tx("cf.either", "Either store")}</option>
            </select>
          </label>
        </div>
        <div className="cf-row">
          <label>
            <T k="cf.topic">What can we help with?</T>
            <select name="topic" defaultValue="General question">
              <option value="Catering / Party order">{tx("cf.t1", "Catering / party order")}</option>
              <option value="Custom cuts / Bulk meat">{tx("cf.t2", "Custom cuts / bulk meat")}</option>
              <option value="Wild game processing">{tx("cf.t3", "Wild game processing")}</option>
              <option value="Bakery order">{tx("cf.t4", "Bakery order")}</option>
              <option value="General question">{tx("cf.t5", "General question")}</option>
              <option value="Feedback">{tx("cf.t6", "Feedback")}</option>
            </select>
          </label>
          <label>
            <T k="cf.date">Date needed</T> <T as="small" k="cf.optional">(optional)</T>
            <input type="date" name="date" />
          </label>
        </div>
        <label>
          <T k="cf.msg">Your message</T> <b>*</b>
          <textarea name="message" rows={5} required maxLength={5000}></textarea>
        </label>
        <input type="text" name="_gotcha" className="cf-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <p className="cf-error" id="cf-error" hidden={!error}>{error}</p>
        <button className="btn btn-red cf-submit" type="submit" disabled={sending}>
          <Icon name="check" />
          <span>{sending ? tx("cf.sending", "Sending…") : tx("cf.send", "Send Message")}</span>
        </button>
        <T as="p" className="ct-fine" k="cf.fine">For same-day orders, please call the store directly.</T>
      </form>

      <div className="ct-form ct-done" id="cf-done" hidden={status !== "done"} ref={status === "done" ? resultRef : undefined}>
        <div className="ct-ico"><Icon name="check" /></div>
        <T as="h3" k="cf.okH">Thank you!</T>
        <T as="p" k="cf.okP">We got your message and will get back to you as soon as possible.</T>
      </div>

      <div className="ct-form ct-done" id="cf-soon" hidden={status !== "soon"} ref={status === "soon" ? resultRef : undefined}>
        <div className="ct-ico"><Icon name="phone" /></div>
        <T as="h3" k="cf.soonH">Please give us a call</T>
        <T as="p" k="cf.soonP">Online messages aren&apos;t connected yet, so your message was not sent. Call us and we&apos;ll help you right away.</T>
        <div className="taq-actions" style={{ marginTop: 18 }}>
          <a className="btn btn-gold" href="tel:+17756239191"><Icon name="phone" />(775) 623-9191</a>
          <a className="btn btn-ghost" href="tel:+17756232405"><Icon name="phone" />(775) 623-2405</a>
        </div>
      </div>
    </>
  );
}
