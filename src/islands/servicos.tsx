/* Ilha React da seção #servicos (prototipos/v3).
   O texto continua no HTML: as quatro linhas estáticas são o fallback sem JavaScript
   e a fonte do conteúdo. Aqui elas são lidas e trocadas pelo HoverExpand_002
   (Skiper 53, ExpandOnHover vertical), só texto, como a seção #metodo faz com o 001. */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { HoverExpand_002, type HoverExpandItem } from "@/components/ui/skiper-ui/skiper53";
import "@/styles/island.css";

const fallback = document.querySelector<HTMLElement>("#servicos .fronts__rows");

if (fallback) {
  const items: HoverExpandItem[] = [...fallback.querySelectorAll(".row")].map((row, i) => ({
    title: row.querySelector("h3")?.textContent?.trim() ?? "",
    text: row.querySelector("p")?.textContent?.trim() ?? "",
    icon: row.querySelector("h3 i")?.className,
    code: `# ${String(i + 1).padStart(2, "0")}`,
    className: "bg-tile-2 text-ink",
  }));

  const mount = document.createElement("div");
  mount.className = "expand";
  fallback.replaceWith(mount);

  createRoot(mount).render(
    <StrictMode>
      <HoverExpand_002 items={items} />
    </StrictMode>,
  );
}
