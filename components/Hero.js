/* Hero — la primera pantalla. Su único objetivo: que el visitante
   entienda la oferta en 5 segundos y haga clic. */
"use client";

import Link from "next/link";
import { trackEvent } from "../lib/analytics";

export default function Hero() {
  return (
    <section className="hero contenedor">
      <span className="kicker">🍀 Club de suscripción</span>
      <h1>
        Suscríbete
        <br />
        y tienta tu <span className="dorado">suerte</span>
      </h1>
      <p>
        Únete a la comunidad, obtén beneficios exclusivos y participa
        automáticamente en sorteos increíbles todas las semanas.
      </p>
      <div className="hero-botones">
        <Link
          href="#planes"
          className="boton"
          onClick={() => trackEvent("ViewContent", { seccion: "planes", origen: "hero" })}
        >
          ¡Quiero unirme!
        </Link>
        <a href="#como-funciona" className="boton boton-fantasma">
          ¿Cómo funciona?
        </a>
      </div>
      <div className="hero-stats">
        <div className="stat"><b>+12,400</b><small>miembros activos</small></div>
        <div className="stat"><b>48</b><small>sorteos realizados</small></div>
        <div className="stat"><b>S/96,000</b><small>en premios entregados</small></div>
      </div>
    </section>
  );
}
