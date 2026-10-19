/*
 * checkout/page.js — PÁGINA DE PAGO (DEMO).
 *
 * CÓMO FUNCIONA EL PAGO REAL EN PERÚ (para cuando lo actives):
 * ------------------------------------------------------------------
 * 1) NIUBIZ (tarjeta): te afilias como comercio en niubiz.com.pe, te dan
 *    un usuario/clave de comercio y usas su API o su formulario incrustado.
 *    El flujo real: tu backend crea la "orden" → Niubiz cobra la tarjeta →
 *    Niubiz te avisa por webhook → tú activas la suscripción.
 * 2) YAPE (solo Perú): con Yape Empresas generas un QR o link de pago por
 *    el monto exacto; el usuario paga desde su app y tú validas el pago.
 *
 * EN ESTA DEMO no se cobra nada: el botón "Pagar" solo simula el proceso
 * y dispara el evento Purchase para que veas cómo viaja la información
 * a GA4, Meta y TikTok. Fíjate en la consola del navegador (F12).
 */
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PLANES } from "../../lib/datos";
import { trackEvent } from "../../lib/analytics";
import { Suspense } from "react";

function CheckoutContenido() {
  const params = useSearchParams();
  const planId = params.get("plan") || "achorado";
  const plan = PLANES.find((p) => p.id === planId) || PLANES[2];

  const [metodo, setMetodo] = useState("tarjeta");
  const [pagado, setPagado] = useState(false);
  const [procesando, setProcesando] = useState(false);

  function pagar(e) {
    e.preventDefault();
    setProcesando(true);

    // Simulamos los 2 segundos que tardaría Niubiz/Yape en responder
    setTimeout(() => {
      setProcesando(false);
      setPagado(true);

      // EVENTO CLAVE: la compra se completó.
      // Es el evento MÁS VALIOSO: con él, Meta y TikTok aprenden a mostrar
      // tus anuncios a personas parecidas a tus compradores.
      trackEvent("Purchase", {
        value: plan.precio,
        currency: "PEN",
        plan: plan.nombre,
        metodo_pago: metodo === "tarjeta" ? "Niubiz (demo)" : "Yape (demo)",
      });
    }, 2000);
  }

  if (pagado) {
    return (
      <div className="seccion contenedor">
        <div className="checkout-caja">
          <div className="exito">
            <span className="check">🎉</span>
            <h2>¡Bienvenido al club!</h2>
            <p className="subtitulo" style={{ margin: "12px auto" }}>
              Tu suscripción <b>{plan.nombre}</b> (S/{plan.precio} {plan.periodo})
              está activa en esta demo. Ya estás participando en el sorteo del viernes.
            </p>
            <p style={{ fontSize: "0.85rem", color: "var(--texto-suave)", marginTop: 16 }}>
              👆 Abre la consola del navegador (F12) y busca el evento{" "}
              <b style={{ color: "#7CFC00" }}>[evento] Purchase</b>: eso es lo que
              verían Google, Meta y TikTok en producción.
            </p>
            <Link href="/" className="boton" style={{ marginTop: 22 }}>
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="seccion contenedor">
      <span className="kicker">Checkout</span>
      <h2>Completa tu suscripción</h2>

      <div className="checkout-caja">
        <div className="resumen">
          <div className="fila">
            <span>Plan {plan.nombre}</span>
            <span>S/{plan.precio} /{plan.periodo}</span>
          </div>
          <div className="fila">
            <span>Participación en sorteos</span>
            <span style={{ color: "var(--verde)" }}>Incluida ✓</span>
          </div>
          <div className="fila total">
            <span>Total a pagar hoy</span>
            <span>S/{plan.precio}.00</span>
          </div>
        </div>

        <form onSubmit={pagar}>
          <div
            className={`metodo${metodo === "tarjeta" ? " seleccionado" : ""}`}
            onClick={() => setMetodo("tarjeta")}
          >
            <span className="radio" />
            <div>
              <b>💳 Tarjeta de crédito / débito</b>
              <small>Procesado por Niubiz — Visa, Mastercard, Amex</small>
            </div>
          </div>

          <div
            className={`metodo${metodo === "yape" ? " seleccionado" : ""}`}
            onClick={() => setMetodo("yape")}
          >
            <span className="radio" />
            <div>
              <b>📲 Yape</b>
              <small>Solo Perú — pagas desde tu app con QR</small>
            </div>
          </div>

          {metodo === "tarjeta" ? (
            <>
              <div className="campo">
                <label>Número de tarjeta</label>
                <input placeholder="4111 1111 1111 1111" required />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div className="campo" style={{ flex: 1 }}>
                  <label>Vence</label>
                  <input placeholder="MM/AA" required />
                </div>
                <div className="campo" style={{ flex: 1 }}>
                  <label>CVV</label>
                  <input placeholder="123" required />
                </div>
              </div>
              <div className="campo">
                <label>Nombre en la tarjeta</label>
                <input placeholder="Como aparece en tu tarjeta" required />
              </div>
            </>
          ) : (
            <div className="campo">
              <label>Celular Yape</label>
              <input placeholder="999 888 777" required />
            </div>
          )}

          <button type="submit" className="boton" style={{ width: "100%" }} disabled={procesando}>
            {procesando ? "Procesando pago…" : `Pagar S/${plan.precio}.00`}
          </button>
        </form>

        <div className="nota-demo">
          <b>🧪 Modo demo:</b> no se realiza ningún cobro real. En producción,
          aquí conectarías la API de <b>Niubiz</b> (con tus credenciales de
          comercio) o el QR de <b>Yape Empresas</b>, y el backend validaría el
          pago antes de activar la suscripción.
        </div>
      </div>
    </div>
  );
}

// Suspense es obligatorio en Next.js cuando una página usa useSearchParams
export default function Checkout() {
  return (
    <Suspense>
      <CheckoutContenido />
    </Suspense>
  );
}
