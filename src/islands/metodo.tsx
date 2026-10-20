/* Ilha React da seção #metodo (prototipos/v2).
   O texto continua no HTML: a sanfona estática é o fallback sem JavaScript e a
   fonte do conteúdo. Aqui ela é lida e trocada pelo HoverExpand_001 (Skiper UI). */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { HoverExpand_001, type HoverExpandItem } from "@/components/ui/skiper-ui/skiper52";
import "@/styles/island.css";

// Do escuro para o claro, como nos painéis originais.
const TONES = [
  "bg-night text-light",
  "bg-field text-light",
  "bg-sage text-ink",
  "bg-tile-2 text-ink",
];

const fallback = document.querySelector<HTMLElement>("#metodo [data-stages]");

if (fallback) {
  const items: HoverExpandItem[] = [...fallback.querySelectorAll(".stage")].map((stage, i) => ({
    title: stage.querySelector(".stage__tab span")?.textContent?.trim() ?? "",
    text: stage.querySelector(".stage__body p")?.textContent?.trim() ?? "",
    icon: stage.querySelector(".stage__body i")?.className,
    code: String(i + 1).padStart(2, "0"),
    className: TONES[i % TONES.length],
  }));

  const mount = document.createElement("div");
  mount.className = "mt-8";
  fallback.replaceWith(mount);

  createRoot(mount).render(
    <StrictMode>
      <HoverExpand_001 items={items} />
    </StrictMode>,
  );
}
