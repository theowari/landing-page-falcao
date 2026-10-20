/* Ilha React dos links de texto (prototipos/v2).
   Os <a class="link"> continuam no HTML: são o fallback sem JavaScript e a fonte
   do conteúdo. Aqui eles são lidos e trocados pelo Link004 (Skiper UI), com o
   efeito de preenchimento. A abertura (.hero) fica de fora; botões e blocos não
   são .link e não mudam. As cores por bloco e tema estão em island.css. */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Link004 } from "@/components/ui/skiper-ui/skiper40";
import "@/styles/island.css";

const isIcon = (node: Node): node is HTMLElement => node instanceof HTMLElement && node.tagName === "I";

for (const a of document.querySelectorAll<HTMLAnchorElement>("main a.link")) {
  if (a.closest(".hero")) continue;

  // href, rel, data-wa...; a classe fica (peso e tamanho por seção) e ganha .link--fill, sem sublinhado.
  const attrs = Object.fromEntries(
    [...a.attributes].filter((attr) => attr.name !== "class").map((attr) => [attr.name, attr.value]),
  ) as { href: string };
  const nodes = [...a.childNodes].filter((node) => isIcon(node) || node.textContent?.trim());
  const content = nodes.map((node, i) =>
    isIcon(node) ? <i key={i} className={node.className} aria-hidden="true" /> : node.textContent!.trim(),
  );
  // Link que já termina num ícone ("Ver os planos →") não ganha a segunda seta.
  const arrow = !isIcon(nodes[nodes.length - 1]);

  // display: contents deixa o link no mesmo fluxo (grid, flex ou parágrafo) do original.
  const mount = document.createElement("span");
  mount.className = "contents";
  a.replaceWith(mount);

  createRoot(mount).render(
    <StrictMode>
      <Link004 {...attrs} className={`${a.className} link--fill`} arrow={arrow}>
        {content}
      </Link004>
    </StrictMode>,
  );
}
