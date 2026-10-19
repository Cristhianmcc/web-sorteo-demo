/* page.js — la página principal. Solo ENSAMBLA las secciones,
   cada una vive en su propio componente para que el código sea
   fácil de leer y de modificar por partes. */
import Hero from "../components/Hero";
import Beneficios from "../components/Beneficios";
import Premios from "../components/Premios";
import Planes from "../components/Planes";
import Faq from "../components/Faq";

export default function Home() {
  return (
    <>
      <Hero />
      <Beneficios />
      <Premios />
      <Planes />
      <Faq />
    </>
  );
}
