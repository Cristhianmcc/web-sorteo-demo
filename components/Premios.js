/* Premios — "prueba social": mostrar premios genera confianza y deseo.
   En la web real aquí irían fotos de ganadores (con su permiso). */
const PREMIOS = [
  { emoji: "💵", nombre: "S/5,000 en efectivo", detalle: "Sorteo semanal" },
  { emoji: "📱", nombre: "iPhone 17", detalle: "Premiazo del mes" },
  { emoji: "🛵", nombre: "Moto eléctrica", detalle: "Sorteo especial" },
  { emoji: "✈️", nombre: "Viaje a Cancún", detalle: "Gran sorteo trimestral" },
];

export default function Premios() {
  return (
    <section id="premios" className="seccion premios">
      <div className="contenedor">
        <span className="kicker">Esta semana</span>
        <h2>Premiazos que puedes ganar</h2>
        <p className="subtitulo">
          Con tu suscripción activa ya estás participando. Sin registros extra, sin letras chicas.
        </p>
        <div className="premio-lista">
          {PREMIOS.map((p) => (
            <div key={p.nombre} className="premio">
              <span className="emoji">{p.emoji}</span>
              <b>{p.nombre}</b>
              <small>{p.detalle}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
