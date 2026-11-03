"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react";
import React from "react";

import { cn } from "@/lib/utils";

/*
 * Adaptado para a Somark:
 * - Link000 usava next/link; aqui é um <a> comum (o projeto é Vite, sem Next).
 * - As setas SVG viraram o ArrowUpRightIcon do Phosphor.
 * - Link004 (preenchimento) não usa mais bg-white + mix-blend-difference, que no
 *   fundo claro do v2 dava preto puro e texto rosado. Uma cópia do conteúdo nas
 *   cores invertidas do bloco é revelada de baixo para cima por clip-path: a linha
 *   de inversão atravessa o texto como no original, mas com as cores da marca.
 *
 * Observação: o CSS sem camada de prototipos/v2 vence os utilitários do Tailwind
 * (a { color: inherit }, .link). Por isso a cor do Link004 fica nos <span>.
 */

type LinkProps = React.ComponentProps<"a"> & { href: string };

const Arrow = ({ className }: { className?: string }) => (
  <ArrowUpRightIcon
    aria-hidden="true"
    className={cn(
      "ml-[0.3em] size-[0.55em] translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none",
      className,
    )}
  />
);

const Skiper40 = () => {
  return (
    <section className="h-full snap-y snap-mandatory overflow-y-scroll">
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-5">
        <Link001 href="mailto:hi@skiper-ui.com">hi@skiper-ui.com</Link001>
        <Link002 href="mailto:hi@skiper-ui.com">hi@skiper-ui.com</Link002>
        <Link003 href="mailto:hi@skiper-ui.com">hi@skiper-ui.com</Link003>
        <Link004 href="mailto:hi@skiper-ui.com">hi@skiper-ui.com</Link004>
        <Link005 href="mailto:hi@skiper-ui.com">hi@skiper-ui.com</Link005>
      </div>
    </section>
  );
};

export { Link000, Link001, Link002, Link003, Link004, Link005, Skiper40 };

const Link000 = ({ children, className, ...props }: LinkProps) => {
  return (
    <a
      {...props}
      className={cn(
        "group relative flex items-center",
        className,
        "before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:h-[0.05em] before:w-full before:bg-current before:content-['']",
        "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
        "hover:before:origin-left hover:before:scale-x-100",
      )}
    >
      {children}
    </a>
  );
};
const Link001 = ({ children, className, ...props }: LinkProps) => {
  return (
    <a
      target="_blank"
      {...props}
      className={cn(
        "group relative flex items-center",
        "before:pointer-events-none before:absolute before:left-0 before:top-[1.5em] before:h-[0.05em] before:w-full before:bg-current before:content-['']",
        "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
        "hover:before:origin-left hover:before:scale-x-100",
        className,
      )}
    >
      {children}
      <Arrow />
    </a>
  );
};
const Link002 = ({ children, className, ...props }: LinkProps) => {
  return (
    <a
      {...props}
      className={cn(
        "group relative flex items-center",
        className,
        "before:pointer-events-none before:absolute before:left-0 before:top-[1.5em] before:h-[0.05em] before:w-full before:bg-current before:content-['']",
        "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
        "before:origin-left",
        "hover:before:origin-right hover:before:scale-x-100",
      )}
    >
      {children}
      <Arrow />
    </a>
  );
};
const Link003 = ({ children, className, ...props }: LinkProps) => {
  return (
    <a
      {...props}
      className={cn(
        "group relative flex items-center",
        className,
        "before:pointer-events-none before:absolute before:left-0 before:top-[1.5em] before:h-[0.05em] before:w-full before:bg-current before:content-['']",
        "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
        "before:origin-center",
        "hover:before:scale-x-100",
      )}
    >
      {children}
      <Arrow />
    </a>
  );
};

const Link004Content = ({ children, arrow }: { children: React.ReactNode; arrow: boolean }) => (
  <span className="inline-flex items-center gap-1.5">
    {children}
    {arrow && (
      <Arrow className="ml-0.5 size-[0.8em] group-hover:rotate-45 group-focus-visible:translate-y-0 group-focus-visible:opacity-100" />
    )}
  </span>
);

/*
 * As cores vêm de --link-fill / --link-on-fill (src/styles/island.css), que
 * invertem o bloco onde o link está: claro, escuro, verde ou tema escuro.
 */
const Link004 = ({
  children,
  className,
  arrow = true,
  ...props
}: LinkProps & {
  /** Seta que aparece no hover. Desligue quando o link já termina com um ícone. */
  arrow?: boolean;
}) => {
  return (
    <a
      {...props}
      className={cn(
        "group relative -mx-1.5 inline-flex items-center rounded-lg px-1.5 py-0.5 no-underline",
        className,
      )}
    >
      <Link004Content arrow={arrow}>{children}</Link004Content>
      {/* O preenchimento: sobe de baixo, como os blocos da marca no rodapé. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center rounded-[inherit] bg-(--link-fill) px-1.5 text-(--link-on-fill)",
          "[clip-path:inset(100%_0_0_0)] transition-[clip-path] duration-300 ease-[var(--ease-out)] motion-reduce:transition-none",
          "group-hover:[clip-path:inset(0)] group-focus-visible:[clip-path:inset(0)]",
        )}
      >
        <Link004Content arrow={arrow}>{children}</Link004Content>
      </span>
    </a>
  );
};
const Link005 = ({ children, className, ...props }: LinkProps) => {
  return (
    <a
      {...props}
      className={cn(
        className,
        "group relative flex items-center",
        "before:pointer-events-none before:absolute before:left-0 before:w-full before:bg-white before:content-['']",
        "before:scale-x-1 before:transition-all before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
        "before:origin-left md:before:top-0",
        "before:z-1 px-2 before:h-full before:scale-x-0 before:mix-blend-difference hover:before:scale-x-100",
      )}
    >
      {children}
      <Arrow className="z-0 ml-[0.6em] -translate-x-1 translate-y-0 rotate-45 group-hover:translate-x-0" />
    </a>
  );
};

/**
 * Skiper 40 Animated Link — React
 * Inspired by and adapted from https://cursor.com/?from=home
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 * These animations aren’t associated with the cursor.com . They’re independent recreations meant to study interaction design
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
