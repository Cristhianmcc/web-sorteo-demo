/*
 * Navbar — barra superior fija.
 * El botón "Suscribirme" dispara el evento InitiateCheckout al hacer clic,
 * porque en marketing TODO clic importante debe medirse.
 */
"use client";

import Link from "next/link";
import { trackEvent } from "../lib/analytics";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="logo">
          SUERTE<span>CLUB</span>
        </Link>
        <nav className="nav-links">
          <a href="#beneficios">Beneficios</a>
          <a href="#premios">Premios</a>
          <a href="#planes">Planes</a>
          <a href="#faq">Dudas</a>
          <Link
            href="/checkout?plan=achorado"
            className="boton nav-cta"
            onClick={() =>
              trackEvent("InitiateCheckout", {
                plan: "achorado",
                value: 38,
                currency: "PEN",
                origen: "navbar",
              })
            }
          >
            Suscribirme
          </Link>
        </nav>
      </div>
    </header>
  );
}
