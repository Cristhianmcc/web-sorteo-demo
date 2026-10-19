/** @type {import('next').NextConfig} */
const nextConfig = {
  // React 19: activa el modo estricto para detectar malas prácticas en desarrollo
  reactStrictMode: true,

  // Exportación 100% estática: genera una carpeta "out/" con HTML/CSS/JS
  // puros, sin necesidad de servidor Node. Ideal para GitHub Pages,
  // Netlify, Vercel o cualquier hosting estático.
  output: "export",

  // GitHub Pages sirve el proyecto en un SUBDIRECTORIO:
  // https://cristhianmcc.github.io/web-sorteo-demo/
  // basePath hace que todos los links y assets usen ese prefijo.
  basePath: "/web-sorteo-demo",
  assetPrefix: "/web-sorteo-demo/",
};

export default nextConfig;
