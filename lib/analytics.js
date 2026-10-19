/*
 * ============================================================================
 *  lib/analytics.js — EL MÓDULO DE MARKETING Y ANALÍTICA
 * ============================================================================
 *  IDEA CENTRAL (léelo 3 veces):
 *  Tu web no "habla" con Google/Meta/TikTok por magia. Lo que hace es cargar
 *  un pequeño script de cada plataforma y luego AVISARLE cada vez que pasa
 *  algo importante: "alguien vio la página", "alguien hizo clic en un plan",
 *  "alguien pagó". Esos avisos se llaman EVENTOS.
 *
 *  ¿Para qué sirve cada herramienta?
 *  ----------------------------------------------------------------------------
 *  1) Google Analytics 4 (GA4) ..... te dice QUÉ PASA en tu web: cuánta gente
 *     entra, de dónde viene, cuánto tiempo se queda, en qué botón hace clic.
 *     Es tu "tablero de control".
 *  2) Meta Pixel ................... le dice a Facebook/Instagram QUIÉN hizo
 *     qué en tu web, para que tus anuncios se muestren a gente parecida a
 *     tus compradores (eso se llama "optimizar" y "crear públicos similares").
 *  3) TikTok Pixel ................. lo mismo que el Meta Pixel, pero para
 *     los anuncios de TikTok.
 *  4) Microsoft Clarity ............ GRABA sesiones (como un video) y genera
 *     MAPAS DE CALOR: ves dónde hace clic la gente y hasta dónde baja con
 *     el scroll. Gratis. Ideal para descubrir por qué no te compran.
 *
 *  EL EMBUDO (funnel) que medimos en esta demo:
 *     PageView → el usuario entró a la web
 *     ViewContent → vio la sección de planes
 *     InitiateCheckout → hizo clic en "Suscribirme" de un plan
 *     Purchase → completó el pago (en la demo es simulado)
 *
 *  Cada evento se envía a LAS CUATRO herramientas a la vez con una sola
 *  llamada: trackEvent('Purchase', {...}). Eso es lo elegante del diseño.
 * ============================================================================
 */

// "use client" = este archivo corre en el NAVEGADOR del visitante,
// no en el servidor. Los píxeles necesitan el navegador para funcionar.
"use client";

// Leemos los IDs desde las variables de entorno.
// En Next.js, toda variable que empieza con NEXT_PUBLIC_ viaja al navegador.
// Si están vacías, los scripts simplemente NO se cargan (modo seguro).
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const META_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const TIKTOK_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

// Pequeña ayuda: inserta un <script src="..."> en la página una sola vez.
function loadScript(src, id) {
  if (document.getElementById(id)) return; // ya cargado, no duplicar
  const s = document.createElement("script");
  s.id = id;
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

/* ----------------------------------------------------------------------------
 * 1) GOOGLE ANALYTICS 4
 * El script oficial es gtag.js. Una vez cargado, la función global
 * window.gtag('event', nombre, datos) envía eventos a Google.
 * -------------------------------------------------------------------------- */
function initGA() {
  if (!GA_ID) return; // sin ID no hay nada que inicializar
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`, "ga4-script");
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function () {
      window.dataLayer.push(arguments);
    };
  window.gtag("js", new Date());
  // "config" registra la visita a la página actual en GA4
  window.gtag("config", GA_ID);
}

/* ----------------------------------------------------------------------------
 * 2) META PIXEL (Facebook / Instagram)
 * El snippet oficial crea la función global window.fbq.
 * fbq('track', 'PageView') y fbq('track', 'Purchase', {value, currency})
 * son los eventos estándar que Meta entiende para optimizar anuncios.
 * -------------------------------------------------------------------------- */
function initMetaPixel() {
  if (!META_ID) return;
  (function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  window.fbq("init", META_ID);
  window.fbq("track", "PageView");
}

/* ----------------------------------------------------------------------------
 * 3) TIKTOK PIXEL
 * Funciona igual que el de Meta: crea window.ttq y con
 * ttq.track('Purchase', {...}) avisa a TikTok Ads.
 * -------------------------------------------------------------------------- */
function initTikTokPixel() {
  if (!TIKTOK_ID) return;
  (function (w, d, t) {
    w.TiktokAnalyticsObject = t;
    var ttq = (w[t] = w[t] || []);
    ttq.methods = ["track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
    ttq.setAndDefer = function (t, e) {
      t[e] = function () {
        t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
      };
    };
    for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
    var s = d.createElement("script");
    s.async = !0;
    s.src = "https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=" + TIKTOK_ID + "&lib=" + t;
    var x = d.getElementsByTagName("script")[0];
    x.parentNode.insertBefore(s, x);
  })(window, document, "ttq");
  window.ttq.track("ViewContent");
}

/* ----------------------------------------------------------------------------
 * 4) MICROSOFT CLARITY
 * El más simple de todos: un script que empieza a grabar automáticamente.
 * Luego en clarity.microsoft.com ves los videos y mapas de calor.
 * -------------------------------------------------------------------------- */
function initClarity() {
  if (!CLARITY_ID) return;
  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", CLARITY_ID);
}

/* ----------------------------------------------------------------------------
 * FUNCIÓN MAESTRA: se llama UNA vez cuando la app arranca (ver layout.js).
 * Si algún ID está vacío, esa herramienta se salta en silencio y la web
 * sigue funcionando: por eso puedes aprender sin crear ninguna cuenta.
 * -------------------------------------------------------------------------- */
export function initAnalytics() {
  if (typeof window === "undefined") return; // seguridad: solo navegador
  initGA();
  initMetaPixel();
  initTikTokPixel();
  initClarity();

  // Chivato de aprendizaje: mira la consola del navegador (F12) y verás
  // qué herramientas están activas y cuáles están en modo demo.
  console.log(
    "%c[analítica] GA4:%s Meta:%s TikTok:%s Clarity:%s",
    "color:#f5b942;font-weight:bold",
    GA_ID ? "ON" : "demo",
    META_ID ? "ON" : "demo",
    TIKTOK_ID ? "ON" : "demo",
    CLARITY_ID ? "ON" : "demo"
  );
}

/* ----------------------------------------------------------------------------
 * trackEvent(nombre, datos): EL AVISO ÚNICO A LAS CUATRO PLATAFORMAS.
 * Ejemplo: trackEvent('Purchase', { value: 60, currency: 'PEN', plan: 'Opulencia' })
 *
 * Tabla de traducción (nombres estándar que todas entienden):
 *   Nuestro nombre  →  GA4            Meta Pixel        TikTok
 *   'PageView'      →  page_view      PageView          ViewContent
 *   'ViewContent'   →  view_item      ViewContent       ViewContent
 *   'InitiateCheckout' → begin_checkout  InitiateCheckout  InitiateCheckout
 *   'Purchase'      →  purchase       Purchase          CompletePayment
 *   'Lead'         →  generate_lead  Lead              SubmitForm
 * -------------------------------------------------------------------------- */
export function trackEvent(nombre, datos = {}) {
  if (typeof window === "undefined") return;

  // Siempre lo mostramos en consola: así APRENDES viendo qué se enviaría.
  console.log(`%c[evento] ${nombre}`, "color:#7CFC00", datos);

  // 1) Google Analytics 4
  if (window.gtag && GA_ID) {
    const gaNombre =
      { PageView: "page_view", ViewContent: "view_item", InitiateCheckout: "begin_checkout", Purchase: "purchase", Lead: "generate_lead" }[nombre] || nombre;
    window.gtag("event", gaNombre, datos);
  }

  // 2) Meta Pixel
  if (window.fbq && META_ID) {
    window.fbq("track", nombre, datos);
  }

  // 3) TikTok Pixel (llama 'CompletePayment' a lo que Meta llama 'Purchase')
  if (window.ttq && TIKTOK_ID) {
    const ttNombre = nombre === "Purchase" ? "CompletePayment" : nombre;
    window.ttq.track(ttNombre, datos);
  }

  // Clarity no necesita eventos manuales: graba todo solo.
}

/* ----------------------------------------------------------------------------
 * trackPageView(ruta): avisa "alguien abrió esta página".
 * En Next.js App Router lo llamamos cada vez que cambia de página.
 * -------------------------------------------------------------------------- */
export function trackPageView(ruta) {
  trackEvent("PageView", { page_path: ruta });
}
