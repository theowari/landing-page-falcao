"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";

import { cn } from "@/lib/utils";

/*
 * Adaptado para a Somark: o HoverExpand_002 original (ExpandOnHover vertical) expande
 * imagens empilhadas. Aqui cada linha é só texto (ícone Phosphor, título, explicação
 * e número) e a aberta cresce até a altura do conteúdo, então o mesmo layout serve
 * no desktop e no celular, onde não há hover: a linha abre por toque, clique ou foco.
 * As imagens (src/alt) e o Skiper53 de demonstração saíram, junto com o import do swiper.
 *
 * Observação: o reset de prototipos/v3/css/styles.css não tem camada e vence os
 * utilitários do Tailwind. Por isso a fonte fica nos <span> (button { font: inherit })
 * e o contorno de foco usa "!".
 */

export type HoverExpandItem = {
  title: string;
  text: string;
  /** Classe do ícone Phosphor, ex.: "ph ph-megaphone". */
  icon?: string;
  /** Rótulo pequeno da linha, ex.: "# 01". */
  code?: string;
  /** Cor da linha (fundo e texto), ex.: "bg-tile-2 text-ink". */
  className?: string;
};

// Mesmas curvas de prototipos/v3 (--ease-in-out e --ease-out).
const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// Linha fechada: 72px, acima do alvo de toque de 48px.
const CLOSED_HEIGHT = 72;

const HoverExpand_002 = ({
  items,
  className,
  defaultActive = 0,
}: {
  items: HoverExpandItem[];
  className?: string;
  defaultActive?: number;
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultActive);
  const reduce = useReducedMotion();
  const uid = useId();
  const time = (s: number) => (reduce ? 0 : s);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: time(0.7), ease: EASE_OUT }}
      className={cn("relative w-full", className)}
    >
      <div className="flex w-full flex-col gap-2">
        {items.map((item, index) => {
          const isOpen = activeIndex === index;
          const tabId = `${uid}-tab-${index}`;
          const panelId = `${uid}-panel-${index}`;

          return (
            <motion.article
              key={index}
              className={cn("relative min-w-0 overflow-hidden rounded-lg", item.className)}
              initial={false}
              animate={{ height: isOpen ? "auto" : CLOSED_HEIGHT }}
              transition={{ duration: time(0.45), ease: EASE_IN_OUT }}
              onHoverStart={() => setActiveIndex(index)}
            >
              <h3>
                <button
                  id={tabId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={isOpen ? panelId : undefined}
                  onClick={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  style={{ minHeight: CLOSED_HEIGHT }}
                  className={cn(
                    "flex w-full items-center justify-between gap-4 border-0 bg-transparent px-5 text-left",
                    "focus-visible:outline-current! focus-visible:-outline-offset-4!",
                    isOpen ? "cursor-default" : "cursor-pointer",
                  )}
                >
                  <span className="flex items-center gap-3">
                    {item.icon && (
                      <i className={cn(item.icon, "text-2xl")} aria-hidden="true" />
                    )}
                    <span className="font-serif text-[clamp(1.25rem,2.2cqi,1.625rem)] leading-[1.1] font-semibold tracking-[-0.02em]">
                      {item.title}
                    </span>
                  </span>
                  {item.code && (
                    <span className="font-sans text-xs font-semibold tabular-nums opacity-60">
                      {item.code}
                    </span>
                  )}
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={tabId}
                    className="px-5 pb-5 pl-[3.5rem] font-sans text-[length:var(--t-body)]"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: time(0.45), delay: time(0.2), ease: EASE_OUT },
                    }}
                    exit={{ opacity: 0, transition: { duration: time(0.15) } }}
                  >
                    <p className="max-w-[42ch]">{item.text}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </motion.div>
  );
};

export { HoverExpand_002 };

/**
 * Skiper 53 HoverExpand_002 — React + Framer Motion
 * Illustrations by AarzooAly - https://x.com/AarzooAly
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.me
 * Twitter: https://x.com/Gur__vi
 */
