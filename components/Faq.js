/* FAQ — responde objeciones ANTES de que frenen la compra.
   "¿Es legal?", "¿cómo me pagan si gano?"... cada duda sin responder
   es un cliente que se va. */
import { PREGUNTAS } from "../lib/datos";

export default function Faq() {
  return (
    <section id="faq" className="seccion contenedor" style={{ maxWidth: 800 }}>
      <span className="kicker">Dudas frecuentes</span>
      <h2>¿Tienes dudas? Te las resolvemos</h2>
      <div style={{ marginTop: 30 }}>
        {PREGUNTAS.map((p) => (
          <details key={p.q} className="faq-item">
            <summary>{p.q}</summary>
            <p>{p.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
