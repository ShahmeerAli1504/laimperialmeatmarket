/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { T } from "@/components/lang";
import { FullMenu } from "@/components/menu";
import { DOORDASH } from "@/lib/data";

export const metadata: Metadata = {
  title: "Menu | La Imperial Meat Market & Taqueria — Winnemucca, NV",
  description: "Full taqueria menu: street tacos, quesabirria, burritos, breakfast and party packs. Order on DoorDash.",
};

export default function MenuPage() {
  return (
    <>
      <section className="page-hero">
        <div className="bg"><img src="/images/al-pastor.webp" alt="" /></div>
        <div className="wrap">
          <span className="script">La Taquería</span>
          <T as="h1" className="gold-text" k="menu.h1">Our Menu</T>
          <T as="p" className="lede" k="menu.lede">
            Everything made to order with fresh meat from our own counter. Browse the menu here, then order for delivery or pickup on DoorDash.
          </T>
          <a className="btn btn-red" href={DOORDASH} target="_blank" rel="noopener">
            <Icon name="bag" />
            <T k="cta.order">Order on DoorDash</T>
          </a>
        </div>
      </section>
      <FullMenu />
      <div className="wrap" style={{ padding: "56px 0 96px", textAlign: "center" }}>
        <T as="p" className="dd-note" k="dd.note">Prices as listed on DoorDash and may differ in store.</T>
        <div className="taq-actions" style={{ marginTop: 18 }}>
          <a className="btn btn-red" href={DOORDASH} target="_blank" rel="noopener">
            <Icon name="bag" />
            <T k="cta.orderNow">Order Now on DoorDash</T>
          </a>
          <Link className="btn btn-ghost" href="/#locations">
            <Icon name="pin" />
            <T k="cta.find">Find a Store</T>
          </Link>
        </div>
      </div>
    </>
  );
}
