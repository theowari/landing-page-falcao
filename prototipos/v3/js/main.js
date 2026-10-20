/* Somark Mídia: protótipo 2
   Tudo aqui é melhoria: sem JavaScript a página continua inteira e legível. */
(() => {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const WA = 'https://wa.me/5519998406369';

  /* ---------- Entradas por rolagem (uma vez), em cascata dentro de cada grupo ---------- */
  const reveals = $$('[data-reveal]');
  $$('.fronts__rows, .about').forEach((group) => {
    $$('[data-reveal]', group).forEach((el, i) => el.style.setProperty('--d', i * 80 + 'ms'));
  });
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- Números que contam até o valor ---------- */
  if (!reduce && 'IntersectionObserver' in window) {
    const ease = (t) => 1 - Math.pow(1 - t, 4);
    const fio = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target, to = Number(el.dataset.count), t0 = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - t0) / 1300);
          el.textContent = '+' + Math.round(to * ease(t)) + '%';
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        fio.unobserve(el);
      }
    }, { threshold: 0.6 });
    $$('[data-count]').forEach((el) => fio.observe(el));
  }

  /* ---------- Portfólio: vídeo toca no hover (mouse) ou no toque (celular) ----------
     Para publicar um vídeo, basta preencher data-src (e data-poster) no <figure>. */
  const clips = $$('[data-clip]');
  clips.forEach((clip) => {
    const video = $('video', clip);
    const hit = $('.clip__hit', clip);
    const src = (clip.dataset.src || '').trim();
    const poster = (clip.dataset.poster || '').trim();
    if (!src) { hit.setAttribute('aria-disabled', 'true'); return; }

    clip.classList.add('has-video');
    if (poster) video.poster = poster;
    hit.setAttribute('aria-label', hit.getAttribute('aria-label').replace(', em breve', ''));
    const ensure = () => { if (!video.getAttribute('src')) { video.src = src; video.preload = 'auto'; } };
    const play = () => { ensure(); video.muted = true; const p = video.play(); if (p) p.catch(() => {}); clip.classList.add('is-playing'); };
    const stop = (reset) => { video.pause(); if (reset) video.currentTime = 0; clip.classList.remove('is-playing'); };

    if (canHover) {
      clip.addEventListener('mouseenter', play);
      clip.addEventListener('mouseleave', () => stop(true));
      hit.addEventListener('focus', play);
      hit.addEventListener('blur', () => stop(true));
    }
    hit.addEventListener('click', () => (video.paused ? play() : stop(false)));
  });
  // pausa o que sair da tela
  if ('IntersectionObserver' in window) {
    const vio = new IntersectionObserver((entries) => {
      for (const e of entries) if (!e.isIntersecting) { const v = $('video', e.target); if (v && !v.paused) v.pause(); }
    }, { threshold: 0.1 });
    clips.forEach((c) => vio.observe(c));
  }

  /* ---------- Esteiras de logos: duplica o conteúdo para o laço não ter emenda ---------- */
  $$('[data-belt]').forEach((belt) => {
    const track = $('.belt__track', belt);
    const inner = document.createElement('div');
    inner.className = 'belt__inner';
    belt.insertBefore(inner, track);
    inner.appendChild(track);
    if (!reduce) {
      const copy = track.cloneNode(true);
      copy.setAttribute('aria-hidden', 'true');
      $$('img', copy).forEach((img) => { img.alt = ''; });
      inner.appendChild(copy);
    }
  });

  /* ---------- Esteiras: um botão para as duas (WCAG 2.2.2). O CSS só o mostra com movimento permitido. ---------- */
  const proof = $('.proof');
  const beltToggle = $('[data-belt-toggle]');
  if (proof && beltToggle && !reduce) {
    const icon = $('i', beltToggle);
    const label = $('span', beltToggle);
    beltToggle.addEventListener('click', () => {
      const paused = proof.classList.toggle('is-paused');
      icon.className = paused ? 'ph ph-play' : 'ph ph-pause';
      label.textContent = paused ? 'Retomar' : 'Pausar';
      beltToggle.setAttribute('aria-label', paused ? 'Retomar o movimento das marcas' : 'Pausar o movimento das marcas');
    });
  }

  /* ---------- Método: sanfona (um painel aberto por vez) ---------- */
  const stages = $$('[data-stages] .stage');
  stages.forEach((stage) => {
    $('.stage__tab', stage).addEventListener('click', () => {
      stages.forEach((s) => {
        const open = s === stage;
        s.classList.toggle('is-open', open);
        $('.stage__tab', s).setAttribute('aria-expanded', String(open));
      });
    });
  });

  /* ---------- Contato: monta a mensagem e abre o WhatsApp ---------- */
  const form = $('[data-wa-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = form.elements.nome.value.trim();
      const pedido = form.elements.text.value.trim();
      let msg = 'Olá! Vim pelo site da Somark.';
      if (nome) msg += ' Meu nome é ' + nome + '.';
      if (pedido) msg += ' ' + pedido;
      window.open(WA + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    });
  }
})();
