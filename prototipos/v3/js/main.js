/* Somark Mídia: protótipo 3
   Tudo aqui é melhoria: sem JavaScript a página continua inteira e legível. */
(() => {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const WA = 'https://wa.me/5519997788840';

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
     O <video> tem preload="none": nada é baixado até a primeira interação. Até o
     primeiro quadro chegar fica à vista o poster (um <img> lazy); .is-live troca os dois.
     Um vídeo por vez: começar um pausa o anterior. */
  const clips = $$('[data-clip]');
  const players = clips.map((clip) => {
    const video = $('video', clip);
    const hit = $('.clip__hit', clip);
    const stop = (reset) => {
      video.pause();
      hit.setAttribute('aria-pressed', 'false');
      if (reset) { video.currentTime = 0; clip.classList.remove('is-live'); }
    };
    const play = () => {
      players.forEach((p) => { if (p.video !== video && !p.video.paused) p.stop(canHover); });
      video.muted = true;
      const p = video.play(); if (p) p.catch(() => {});
      hit.setAttribute('aria-pressed', 'true');
    };
    video.addEventListener('playing', () => clip.classList.add('is-live'));

    if (canHover) {
      clip.addEventListener('mouseenter', play);
      clip.addEventListener('mouseleave', () => stop(true));
      hit.addEventListener('focus', play);
      hit.addEventListener('blur', () => stop(true));
    }
    hit.addEventListener('click', () => (video.paused ? play() : stop(false)));
    return { clip, video, stop };
  });
  // pausa o que sair da tela
  if ('IntersectionObserver' in window) {
    const vio = new IntersectionObserver((entries) => {
      for (const e of entries) if (!e.isIntersecting) players.find((p) => p.clip === e.target)?.stop(false);
    }, { threshold: 0.1 });
    clips.forEach((c) => vio.observe(c));
  }

  /* ---------- Portfólio: setas da fila (o CSS só as mostra com mouse; no celular o dedo desliza) ----------
     Cada clique anda uma "página" de vídeos inteiros; o encaixe (scroll-snap) ajeita a parada.
     aria-disabled em vez de disabled: o foco não se perde quando a seta chega ao fim. */
  const reels = $('.reels');
  const reelBtns = $$('[data-reels]');
  if (reels && reelBtns.length) {
    const first = $('li', reels);
    const prev = $('[data-reels="prev"]');
    const next = $('[data-reels="next"]');
    const sync = () => {
      const max = reels.scrollWidth - reels.clientWidth;
      prev.setAttribute('aria-disabled', String(reels.scrollLeft <= 1));
      next.setAttribute('aria-disabled', String(reels.scrollLeft >= max - 1));
    };
    reelBtns.forEach((btn) => btn.addEventListener('click', () => {
      if (btn.getAttribute('aria-disabled') === 'true') return;
      const step = first.offsetWidth + parseFloat(getComputedStyle(reels).columnGap || 8);
      const page = Math.max(1, Math.floor(reels.clientWidth / step));
      reels.scrollBy({ left: (btn === next ? 1 : -1) * page * step, behavior: reduce ? 'auto' : 'smooth' });
    }));
    reels.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
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

  /* ---------- Esteiras: um botão para as duas (WCAG 2.2.2). O CSS só o mostra com movimento permitido.
     O botão é só o ícone: o nome acessível fica no aria-label e a dica no title. ---------- */
  const proof = $('.proof');
  const beltToggle = $('[data-belt-toggle]');
  if (proof && beltToggle && !reduce) {
    const icon = $('i', beltToggle);
    beltToggle.addEventListener('click', () => {
      const paused = proof.classList.toggle('is-paused');
      icon.className = paused ? 'ph ph-play' : 'ph ph-pause';
      beltToggle.title = paused ? 'Retomar' : 'Pausar';
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
