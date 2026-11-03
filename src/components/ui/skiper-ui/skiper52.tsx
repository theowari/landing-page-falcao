"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/*
 * Adaptado para a Somark: o HoverExpand_001 original expande imagens.
 * Aqui cada painel é só texto (título, explicação, ícone Phosphor e número),
 * ocupa toda a largura disponível e empilha na vertical em telas estreitas.
 *
 * Observação: o reset de prototipos/v2/css/styles.css não tem camada e vence os
 * utilitários do Tailwind. Por isso a fonte fica nos <span> (button { font: inherit })
 * e o contorno de foco usa "!".
 */

export type HoverExpandItem = {
  title: string;
  text: string;
  /** Classe do ícone Phosphor, ex.: "ph ph-rocket-launch". */
  icon?: string;
  /** Rótulo pequeno do painel aberto, ex.: "01". */
  code?: string;
  /** Cor do painel (fundo e texto), ex.: "bg-night text-light". */
  className?: string;
};

// Mesmas curvas de prototipos/v2 (--ease-in-out e --ease-out).
const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const HoverExpand_001 = ({
  items,
  className,
  defaultActive = 0,
  stackBelow = 728,
}: {
  items: HoverExpandItem[];
  className?: string;
  defaultActive?: number;
  /** Largura (px) abaixo da qual os painéis empilham. */
  stackBelow?: number;
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultActive);
  const [stacked, setStacked] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const uid = useId();
  const time = (s: number) => (reduce ? 0 : s);

  // Mede antes da primeira pintura para o celular não piscar no modo horizontal.
  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const update = (width: number) => setStacked(width < stackBelow);
    update(el.getBoundingClientRect().width);
    const ro = new ResizeObserver(([entry]) => update(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [stackBelow]);

  return (
    <motion.div
      ref={rootRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: time(0.7), ease: EASE_OUT }}
      className={cn("relative w-full", className)}
    >
      <div
        className={cn(
          "flex w-full gap-2",
          stacked ? "flex-col" : "h-[400px] flex-row",
        )}
      >
        {items.map((item, index) => {
          const isOpen = activeIndex === index;
          const tabId = `${uid}-tab-${index}`;
          const panelId = `${uid}-panel-${index}`;

          return (
            <motion.article
              key={index}
              className={cn(
                "relative min-w-0 overflow-hidden rounded-lg",
                !stacked && "basis-0",
                item.className,
              )}
              initial={false}
              animate={{ flexGrow: stacked ? 0 : isOpen ? 4.2 : 1 }}
              transition={{ duration: time(0.45), ease: EASE_IN_OUT }}
              onHoverStart={() => setActiveIndex(index)}
            >
              <h3 className={cn(!stacked && "absolute inset-0")}>
                <button
                  id={tabId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={isOpen ? panelId : undefined}
                  onClick={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className={cn(
                    "flex size-full border-0 bg-transparent text-left",
                    "focus-visible:outline-current! focus-visible:-outline-offset-8!",
                    isOpen ? "cursor-default" : "cursor-pointer",
                    stacked
                      ? "min-h-16 flex-row items-center justify-between gap-3 px-[18px] py-4"
                      : cn("flex-col items-start p-5", isOpen ? "justify-start" : "justify-end"),
                  )}
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={isOpen ? "open" : "closed"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: time(0.2) }}
                      className={cn(
                        "block",
                        isOpen
                          ? cn(
                              "font-serif leading-none font-semibold tracking-[-0.035em]",
                              stacked ? "text-[length:var(--t-lead)]" : "text-[length:var(--t-head)]",
                            )
                          : "font-sans text-[length:var(--t-body)] font-bold",
                        !isOpen && !stacked && "rotate-180 [writing-mode:vertical-rl]",
                      )}
                    >
                      {item.title}
                    </motion.span>
                  </AnimatePresence>
                  {stacked && item.code && (
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
                    className={cn(
                      "font-sans text-[length:var(--t-body)]",
                      stacked
                        ? "overflow-hidden"
                        : "pointer-events-none absolute inset-x-5 bottom-5 flex items-end justify-between gap-6",
                    )}
                    initial={stacked ? { height: 0, opacity: 0 } : { opacity: 0, y: 12 }}
                    animate={
                      stacked
                        ? { height: "auto", opacity: 1 }
                        : { opacity: 1, y: 0, transition: { duration: time(0.45), delay: time(0.2), ease: EASE_OUT } }
                    }
                    exit={stacked ? { height: 0, opacity: 0 } : { opacity: 0, transition: { duration: time(0.15) } }}
                    transition={{ duration: time(0.35), ease: EASE_IN_OUT }}
                  >
                    <div className={cn("max-w-[36ch]", stacked && "px-[18px] pb-[18px]")}>
                      {item.icon && (
                        <i className={cn(item.icon, "mb-3 block text-[2rem]")} aria-hidden="true" />
                      )}
                      <p>{item.text}</p>
                    </div>
                    {!stacked && item.code && (
                      <p className="shrink-0 text-xs font-semibold tabular-nums opacity-60">
                        {item.code}
                      </p>
                    )}
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

export { HoverExpand_001 };

/**
 * Skiper 52 HoverExpand_001 — React + Framer Motion
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
