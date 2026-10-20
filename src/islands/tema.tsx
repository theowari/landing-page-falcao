/* Ilha React do botão de tema (prototipos/v2).
   O ThemeToggleButton4 (Skiper 4) entra como um quinto bloco da nav .jumps e o
   useThemeToggle (Skiper 26) troca o tema com uma View Transition em círculo.
   O next-themes põe a classe .dark no <html>; as cores escuras ficam em
   prototipos/v2/css/styles.css. Sem JavaScript não há botão e a página fica clara. */
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ThemeToggleButton4 } from "@/components/ui/skiper-ui/skiper4";
import { useThemeToggle } from "@/components/ui/skiper-ui/skiper26";
import { cn } from "@/lib/utils";
import "@/styles/island.css";

// A mesma chave do script no <head> do v2, que aplica o tema salvo antes da primeira pintura.
const STORAGE_KEY = "somark-theme";

function ThemeTile() {
  // O bloco fica no canto superior direito do quadro, então o círculo nasce de lá.
  const { isDark, toggleTheme } = useThemeToggle({ variant: "circle", start: "top-right" });

  return (
    <ThemeToggleButton4
      isDark={isDark}
      onClick={toggleTheme}
      aria-label="Tema escuro"
      aria-pressed={isDark}
      title={isDark ? "Usar o tema claro" : "Usar o tema escuro"}
      className={cn(
        "grid size-full cursor-pointer place-items-center rounded-[inherit] border-0 bg-transparent p-0 text-current hover:bg-tile-2 motion-reduce:transition-none",
        // Traço mais grosso que o original (0.7), no peso dos ícones Phosphor regular ao lado.
        "[&_svg]:size-7 [&_svg]:[stroke-width:1.2] [&_svg>path:first-child]:[stroke-width:0.5]",
      )}
    />
  );
}

// A barra do navegador no celular acompanha o fundo da página.
const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
const syncThemeColor = () => {
  const desk = getComputedStyle(document.documentElement).getPropertyValue("--desk").trim();
  if (themeColor && desk) themeColor.content = desk;
};
new MutationObserver(syncThemeColor).observe(document.documentElement, { attributeFilter: ["class"] });
syncThemeColor();

const nav = document.querySelector<HTMLElement>(".hero .jumps");

if (nav) {
  const mount = document.createElement("div");
  mount.className = "jump-theme tile";
  nav.append(mount);

  createRoot(mount).render(
    <StrictMode>
      {/* scriptProps: o next-themes renderiza um <script> anti-flash que só serve com SSR.
          Como bloco de dados, o React não avisa que ele não vai rodar; quem faz esse
          papel aqui é o script do <head>. */}
      <ThemeProvider
        attribute="class"
        storageKey={STORAGE_KEY}
        defaultTheme="light"
        enableSystem={false}
        scriptProps={{ type: "application/json" }}
      >
        <MotionConfig reducedMotion="user">
          <ThemeTile />
        </MotionConfig>
      </ThemeProvider>
    </StrictMode>,
  );
}
