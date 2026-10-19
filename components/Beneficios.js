/* Beneficios — responde "¿qué gano además de los sorteos?".
   En marketing esto se llama "propuesta de valor": razones para pagar
   aunque no ganes el premio. */
const BENEFICIOS = [
  {
    icono: "🎟️",
    titulo: "Sorteos semanales",
    texto: "Cada viernes participas automáticamente por premios en efectivo, tecnología y experiencias.",
  },
  {
    icono: "🏷️",
    titulo: "Descuentos exclusivos",
    texto: "Accede a promos y descuentos en marcas aliadas solo por ser miembro activo.",
  },
  {
    icono: "👕",
    titulo: "Merch solo para miembros",
    texto: "Polos, gorras y accesorios de edición limitada que no se venden en ningún otro lado.",
  },
  {
    icono: "📲",
    titulo: "Comunidad privada",
    texto: "Canal de WhatsApp con avisos antes que nadie: nuevos premios, eventos y sorpresas.",
  },
  {
    icono: "⭐",
    titulo: "Estatus VIP",
    texto: "Con planes largos te vuelves VIP: más chances en sorteos especiales y trato preferencial.",
  },
  {
    icono: "🎁",
    titulo: "Regalos sorpresa",
    texto: "Drops inesperados para miembros: códigos, accesos anticipados y bonus por antigüedad.",
  },
];

export default function Beneficios() {
  return (
    <section id="como-funciona" className="seccion contenedor">
      <span className="kicker">Beneficios</span>
      <h2>Una suscripción, muchas formas de ganar</h2>
      <p className="subtitulo">
        No solo son los sorteos: tu membresía desbloquea todo esto mientras esté activa.
      </p>
      <div className="grid-3">
        {BENEFICIOS.map((b) => (
          <div key={b.titulo} className="tarjeta">
            <span className="icono">{b.icono}</span>
            <h3>{b.titulo}</h3>
            <p>{b.texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
