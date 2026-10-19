# 🍀 Suerte Club — Demo educativa

Réplica educativa (con marca ficticia) del **modelo** de web de suscripción para sorteos tipo jorgitoluna.com, construida con su misma pila tecnológica. Hecha para **aprender**: cada archivo está comentado en español explicando el porqué de cada decisión.

> 🧪 **Es una demo**: no hay pagos reales, ni sorteos reales, ni marca real. Los precios copian el *modelo de negocio* (4 planes), no la identidad de nadie.

---

## 🧱 La pila tecnológica (la misma del video)

| Pieza | Qué es | Rol en el negocio |
|---|---|---|
| **Next.js 15** | Framework de React | La web: rápida, posiciona en Google, fácil de escalar |
| **Google Analytics 4** | Analítica web | Tablero: quién entra, de dónde viene, qué hace |
| **Meta Pixel** | Tracker de Facebook/IG | Mide conversiones para optimizar tus anuncios |
| **TikTok Pixel** | Tracker de TikTok | Lo mismo, para anuncios en TikTok |
| **Microsoft Clarity** | Grabación de sesiones | Videos + mapas de calor gratis: *por qué* no compran |
| **Chat widget** | Simulación tipo GoHighLevel | Atiende dudas y captura interesados automáticamente |
| **Niubiz / Yape** | Pasarelas (demo) | Cobro con tarjeta y Yape en Perú |

**Nota sobre hosting**: la original usa **Azure**. Para aprender (y para la mayoría de proyectos) el par natural de Next.js es **Vercel**: despliegas con `git push` y listo, sin configurar servidores.

---

## 🚀 Cómo correrla

```bash
cd web-sorteo-demo
npm install
npm run dev
```

Abre http://localhost:3000 en tu navegador.

### Activar la analítica real (opcional)

1. Copia `.env.example` como `.env.local`
2. Crea tus cuentas gratis y pega los IDs:
   - GA4 → `analytics.google.com`
   - Meta Pixel → `business.facebook.com` → Administrador de eventos
   - TikTok Pixel → `ads.tiktok.com` → Herramientas → Eventos
   - Clarity → `clarity.microsoft.com`
3. Reinicia `npm run dev` y abre la consola (F12): verás `[analítica] GA4:ON ...`

Sin IDs, la web funciona igual pero no envía datos a ningún lado (modo aprendizaje seguro).

---

## 🎓 La lección de marketing y analítica (léeme)

### 1. El embudo: lo único que tienes que memorizar

Todo negocio digital es un embudo. El nuestro:

```
1000 personas ven tu anuncio
  → 200 entran a la web            (evento: PageView)
  → 80 miran los planes            (evento: ViewContent)
  → 20 hacen clic en "Elegir plan" (evento: InitiateCheckout)
  → 5 pagan                        (evento: Purchase)
```

Cada flecha tiene una **tasa de conversión** (200/1000 = 20%, etc.). Tu trabajo como dueño es encontrar *dónde se cae la gente* y arreglarlo. Sin eventos medidos, estás ciego.

### 2. Qué hace cada herramienta (y por qué necesitas las 4)

- **GA4** responde *qué pasa*: "el 70% se va sin bajar hasta los planes". Es tu tablero diario.
- **Meta Pixel / TikTok Pixel** responden *a quién mostrarle anuncios*: le dicen a Meta/TikTok "esta persona compró", y ellos buscan gente parecida. Sin el evento `Purchase`, tus anuncios son adivinanza cara.
- **Clarity** responde *por qué*: ves la grabación de alguien que llegó al checkout y abandonó. Quizás el botón no se ve en su celular. Eso ningún número te lo dice.
- **El chat** captura al indeciso: el que pregunta "¿es confiable?" en el chat es un comprador a un mensaje de distancia.

### 3. Dónde vive cada evento en el código

| Evento | Dónde se dispara | Archivo |
|---|---|---|
| `PageView` | Al abrir cualquier página | `components/AnalyticsInit.js` |
| `ViewContent` | Clic en "¡Quiero unirme!" (hero) | `components/Hero.js` |
| `InitiateCheckout` | Clic en "Elegir plan" / navbar | `components/Planes.js`, `Navbar.js` |
| `Lead` | Abrir el chat o hacer una pregunta | `components/ChatWidget.js` |
| `Purchase` | Pago completado (simulado) | `app/checkout/page.js` |

Todo pasa por **una sola función**: `trackEvent()` en `lib/analytics.js`, que traduce el evento al idioma de cada plataforma. Ese es el patrón profesional: *un solo lugar* para toda la medición.

### 4. Trucos de la sección de planes (psicología de precios)

Abre `components/Planes.js` y busca los comentarios: precio ancla (plan destacado), equivalencia mensual ("S/5 al mes" vs "S/60 al año") y el evento `InitiateCheckout` con el valor del plan.

### 5. Qué falta para que sea un negocio real

1. **Pagos reales**: afiliarte a Niubiz (niubiz.com.pe) como comercio y/o Yape Empresas. El checkout ya tiene los puntos de integración marcados.
2. **Backend**: guardar suscripciones, validar pagos por webhook, sorteo real con ganadores verificables.
3. **Legal**: en Perú los sorteos con cobro tienen regulación (promociones comerciales). Asesórate antes de cobrar.
4. **Dominio + hosting**: Vercel (recomendado) o tu VPS.

---

## 🗂️ Estructura del proyecto

```
web-sorteo-demo/
├── app/
│   ├── layout.js          ← marco global: navbar, chat, analítica
│   ├── page.js            ← home: ensambla las secciones
│   ├── checkout/page.js   ← pago demo (Niubiz/Yape simulados)
│   └── globals.css        ← todo el diseño
├── components/
│   ├── AnalyticsInit.js   ← arranca GA4/Meta/TikTok/Clarity
│   ├── Navbar.js          ← barra superior
│   ├── Hero.js            ← primera pantalla
│   ├── Beneficios.js      ← propuesta de valor
│   ├── Premios.js         ← prueba social
│   ├── Planes.js          ← la sección que vende
│   ├── Faq.js             ← mata objeciones
│   └── ChatWidget.js      ← chat estilo GoHighLevel (simulado)
├── lib/
│   ├── analytics.js       ← ⭐ EL ARCHIVO A ESTUDIAR: los 4 píxeles + eventos
│   └── datos.js           ← planes y preguntas (contenido)
├── .env.example           ← dónde van tus IDs reales
└── package.json
```

**Orden de lectura recomendado**: `lib/analytics.js` → `components/AnalyticsInit.js` → `components/Planes.js` → `app/checkout/page.js` → este README de nuevo.
