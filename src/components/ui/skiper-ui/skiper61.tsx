"use client";

/*
 * Adaptado para a Somark:
 * - SimpleMouseFollow não fica mais preso a um <div> de 500px: escuta o document
 *   e posiciona um elemento fixed pelo clientX/clientY, então vale para a página
 *   toda. Continua sem mola: x/y são motion values, sem re-render a cada movimento.
 * - Formato de "bloco": um quadradinho de cantos arredondados que, sobre links e
 *   botões, vira o contorno de um bloco com o --radius do v2.
 * - Sobre campos de texto ele some e o cursor nativo (I) volta.
 * - Cores nas variáveis --follow-* de src/styles/island.css, uma para cada tema.
 * - Só existe com mouse: em telas touch (hover: none / pointer: coarse) não monta,
 *   e um toque num notebook com tela touch também o esconde.
 * - O cursor nativo só some (classe .has-follow no <html>) depois do primeiro
 *   movimento, para a página nunca ficar sem cursor nenhum.
 */

import { motion, useMotionValue, useSpring } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

const SPRING = {
  mass: 0.1, // avoid Controls inertia (how sluggish or responsive the object feels). Lower mass = snappier motion; higher mass = lethargic motion
  damping: 10, // its like the weight of the ball heavier the ball less it will bounce or harder the rubber band the more it will bounce
  stiffness: 131, // like rubber Band the more you strech the more speed it goes back to the original position
};

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

// O que vira contorno de bloco e o que devolve o cursor de texto.
const INTERACTIVE = 'a[href], button, [role="button"], label, summary, select';
const TEXT_ENTRY =
  'textarea, [contenteditable=""], [contenteditable="true"], input:not([type="button"], [type="submit"], [type="reset"], [type="checkbox"], [type="radio"], [type="range"], [type="color"], [type="file"])';

type Mode = "dot" | "ring" | "text";

const subscribeFinePointer = (onChange: () => void) => {
  const query = window.matchMedia(FINE_POINTER);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/** true só em aparelhos com mouse ou trackpad. */
const useFinePointer = () =>
  React.useSyncExternalStore(
    subscribeFinePointer,
    () => window.matchMedia(FINE_POINTER).matches,
    () => false,
  );

const modeFor = (target: EventTarget | null): Mode => {
  if (!(target instanceof Element)) return "dot";
  if (target.closest(TEXT_ENTRY)) return "text";
  if (target.closest(INTERACTIVE)) return "ring";
  return "dot";
};

const EASE = [0.22, 1, 0.36, 1] as const; // --ease-out do v2

const SimpleMouseFollow = ({ className }: { className?: string }) => {
  const finePointer = useFinePointer();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [visible, setVisible] = React.useState(false);
  const [mode, setMode] = React.useState<Mode>("dot");
  const [pressed, setPressed] = React.useState(false);

  React.useEffect(() => {
    if (!finePointer) return;

    const onMove = (e: PointerEvent) => {
      // Toque ou caneta num aparelho que também tem mouse: some até o mouse voltar.
      if (e.pointerType !== "mouse") return setVisible(false);
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: PointerEvent) => setMode(modeFor(e.target));
    // relatedTarget nulo: o ponteiro saiu da janela.
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) setVisible(false);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("blur", onUp);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      window.removeEventListener("blur", onUp);
    };
  }, [finePointer, x, y]);

  const active = finePointer && visible && mode !== "text";

  // Esconde o cursor nativo só enquanto o bloco está na tela.
  React.useEffect(() => {
    document.documentElement.classList.toggle("has-follow", active);
    return () => document.documentElement.classList.remove("has-follow");
  }, [active]);

  if (!finePointer) return null;

  const transition = { duration: 0.22, ease: EASE };
  const press = pressed ? 0.85 : 1;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y }}
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.15 }}
      className={cn("pointer-events-none fixed left-0 top-0 z-[1000] size-0", className)}
    >
      {/* bloco pequeno: o próprio cursor */}
      <motion.span
        initial={false}
        animate={{ scale: mode === "dot" ? press : 0, opacity: mode === "dot" ? 1 : 0 }}
        transition={transition}
        className="absolute -left-1.5 -top-1.5 size-3 rounded-[3px] bg-[var(--follow-fill)] shadow-[0_0_0_1px_var(--follow-edge),0_0_14px_var(--follow-glow)]"
      />
      {/* contorno de bloco sobre links e botões */}
      <motion.span
        initial={false}
        animate={{ scale: mode === "ring" ? press : 0.3, opacity: mode === "ring" ? 1 : 0 }}
        transition={transition}
        className="absolute -left-5 -top-5 size-10 rounded-[var(--radius)] border-[1.5px] border-[var(--follow-fill)] bg-[var(--follow-wash)] shadow-[0_0_0_1px_var(--follow-edge),0_0_18px_var(--follow-glow)]"
      />
    </motion.div>
  );
};

const SpringMouseFollow = () => {
  const xSpring = useSpring(0, SPRING);
  const ySpring = useSpring(0, SPRING);
  const opacitySpring = useSpring(0, SPRING);
  const scaleSpring = useSpring(0, SPRING);

  return (
    <div
      onPointerMove={(e) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        xSpring.set(e.clientX - bounds.left);
        ySpring.set(e.clientY - bounds.top);
      }}
      onPointerEnter={() => {
        opacitySpring.set(1);
        scaleSpring.set(1);
      }}
      onPointerLeave={() => {
        opacitySpring.set(0);
        scaleSpring.set(0);
      }}
      className="rounded-4xl bg-background mt-20 size-[500px] overflow-hidden"
    >
      <motion.div
        style={{
          x: xSpring,
          y: ySpring,
          opacity: opacitySpring,
          scale: scaleSpring,
        }}
        className="rounded-4xl size-10 bg-orange-500"
      ></motion.div>
    </div>
  );
};

const Skiper61 = () => {
  return (
    <section className="h-screen w-full snap-y snap-mandatory overflow-y-scroll">
      <div className="flex h-screen w-full snap-start flex-col items-center justify-center px-5">
        <div className="grid content-start justify-items-center gap-6 text-center">
          <span className="after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
            Mouse follow simple
          </span>
        </div>
        <SimpleMouseFollow />
      </div>
      <div className="flex h-screen w-full snap-start flex-col items-center justify-center px-5">
        <div className="grid content-start justify-items-center gap-6 text-center">
          <span className="after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
            Mouse follow with Spring
          </span>
        </div>
        <SpringMouseFollow />
      </div>
    </section>
  );
};

export { SimpleMouseFollow, Skiper61, SpringMouseFollow };
