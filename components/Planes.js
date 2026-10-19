/*
 * Planes — LA SECCIÓN QUE VENDE.
 * Trucos de marketing aplicados aquí (fíjate en cada uno):
 *  1) "Precio ancla": el plan destacado (Achorado) se marca como recomendado
 *     para empujar la decisión hacia el plan de mayor valor.
 *  2) "Equivalencia mensual": "S/60 al año" suena caro; "S/5 al mes" suena
 *     barato. Es el mismo precio, distinto marco mental.
 *  3) Cada clic en "Elegir plan" dispara InitiateCheckout con el valor del
 *     plan: así Meta y TikTok aprenden qué anuncio trae compradores.
 */
"use client";

import Link from "next/link";
import { PLANES } from "../lib/datos";
import { trackEvent } from "../lib/analytics";

export default function Planes() {
  return (
    <section id="planes" className="seccion contenedor">
      <span className="kicker">Membresías</span>
      <h2>Elige tu dosis de suerte 🍀</h2>
      <p className="subtitulo">
        Elige tu plan recurrente y empieza a participar desde hoy mismo.
      </p>
      <div className="planes-grid">
        {PLANES.map((plan) => (
          <div key={plan.id} className={`plan${plan.destacado ? " destacado" : ""}`}>
            {plan.destacado && <span className="recomendado">★ Recomendado</span>}
            <h3>{plan.nombre}</h3>
            <p className="tagline">{plan.tagline}</p>
            <div className="precio">
              <span className="moneda">S/</span>
              <span className="monto">{plan.precio}</span>
              <span className="periodo"> /{plan.periodo}</span>
            </div>
            <p className="equivalencia">{plan.equivalencia || "\u00A0"}</p>
            <ul>
              {plan.beneficios.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <Link
              href={`/checkout?plan=${plan.id}`}
              className="boton"
              onClick={() =>
                // EVENTO CLAVE: el usuario eligió un plan.
                // Meta/TikTok usan esto para optimizar tus anuncios.
                trackEvent("InitiateCheckout", {
                  plan: plan.nombre,
                  value: plan.precio,
                  currency: "PEN",
                })
              }
            >
              Elegir {plan.nombre}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
