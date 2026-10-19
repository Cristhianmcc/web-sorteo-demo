/*
 * layout.js — el "marco" que envuelve TODAS las páginas.
 * Aquí se inicializa la analítica UNA sola vez (ver initAnalytics).
 */
import "./globals.css";
import Navbar from "../components/Navbar";
import ChatWidget from "../components/ChatWidget";
import AnalyticsInit from "../components/AnalyticsInit";

export const metadata = {
  title: "Suerte Club — Suscríbete y participa por premios increíbles",
  description:
    "Únete a Suerte Club: elige tu plan, participa en sorteos semanales y desbloquea beneficios exclusivos. (Demo educativa)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {/* Barra morada: deja clarísimo que esto es una DEMO educativa */}
        <div className="barra-demo">
          🧪 DEMO EDUCATIVA — Proyecto de aprendizaje, sin pagos reales ni sorteos reales
        </div>
        <Navbar />
        {/* Este componente invisible arranca GA4, Meta, TikTok y Clarity */}
        <AnalyticsInit />
        <main>{children}</main>
        <footer>
          <div className="contenedor">
            <div className="footer-grid">
              <div>
                <p className="logo">
                  SUERTE<span>CLUB</span>
                </p>
                <p>La membresía donde la suerte se entrena.</p>
              </div>
              <div>
                <p>
                  <b>Contacto demo</b>
                  <br />
                  hola@suerteclub.demo
                  <br />
                  WhatsApp: +51 999 888 777
                </p>
              </div>
            </div>
            <p className="aviso">
              Aviso: este sitio es un proyecto educativo. Los planes, premios y
              pagos son simulados. Si vas a operar sorteos reales en Perú,
              revisa la normativa de promociones comerciales y sorteos antes de
              cobrar.
            </p>
          </div>
        </footer>
        {/* Burbuja de chat estilo GoHighLevel */}
        <ChatWidget />
      </body>
    </html>
  );
}
