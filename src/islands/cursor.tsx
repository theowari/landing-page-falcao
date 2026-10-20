/* Ilha React do cursor (prototipos/v2).
   O SimpleMouseFollow (Skiper 61) vale para a página toda: um bloco pequeno segue o
   mouse e vira contorno sobre links e botões. Só monta com mouse/trackpad; no touch
   e sem JavaScript fica o cursor nativo. As cores por tema estão em island.css. */
import { MotionConfig } from "framer-motion";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { SimpleMouseFollow } from "@/components/ui/skiper-ui/skiper61";
import "@/styles/island.css";

const mount = document.createElement("div");
document.body.append(mount);

createRoot(mount).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <SimpleMouseFollow />
    </MotionConfig>
  </StrictMode>,
);
