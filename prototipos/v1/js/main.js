/* Somark Mídia: protótipo 1
   Tudo aqui é melhoria: sem JavaScript a página continua inteira e legível. */
(() => {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

  /* ---------- Entradas por rolagem (uma vez) ---------- */
  const reveals = $$('[data-reveal]');
  if (!('IntersectionObserver' in window) || reduce) {
    reveals.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- Hero: cena presa. O palco fica, o quadro troca. ---------- */
  const hero = $('[data-hero]');
  if (hero && !reduce) {
    const stage = $('.hero__stage', hero);
    const frames = $$('[data-reel] li', hero);
    const stepBox = $('[data-hero-step]', hero);
    const stepText = $('[data-hero-step-text]', hero);
    const labels = [
      'Role para ver o que somamos',
      'Gestão de redes',
      '+ Estratégia',
      '+ Criação de conteúdo',
      '+ Filmagens e fotos'
    ];
    const N = labels.length;
    let current = -1;
    let ticking = false;

    const apply = (idx) => {
      if (idx === current) return;
      current = idx;
      frames.forEach((li, k) => li.classList.toggle('is-on', k <= idx));
      stepBox.classList.add('is-swap');
      window.setTimeout(() => {
        stepText.textContent = labels[idx];
        stepBox.classList.remove('is-swap');
      }, 200);
    };

    const update = () => {
      ticking = false;
      const barH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--bar-h')) || 64;
      const rect = hero.getBoundingClientRect();
      const total = hero.offsetHeight - stage.offsetHeight;
      if (total <= 0) return;
      const p = clamp((barH - rect.top) / total, 0, 1);
      apply(Math.min(N - 1, Math.floor(p * N)));
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  /* ---------- Números que contam até o valor, uma vez ---------- */
  const figs = $$('[data-count]');
  if (figs.length && 'IntersectionObserver' in window && !reduce) {
    const easeOut = (t) => 1 - Math.pow(1 - t, 4);
    const run = (el) => {
      const to = Number(el.dataset.count);
      const t0 = performance.now();
      const dur = 1400;
      const tick = (now) => {
        const t = clamp((now - t0) / dur, 0, 1);
        el.textContent = '+' + Math.round(to * easeOut(t)) + '%';
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const fio = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { run(e.target); fio.unobserve(e.target); }
    }, { threshold: 0.6 });
    figs.forEach((el) => fio.observe(el));
  }

  /* ---------- Portfólio: vídeo que toca dentro do próprio site ---------- */
  const clips = $$('[data-clip]');
  let playing = null;

  const setIcon = (clip, label) => {
    const t = $('.clip__toggle', clip);
    if (t) t.setAttribute('aria-label', label);
  };

  const stop = (clip, reset) => {
    const v = $('video', clip);
    v.pause();
    clip.classList.remove('is-playing', 'is-paused');
    $('.clip__ui', clip).hidden = true;
    if (reset) { v.currentTime = 0; $('.clip__bar', clip).style.setProperty('--p', 0); }
    setIcon(clip, 'Assistir: ' + (v.getAttribute('aria-label') || '').replace(/^Vídeo:\s*/, ''));
    if (playing === clip) playing = null;
  };

  clips.forEach((clip) => {
    const v = $('video', clip);
    const toggle = $('.clip__toggle', clip);
    const ui = $('.clip__ui', clip);
    const mute = $('.clip__mute', clip);
    const bar = $('.clip__bar', clip);
    const name = (v.getAttribute('aria-label') || '').replace(/^Vídeo:\s*/, '');

    const load = () => {
      if (v.getAttribute('src')) return;
      v.src = v.dataset.src;           // só baixa o arquivo quando alguém pede
      v.preload = 'auto';
    };

    const play = async () => {
      if (playing && playing !== clip) stop(playing, false);
      load();
      v.muted = false;
      try {
        await v.play();
      } catch (err) {
        v.muted = true;                // alguns navegadores só liberam sem som
        try { await v.play(); } catch (e2) { return; }
      }
      playing = clip;
      clip.classList.add('is-playing');
      clip.classList.remove('is-paused');
      ui.hidden = false;
      mute.setAttribute('aria-pressed', String(v.muted));
      mute.setAttribute('aria-label', v.muted ? 'Ativar som' : 'Desativar som');
      setIcon(clip, 'Pausar: ' + name);
    };

    toggle.addEventListener('click', () => {
      if (!clip.classList.contains('is-playing')) { play(); return; }
      if (v.paused) { v.play(); clip.classList.remove('is-paused'); setIcon(clip, 'Pausar: ' + name); }
      else { v.pause(); clip.classList.add('is-paused'); setIcon(clip, 'Continuar: ' + name); }
    });

    mute.addEventListener('click', () => {
      v.muted = !v.muted;
      mute.setAttribute('aria-pressed', String(v.muted));
      mute.setAttribute('aria-label', v.muted ? 'Ativar som' : 'Desativar som');
    });

    v.addEventListener('timeupdate', () => {
      if (v.duration) bar.style.setProperty('--p', (v.currentTime / v.duration).toFixed(4));
    });
    v.addEventListener('ended', () => stop(clip, true));
  });

  // Pausa o que sai da tela e o que fica em segundo plano
  if (clips.length && 'IntersectionObserver' in window) {
    const vio = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting && playing === e.target) stop(e.target, false);
      }
    }, { threshold: 0.2 });
    clips.forEach((c) => vio.observe(c));
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden && playing) stop(playing, false); });

  /* ---------- Planos: escolher um mostra a conta (cada plano soma ao anterior) ---------- */
  const pricing = $('[data-pricing]');
  if (pricing) {
    const tiers = $$('.tier', pricing);
    const sentence = $('[data-sum]', pricing);
    const cta = $('[data-pricing-cta]', pricing);

    const select = (tier, silent) => {
      tiers.forEach((t) => {
        const on = t === tier;
        t.classList.toggle('is-selected', on);
        const btn = $('.tier__pick', t);
        btn.setAttribute('aria-pressed', String(on));
        btn.textContent = on ? 'Escolhido: ' + t.dataset.plan : 'Escolher o ' + t.dataset.plan;
      });
      const apply = () => {
        sentence.textContent = tier.dataset.note;
        cta.textContent = 'Falar sobre o plano ' + tier.dataset.plan;
        cta.href = 'https://wa.me/5519998406369?text=' + encodeURIComponent('Olá! Tenho interesse no plano ' + tier.dataset.plan + ' da Somark. Pode me passar mais detalhes?');
        sentence.classList.remove('is-swap');
      };
      if (silent || reduce) apply();
      else { sentence.classList.add('is-swap'); window.setTimeout(apply, 220); }
    };

    tiers.forEach((tier) => {
      $('.tier__pick', tier).addEventListener('click', () => select(tier));
    });
    const initial = tiers.find((t) => t.classList.contains('is-selected')) || $('.tier--pro', pricing);
    if (initial) select(initial, true);
  }

  /* ---------- Rodapé: o nome ocupa exatamente a largura do conteúdo ---------- */
  const mark = $('.foot__mark');
  if (mark) {
    const fit = () => {
      const cs = getComputedStyle(mark);
      const avail = mark.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      mark.style.fontSize = '100px';
      const probe = document.createElement('span');
      probe.textContent = mark.textContent;
      probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font:inherit;letter-spacing:inherit;';
      mark.appendChild(probe);
      const w = probe.getBoundingClientRect().width;
      mark.removeChild(probe);
      if (w > 0) mark.style.fontSize = (97.5 * avail / w).toFixed(2) + 'px';
    };
    fit();
    window.addEventListener('resize', fit);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  }

  /* ---------- Marcas: um nome aceso por vez ---------- */
  const names = $('[data-names]');
  if (names && !reduce) {
    const spans = $$('span', names);
    let i = -1;
    const next = () => {
      if (document.hidden) return;
      if (i >= 0) spans[i].classList.remove('is-lit');
      i = (i + 1) % spans.length;
      spans[i].classList.add('is-lit');
    };
    next();
    window.setInterval(next, 2000);
  }

  /* ---------- Teste de tipografia: abra com ?tipografia ---------- */
  if (new URLSearchParams(location.search).has('tipografia')) {
    const root = document.documentElement;
    const sources = {
      b: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&display=swap',
      c: 'https://api.fontshare.com/v2/css?f[]=general-sans@400,500,700&display=swap'
    };
    const loaded = {};
    const use = (key) => {
      if (sources[key] && !loaded[key]) {
        const l = document.createElement('link');
        l.rel = 'stylesheet'; l.href = sources[key];
        document.head.appendChild(l);
        loaded[key] = true;
      }
      root.dataset.type = key;
      $$('.typebar button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.key === key)));
      window.setTimeout(() => window.dispatchEvent(new Event('resize')), 700); // reajusta o nome do rodapé à nova fonte
    };
    const bar = document.createElement('div');
    bar.className = 'typebar';
    bar.setAttribute('role', 'group');
    bar.setAttribute('aria-label', 'Teste de tipografia');
    bar.innerHTML = '<span>Tipografia:</span>' +
      '<button type="button" data-key="a" aria-pressed="true">A · Montserrat</button>' +
      '<button type="button" data-key="b" aria-pressed="false">B · Fraunces + Montserrat</button>' +
      '<button type="button" data-key="c" aria-pressed="false">C · General Sans</button>';
    document.body.appendChild(bar);
    bar.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) use(b.dataset.key); });
    const start = new URLSearchParams(location.search).get('tipografia');
    if (['a', 'b', 'c'].includes(start)) use(start);
  }
})();
