/*
 * Datos de la demo. En la web real vendrían de una base de datos o un CMS.
 * Los precios copian el MODELO de negocio (4 planes), no la marca.
 */
export const PLANES = [
  {
    id: "humildad",
    nombre: "Humildad",
    tagline: "O sea, pagas mes a mes",
    periodo: "mensual",
    precio: 8,
    equivalencia: null,
    destacado: false,
    beneficios: [
      "Participas en los sorteos semanales",
      "Descuentos en marcas aliadas",
      "Contenido exclusivo para miembros",
    ],
  },
  {
    id: "hermanito",
    nombre: "Hermanito",
    tagline: "Parece que ahorraste un poco",
    periodo: "trimestral",
    precio: 21,
    equivalencia: "¡Es como pagar solo S/7 al mes!",
    destacado: false,
    beneficios: [
      "Participas en los sorteos semanales",
      "Descuentos en marcas aliadas",
      "Contenido exclusivo para miembros",
    ],
  },
  {
    id: "achorado",
    nombre: "Achorado",
    tagline: "Qué gusto tener gente con plata",
    periodo: "semestral",
    precio: 38,
    equivalencia: "¡Es como pagar solo S/6.30 al mes!",
    destacado: true,
    beneficios: [
      "Participas en los sorteos semanales",
      "Descuentos en marcas aliadas",
      "Estatus VIP desde el día uno",
      "Merch exclusivo de bienvenida",
    ],
  },
  {
    id: "opulencia",
    nombre: "Opulencia",
    tagline: "Te pasaste de opulente",
    periodo: "anual",
    precio: 60,
    equivalencia: "¡Es como pagar solo S/5 al mes!",
    destacado: false,
    beneficios: [
      "Participas en los sorteos semanales",
      "Descuentos en marcas aliadas",
      "Estatus VIP desde el día uno",
      "Merch exclusivo + regalo sorpresa",
    ],
  },
];

export const PREGUNTAS = [
  {
    q: "¿Qué es Suerte Club?",
    a: "Es una membresía: pagas un plan y participas automáticamente en sorteos semanales, además de desbloquear descuentos y contenido exclusivo.",
  },
  {
    q: "¿Cómo sé que los sorteos son reales?",
    a: "En producción aquí iría tu mecanismo de transparencia: transmisión en vivo del sorteo, lista pública de ganadores y bases legales del sorteo.",
  },
  {
    q: "¿Puedo participar desde el extranjero?",
    a: "Sí. El pago con tarjeta (Niubiz) funciona desde cualquier país. Yape solo está disponible para usuarios en Perú.",
  },
  {
    q: "¿Cuándo son los sorteos?",
    a: "Todos los viernes a las 8:00 p.m. (hora Perú). Los ganadores se anuncian en esta web y por WhatsApp.",
  },
  {
    q: "¿Cómo me contactan si gano?",
    a: "Por el WhatsApp y correo que registres al suscribirte. Por eso es importante que tus datos sean correctos.",
  },
];
