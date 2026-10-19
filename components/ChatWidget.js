/*
 * ChatWidget — burbuja de chat estilo GoHighLevel ("Hola, ¿en qué te ayudo?").
 *
 * QUÉ ES EN LA WEB REAL:
 * GoHighLevel es un CRM de marketing: el chat de la web se conecta a él y
 * dispara automatizaciones ("si el visitante pregunta por precios, mándale
 * los planes por WhatsApp"). Cuesta desde ~$97/mes.
 *
 * QUÉ ES EN ESTA DEMO:
 * Un chat simulado con respuestas automáticas, para que veas dónde va el
 * widget y cómo se integra. En producción, aquí iría el snippet que te da
 * GoHighLevel (o Tawk.to gratis, o la API de WhatsApp).
 */
"use client";

import { useState } from "react";
import { trackEvent } from "../lib/analytics";

// Conversación simulada: pregunta → respuesta automática
const RESPUESTAS = {
  inicio: {
    texto: "¡Hola! 👋 Soy el asistente de Suerte Club. ¿En qué te ayudo?",
    opciones: ["Quiero ver los planes 💳", "¿Cómo son los sorteos? 🎁", "Hablar por WhatsApp 📲"],
  },
  planes: {
    texto: "Tenemos 4 planes: Humildad S/8 al mes, Hermanito S/21 al trimestre, Achorado S/38 al semestre y Opulencia S/60 al año. ¡Mientras más largo el plan, más barato te sale el mes!",
    opciones: ["Ver los planes 👇", "Hablar por WhatsApp 📲"],
  },
  sorteos: {
    texto: "Sorteamos premios TODOS los viernes a las 8 p.m. Con tu suscripción activa participas automáticamente. 🎉",
    opciones: ["Quiero suscribirme 💳", "Hablar por WhatsApp 📲"],
  },
  whatsapp: {
    texto: "¡Genial! En producción este botón te llevaría a nuestro WhatsApp con un mensaje pre-llenado. 📲",
    opciones: ["Ver los planes 👇"],
  },
};

export default function ChatWidget() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState([
    { de: "bot", texto: RESPUESTAS.inicio.texto },
  ]);
  const [opciones, setOpciones] = useState(RESPUESTAS.inicio.opciones);

  function responder(opcion) {
    // 1) Mostramos lo que "dijo" el usuario
    setMensajes((m) => [...m, { de: "yo", texto: opcion }]);
    // 2) Medimos el interés: cada pregunta del chat es un evento Lead
    trackEvent("Lead", { origen: "chat", pregunta: opcion });

    // 3) El "bot" responde después de una pausa (como un humano)
    setTimeout(() => {
      let clave = "inicio";
      if (opcion.includes("planes")) clave = "planes";
      else if (opcion.includes("sorteos")) clave = "sorteos";
      else if (opcion.includes("WhatsApp")) clave = "whatsapp";
      else if (opcion.includes("suscribirme")) {
        // Si quiere suscribirse, lo mandamos a los planes
        document.getElementById("planes")?.scrollIntoView({ behavior: "smooth" });
        clave = "planes";
      }
      setMensajes((m) => [...m, { de: "bot", texto: RESPUESTAS[clave].texto }]);
      setOpciones(RESPUESTAS[clave].opciones);
    }, 700);
  }

  return (
    <>
      <button
        className="chat-boton"
        onClick={() => {
          setAbierto(!abierto);
          if (!abierto) trackEvent("Lead", { origen: "chat_abierto" });
        }}
        aria-label="Abrir chat"
      >
        {abierto ? "✕" : "💬"}
      </button>

      {abierto && (
        <div className="chat-ventana">
          <div className="chat-cabecera">
            Suerte Club 🍀<small>En línea — responde al instante</small>
          </div>
          <div className="chat-cuerpo">
            {mensajes.map((m, i) => (
              <div key={i} className={`mensaje ${m.de}`}>
                {m.texto}
              </div>
            ))}
          </div>
          <div className="chat-opciones">
            {opciones.map((op) => (
              <button key={op} onClick={() => responder(op)}>
                {op}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
