/*
 * AnalyticsInit — componente invisible.
 * Su único trabajo: llamar a initAnalytics() cuando la app arranca
 * en el navegador. Así los píxeles se cargan una sola vez.
 */
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initAnalytics, trackPageView } from "../lib/analytics";

export default function AnalyticsInit() {
  const ruta = usePathname();

  // 1) Al arrancar: carga los 4 scripts (GA4, Meta, TikTok, Clarity)
  useEffect(() => {
    initAnalytics();
  }, []);

  // 2) Cada vez que el usuario cambia de página: avisa "PageView".
  //    En webs de una sola página esto no haría falta, pero en Next.js
  //    la navegación no recarga el navegador, así que hay que avisarlo
  //    manualmente. Este es un detalle que muchos olvidan.
  useEffect(() => {
    trackPageView(ruta);
  }, [ruta]);

  return null; // no dibuja nada en pantalla
}
