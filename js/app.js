/* =========================================================
   Portfolio — logique du site
   Navigation, langue, thème, menu et affichage des pages.
   Pour modifier le contenu, éditez plutôt data/site.js et data/projects.js.
   ========================================================= */
(() => {
  'use strict';

  const SITE = window.SITE || { profile: {}, cv: {} };
  const PROJECTS = (window.PROJECTS || []).filter(p => p && p.slug && !p.hidden);
  const UI = window.I18N || {};

  const YEAR_ORDER = ['y1', 'y2', 'y3', 'y4', 'internship', 'personal', 'jam'];
  const TEAM_ORDER = ['solo', 'small', 'large'];

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* stockage indisponible */ } }
  };
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- Icônes ---------- */
  const ICONS = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    arrowLeft: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    arrowRight: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-7M12 13a3 3 0 0 1 6 0v4"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    play: '<path d="M7 4v16l13-8z"/>',
    video: '<rect x="2" y="5" width="14" height="14" rx="2"/><path d="m16 10 6-3v10l-6-3"/>',
    code: '<path d="m8 6-6 6 6 6M16 6l6 6-6 6"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5"/>',
    chip: '<rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
    cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'
  };
  const icon = name =>
    `<svg class="svg-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name] || ''}</svg>`;

  /* ---------- Langue ---------- */
  function detectLang() {
    const list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    return String(list[0]).toLowerCase().startsWith('fr') ? 'fr' : 'en';
  }
  const savedLang = store.get('lang');
  let lang = savedLang === 'fr' || savedLang === 'en' ? savedLang : detectLang();

  function t(key, vars) {
    let s = (UI[lang] && UI[lang][key]) ?? (UI.fr && UI.fr[key]) ?? key;
    if (vars) s = s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? ''));
    return s;
  }
  // Renvoie le texte dans la langue courante ({ fr, en } ou texte simple)
  function L(v) {
    if (v == null) return '';
    if (typeof v !== 'object' || Array.isArray(v)) return v;
    return v[lang] ?? v.fr ?? v.en ?? '';
  }
  const plural = (base, n) => t(base + ((n === 1 || (lang === 'fr' && n === 0)) ? '.one' : '.other'), { n });
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const paragraphs = text => String(text || '').split(/\n\s*\n/).map(s => s.trim()).filter(Boolean).map(s => `<p>${esc(s)}</p>`).join('');
  const asList = v => (Array.isArray(L(v)) ? L(v) : (L(v) ? [L(v)] : []));

  /* ---------- Tags ---------- */
  const teamBucket = n => { n = Number(n) || 1; return n <= 1 ? 'solo' : n <= 4 ? 'small' : 'large'; };
  const teamSizeLabel = n => { n = Number(n) || 1; return n <= 1 ? t('team.solo') : t('team.people', { n }); };
  const valueOf = (p, key) => (key === 'team' ? teamBucket(p.teamSize) : p[key]);

  function tagsHTML(p, extraClass = '') {
    const out = [];
    if (p.example) out.push(`<span class="tag tag-example">${esc(t('tag.example'))}</span>`);
    if (p.year) out.push(`<span class="tag">${icon('cap')}${esc(t('year.' + p.year))}</span>`);
    if (p.engine) out.push(`<span class="tag">${icon('chip')}${esc(p.engine)}</span>`);
    if (p.teamSize) out.push(`<span class="tag">${icon('users')}${esc(teamSizeLabel(p.teamSize))}</span>`);
    return `<div class="tags ${extraClass}">${out.join('')}</div>`;
  }

  function cardHTML(p) {
    const img = p.thumbnail || p.banner;
    const first = String(L(p.pitch) || '').split(/\n\s*\n/)[0];
    return `
      <a class="card" href="#/projects/${encodeURIComponent(p.slug)}" data-slug="${esc(p.slug)}">
        <div class="card-media">${img ? `<img src="${esc(img)}" alt="" loading="lazy">` : ''}</div>
        <div class="card-body">
          <h3 class="card-title">${esc(L(p.title))}</h3>
          ${first ? `<p class="card-pitch">${esc(first)}</p>` : ''}
          ${tagsHTML(p)}
        </div>
      </a>`;
  }

  const view = $('#view');
  const setTitle = page => {
    document.title = page ? `${page} · ${SITE.profile.name}` : `${SITE.profile.name} — ${L(SITE.profile.title)}`;
  };

  /* =========================================================
     Pages
     ========================================================= */

  /* ---------- Accueil ---------- */
  function renderHome() {
    const p = SITE.profile;
    setTitle(null);
    const recent = PROJECTS.slice(0, 3);
    view.innerHTML = `
      <div class="container">
        <section class="hero">
          <img class="hero-photo" src="${esc(p.photo)}" alt="${esc(t('home.photoAlt'))}">
          <div class="hero-text">
            ${p.status ? `<span class="status"><span class="status-dot"></span>${esc(L(p.status))}</span>` : ''}
            <h1>${esc(p.name)}</h1>
            <p class="hero-role">${esc(L(p.title))}</p>
            <p class="hero-tagline">${esc(L(p.tagline))}</p>
            <p class="hero-intro">${esc(L(p.intro))}</p>
            <div class="tags">${(p.highlights || []).map(h => `<span class="tag">${esc(h)}</span>`).join('')}</div>
          </div>
        </section>

        <div class="section-head"><h2 class="section-title">${esc(t('home.quick'))}</h2></div>
        <div class="quick-grid">
          <a class="quick-card" href="#/projects">
            <span class="quick-icon">${icon('grid')}</span>
            <span><strong>${esc(t('nav.projects'))}</strong><span class="desc">${esc(t('home.projectsDesc'))}</span></span>
          </a>
          <a class="quick-card" href="#/cv">
            <span class="quick-icon">${icon('file')}</span>
            <span><strong>${esc(t('nav.cv'))}</strong><span class="desc">${esc(t('home.cvDesc'))}</span></span>
          </a>
          ${p.email ? `
          <a class="quick-card" href="mailto:${esc(p.email)}">
            <span class="quick-icon">${icon('mail')}</span>
            <span><strong>${esc(t('home.contact'))}</strong><span class="desc">${esc(t('home.contactDesc'))}</span></span>
          </a>` : ''}
        </div>

        ${recent.length ? `
        <div class="section-head">
          <h2 class="section-title">${esc(t('home.recent'))}</h2>
          <a href="#/projects">${esc(t('home.allProjects'))} →</a>
        </div>
        <div class="grid">${recent.map(cardHTML).join('')}</div>` : ''}
      </div>`;
  }

  /* ---------- Projets (mosaïque + filtres) ---------- */
  function renderProjects(params) {
    setTitle(t('nav.projects'));
    const toSet = v => new Set((v || '').split(',').map(s => s.trim()).filter(Boolean));
    const state = { year: toSet(params.get('year')), engine: toSet(params.get('engine')), team: toSet(params.get('team')) };

    const engines = [...new Set(PROJECTS.map(p => p.engine).filter(Boolean))].sort((a, b) => a.localeCompare(b));
    const groups = [
      { key: 'year', icon: 'cap', label: t('filters.year'),
        options: YEAR_ORDER.filter(k => PROJECTS.some(p => p.year === k)).map(k => ({ value: k, label: t('year.' + k) })) },
      { key: 'engine', icon: 'chip', label: t('filters.engine'),
        options: engines.map(e => ({ value: e, label: e })) },
      { key: 'team', icon: 'users', label: t('filters.team'),
        options: TEAM_ORDER.filter(k => PROJECTS.some(p => teamBucket(p.teamSize) === k)).map(k => ({ value: k, label: t('team.' + k) })) }
    ].filter(g => g.options.length);

    // ET entre catégories, OU à l'intérieur d'une catégorie
    const matches = (p, skipKey) =>
      groups.every(g => g.key === skipKey || state[g.key].size === 0 || state[g.key].has(valueOf(p, g.key)));

    view.innerHTML = `
      <div class="container">
        <header class="page-head">
          <h1>${esc(t('nav.projects'))}</h1>
          <p class="muted">${esc(t('projects.subtitle'))}</p>
        </header>
        <section class="filters" id="filters" aria-label="${esc(t('filters.label'))}"></section>
        <div class="results-bar">
          <span id="count" aria-live="polite"></span>
          <button type="button" class="link-btn" id="reset" hidden>${esc(t('filters.reset'))}</button>
        </div>
        <div id="results"></div>
      </div>`;

    const filtersEl = $('#filters');
    const countEl = $('#count');
    const resetEl = $('#reset');
    const resultsEl = $('#results');

    // Toutes les cartes sont créées une seule fois ; les filtres les masquent / affichent
    resultsEl.innerHTML = `
      <div class="grid" id="grid">${PROJECTS.map(cardHTML).join('')}</div>
      <div class="empty" id="empty" hidden><p>${esc(t('projects.empty'))}</p>
        <button type="button" class="btn" data-reset>${esc(t('filters.reset'))}</button></div>`;
    const gridEl = $('#grid', resultsEl);
    const emptyEl = $('#empty', resultsEl);
    const cards = $$('.card', gridEl);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Animation "FLIP" : les cartes glissent vers leur nouvelle place,
    // celles qui disparaissent s'estompent, celles qui arrivent apparaissent.
    function applyVisibility(visible, animate) {
      const canAnimate = animate && !reduceMotion.matches && typeof Element.prototype.animate === 'function';
      $$('.card-ghost', gridEl).forEach(g => g.remove()); // clics rapides : on nettoie
      const first = new Map();
      if (canAnimate) cards.forEach(c => { if (!c.hidden) first.set(c, c.getBoundingClientRect()); });

      const leaving = cards.filter(c => !c.hidden && !visible.has(c.dataset.slug));
      const entering = cards.filter(c => c.hidden && visible.has(c.dataset.slug));
      cards.forEach(c => { c.hidden = !visible.has(c.dataset.slug); });
      if (!canAnimate) return;

      const ease = 'cubic-bezier(0.2, 0.8, 0.2, 1)';
      const gridRect = gridEl.getBoundingClientRect();

      // Cartes qui restent : glissement de l'ancienne à la nouvelle position
      first.forEach((from, c) => {
        if (c.hidden) return;
        const to = c.getBoundingClientRect();
        const dx = from.left - to.left;
        const dy = from.top - to.top;
        if (dx || dy) {
          c.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: 450, easing: ease });
        }
      });

      // Cartes qui partent : un "fantôme" s'estompe à l'ancienne place
      leaving.forEach(c => {
        const from = first.get(c);
        const ghost = c.cloneNode(true);
        ghost.hidden = false;
        ghost.removeAttribute('href');
        ghost.setAttribute('aria-hidden', 'true');
        ghost.classList.add('card-ghost');
        Object.assign(ghost.style, {
          left: `${from.left - gridRect.left}px`, top: `${from.top - gridRect.top}px`,
          width: `${from.width}px`, height: `${from.height}px`
        });
        gridEl.appendChild(ghost);
        ghost.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(0.9)' }],
          { duration: 250, easing: 'ease-in', fill: 'forwards' }).onfinish = () => ghost.remove();
        setTimeout(() => ghost.remove(), 400); // sécurité si l'animation est suspendue
      });

      // Cartes qui arrivent : apparition en douceur
      entering.forEach((c, k) => {
        c.animate([{ opacity: 0, transform: 'scale(0.9)' }, { opacity: 1, transform: 'none' }],
          { duration: 350, delay: 120 + k * 40, easing: ease, fill: 'backwards' });
      });
    }

    function update(animate = true) {
      const focused = document.activeElement && document.activeElement.closest && document.activeElement.closest('.chip');
      const focusKey = focused ? focused.dataset.group + '|' + focused.dataset.value : null;

      filtersEl.innerHTML = groups.map(g => `
        <div class="filter-group" role="group" aria-label="${esc(g.label)}">
          <span class="filter-label">${icon(g.icon)}${esc(g.label)}</span>
          <div class="chips">
            ${g.options.map(o => {
              const on = state[g.key].has(o.value);
              const n = PROJECTS.filter(p => matches(p, g.key) && valueOf(p, g.key) === o.value).length;
              return `<button type="button" class="chip${on ? ' is-on' : ''}${!on && n === 0 ? ' is-empty' : ''}"
                        aria-pressed="${on}" data-group="${g.key}" data-value="${esc(o.value)}">
                        ${esc(o.label)}<span class="chip-count">${n}</span></button>`;
            }).join('')}
          </div>
        </div>`).join('');
      filtersEl.hidden = groups.length === 0;

      const list = PROJECTS.filter(p => matches(p));
      const active = Object.values(state).some(s => s.size);
      countEl.textContent = plural('projects.count', list.length);
      resetEl.hidden = !active;
      applyVisibility(new Set(list.map(p => p.slug)), animate);
      emptyEl.hidden = list.length > 0;

      // Les filtres actifs sont gardés dans l'adresse (lien partageable)
      const q = new URLSearchParams();
      Object.keys(state).forEach(k => { if (state[k].size) q.set(k, [...state[k]].join(',')); });
      const hash = '#/projects' + (q.toString() ? '?' + q.toString() : '');
      if (location.hash !== hash) history.replaceState(null, '', hash);

      if (focusKey) {
        const again = $$('.chip', filtersEl).find(c => c.dataset.group + '|' + c.dataset.value === focusKey);
        if (again) again.focus();
      }
    }

    function reset() { Object.values(state).forEach(s => s.clear()); update(); }

    filtersEl.addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      const set = state[chip.dataset.group];
      const v = chip.dataset.value;
      if (set.has(v)) set.delete(v); else set.add(v);
      update();
    });
    resetEl.addEventListener('click', reset);
    resultsEl.addEventListener('click', e => { if (e.target.closest('[data-reset]')) reset(); });

    update(false);
  }

  /* ---------- Page d'un projet ---------- */
  const isVideoFile = src => /\.(mp4|webm)(\?.*)?$/i.test(src || '');
  function mediaHTML(m) {
    const alt = L(m.alt) || '';
    if (m.youtube) {
      return `<div class="gallery-item gallery-video">
        <iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(m.youtube)}" title="${esc(alt || 'YouTube')}"
          loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`;
    }
    if (isVideoFile(m.src)) {
      return `<div class="gallery-item"><video src="${esc(m.src)}" autoplay muted loop playsinline aria-label="${esc(alt)}"></video></div>`;
    }
    return `<button type="button" class="gallery-item" data-lightbox="${esc(m.src)}" data-alt="${esc(alt)}">
      <img src="${esc(m.src)}" alt="${esc(alt)}" loading="lazy"></button>`;
  }
  const LINK_ICONS = { play: 'play', download: 'download', video: 'video', source: 'code' };

  function renderProject(slug) {
    const i = PROJECTS.findIndex(p => p.slug === slug);
    if (i < 0) return renderNotFound(t('project.notFound'), t('project.notFoundText'), '#/projects', t('project.back'));
    const p = PROJECTS[i];
    const prev = PROJECTS[i - 1];
    const next = PROJECTS[i + 1];
    const title = L(p.title);
    setTitle(title);

    const role = asList(p.role);
    const media = p.media || [];
    const links = (p.links || []).filter(l => l && l.url);
    const banner = p.banner || p.thumbnail;

    view.innerHTML = `
      <article class="project">
        <header class="banner"${banner ? ` style="background-image: url('${esc(encodeURI(banner))}')"` : ''}>
          <div class="banner-inner">
            <h1>${esc(title)}</h1>
            ${tagsHTML(p, 'tags-on-image')}
          </div>
        </header>

        <div class="container container-narrow">
          <a class="back" href="#/projects">${icon('arrowLeft')}${esc(t('project.back'))}</a>

          ${L(p.pitch) ? `
          <section class="block">
            <h2>${icon('spark')}${esc(t('project.pitch'))}</h2>
            ${paragraphs(L(p.pitch))}
          </section>` : ''}

          ${role.length ? `
          <section class="block">
            <h2>${icon('target')}${esc(t('project.role'))}</h2>
            <ul class="bullet-list">${role.map(r => `<li>${esc(r)}</li>`).join('')}</ul>
          </section>` : ''}

          ${media.length ? `
          <section class="block">
            <h2>${icon('image')}${esc(t('project.media'))}</h2>
            <div class="gallery">${media.map(mediaHTML).join('')}</div>
          </section>` : ''}

          ${links.length ? `
          <section class="block">
            <h2>${icon('play')}${esc(t('project.links'))}</h2>
            <div class="links">
              ${links.map((l, k) => `
                <a class="btn${k === 0 ? ' btn-primary' : ''}" href="${esc(l.url)}" target="_blank" rel="noopener">
                  ${icon(LINK_ICONS[l.type] || 'external')}${esc(L(l.label) || l.url)}</a>`).join('')}
            </div>
          </section>` : ''}

          ${prev || next ? `
          <nav class="project-nav">
            ${prev ? `<a class="prev" href="#/projects/${encodeURIComponent(prev.slug)}">
              <small>${icon('arrowLeft')}${esc(t('project.prev'))}</small><strong>${esc(L(prev.title))}</strong></a>` : ''}
            ${next ? `<a class="next" href="#/projects/${encodeURIComponent(next.slug)}">
              <small>${esc(t('project.next'))}${icon('arrowRight')}</small><strong>${esc(L(next.title))}</strong></a>` : ''}
          </nav>` : ''}
        </div>
      </article>`;
  }

  /* ---------- CV ---------- */
  function timelineHTML(items) {
    return `<ol class="timeline">${(items || []).map(it => {
      const bullets = asList(it.bullets);
      return `<li class="tl-item">
        <span class="tl-period">${esc(L(it.period))}</span>
        <h3 class="tl-title">${esc(L(it.role))}</h3>
        <p class="tl-org">${esc(L(it.org))}</p>
        ${bullets.length ? `<ul>${bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}
      </li>`;
    }).join('')}</ol>`;
  }

  function renderCV() {
    const p = SITE.profile;
    const cv = SITE.cv || {};
    setTitle(t('nav.cv'));
    const soft = asList(cv.softSkills);
    const note = t('cv.note');

    view.innerHTML = `
      <div class="container container-narrow">
        <header class="cv-head">
          <img class="cv-photo" src="${esc(p.photo)}" alt="${esc(t('home.photoAlt'))}">
          <div>
            <h1>${esc(p.name)}</h1>
            <p class="hero-role">${esc(L(p.title))}</p>
            <ul class="cv-contacts">
              ${p.email ? `<li>${icon('mail')}<a href="mailto:${esc(p.email)}">${esc(p.email)}</a></li>` : ''}
              ${p.linkedin ? `<li>${icon('linkedin')}<a href="${esc(p.linkedin)}" target="_blank" rel="noopener">LinkedIn</a></li>` : ''}
            </ul>
          </div>
          ${cv.pdf ? `<a class="btn btn-primary" href="${esc(cv.pdf)}" download="CV-Maxime-ARNAU.pdf">${icon('download')}${esc(t('cv.download'))}</a>` : ''}
        </header>
        ${note ? `<p class="cv-note">${esc(note)}</p>` : ''}

        <section class="block">
          <h2>${icon('user')}${esc(t('cv.summary'))}</h2>
          <p>${esc(L(cv.summary))}</p>
        </section>

        <section class="block">
          <h2>${icon('code')}${esc(t('cv.skills'))}</h2>
          <div class="skills">
            ${(cv.skills || []).map(g => `
              <div class="skill-group">
                <h3>${esc(L(g.name))}</h3>
                <ul class="skill-list">
                  ${g.items.map(s => `
                    <li class="skill">
                      <span class="skill-name">${esc(s.name)}<small class="level-label">${esc(t('level.' + s.level))}</small></span>
                      <span class="level" aria-hidden="true">${[1, 2, 3, 4].map(n => `<i class="${n <= s.level ? 'on' : ''}"></i>`).join('')}</span>
                    </li>`).join('')}
                </ul>
              </div>`).join('')}
          </div>
          ${soft.length ? `
          <div class="soft-skills skill-group">
            <h3>${esc(t('cv.softSkills'))}</h3>
            <div class="tags">${soft.map(s => `<span class="tag">${esc(s)}</span>`).join('')}</div>
          </div>` : ''}
        </section>

        <section class="block">
          <h2>${icon('briefcase')}${esc(t('cv.experience'))}</h2>
          ${timelineHTML(cv.experience)}
        </section>

        <section class="block">
          <h2>${icon('cap')}${esc(t('cv.education'))}</h2>
          ${timelineHTML(cv.education)}
        </section>

        ${(cv.awards || []).length ? `
        <section class="block">
          <h2>${icon('award')}${esc(t('cv.awards'))}</h2>
          <ul class="awards">${cv.awards.map(a => `<li>${icon('award')}<span>${esc(L(a))}</span></li>`).join('')}</ul>
        </section>` : ''}
      </div>`;
  }

  /* ---------- Page introuvable ---------- */
  function renderNotFound(title = t('notFound.title'), text = t('notFound.text'), href = '#/', label = t('notFound.back')) {
    setTitle(title);
    view.innerHTML = `
      <div class="container container-narrow">
        <div class="empty">
          <h1>${esc(title)}</h1>
          <p>${esc(text)}</p>
          <a class="btn" href="${href}">${icon('arrowLeft')}${esc(label)}</a>
        </div>
      </div>`;
  }

  /* =========================================================
     Navigation (adresses du type #/projects/mon-projet)
     ========================================================= */
  function parseHash() {
    const h = location.hash.replace(/^#\/?/, '');
    const qi = h.indexOf('?');
    const path = qi >= 0 ? h.slice(0, qi) : h;
    const params = new URLSearchParams(qi >= 0 ? h.slice(qi + 1) : '');
    const parts = path.split('/').filter(Boolean).map(s => { try { return decodeURIComponent(s); } catch (e) { return s; } });
    return { parts, params };
  }

  function render() {
    const { parts, params } = parseHash();
    const section = parts[0] || 'home';
    if (section === 'home') renderHome();
    else if (section === 'projects' && parts[1]) renderProject(parts[1]);
    else if (section === 'projects') renderProjects(params);
    else if (section === 'cv') renderCV();
    else renderNotFound();

    $$('.nav-link[data-route]').forEach(a => {
      if (a.dataset.route === section) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  let firstRoute = true;
  function onRoute() {
    render();
    closeNav();
    if (!firstRoute) {
      window.scrollTo(0, 0);
      view.focus({ preventScroll: true });
    }
    firstRoute = false;
  }

  /* =========================================================
     Menu latéral
     ========================================================= */
  const layout = $('#layout');
  const sidebar = $('#sidebar');
  const scrim = $('#scrim');
  const menuBtn = $('#menu-btn');
  const collapseBtn = $('#collapse-btn');
  const mobileMq = window.matchMedia('(max-width: 860px)');

  if (store.get('sidebar') === 'collapsed') layout.classList.add('collapsed');

  function updateSidebar() {
    const collapsed = layout.classList.contains('collapsed') && !mobileMq.matches;
    const label = t(layout.classList.contains('collapsed') ? 'nav.expand' : 'nav.collapse');
    $('.label', collapseBtn).textContent = label;
    collapseBtn.setAttribute('aria-expanded', String(!layout.classList.contains('collapsed')));
    collapseBtn.title = collapsed ? label : '';
    // Infobulles quand le menu est replié
    $$('.sidebar .nav-link').forEach(a => {
      if (a === collapseBtn) return;
      const l = $('.label', a);
      a.title = collapsed && l ? l.textContent : '';
    });
    // Sur mobile, le menu fermé ne doit pas être atteignable au clavier
    const open = layout.classList.contains('nav-open');
    sidebar.inert = mobileMq.matches && !open;
    menuBtn.setAttribute('aria-expanded', String(open));
    const menuLabel = t(open ? 'nav.close' : 'nav.open');
    menuBtn.setAttribute('aria-label', menuLabel);
    menuBtn.title = menuLabel;
  }

  function openNav() { layout.classList.add('nav-open'); scrim.hidden = false; updateSidebar(); $('.nav-link', sidebar).focus(); }
  function closeNav() {
    if (!layout.classList.contains('nav-open')) return;
    layout.classList.remove('nav-open'); scrim.hidden = true; updateSidebar();
  }

  collapseBtn.addEventListener('click', () => {
    const c = layout.classList.toggle('collapsed');
    store.set('sidebar', c ? 'collapsed' : 'open');
    updateSidebar();
  });
  menuBtn.addEventListener('click', () => (layout.classList.contains('nav-open') ? closeNav() : openNav()));
  scrim.addEventListener('click', closeNav);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && layout.classList.contains('nav-open')) { closeNav(); menuBtn.focus(); } });
  mobileMq.addEventListener('change', () => { if (!mobileMq.matches) closeNav(); updateSidebar(); });

  /* =========================================================
     Thème clair / sombre
     ========================================================= */
  const root = document.documentElement;
  const themeBtn = $('#theme-btn');
  const darkMq = window.matchMedia('(prefers-color-scheme: dark)');
  const systemTheme = () => (darkMq.matches ? 'dark' : 'light');
  const currentTheme = () => root.dataset.theme || systemTheme();

  function updateThemeBtn() {
    const mode = currentTheme();
    themeBtn.dataset.mode = mode;
    const label = t(mode === 'dark' ? 'theme.toLight' : 'theme.toDark');
    themeBtn.setAttribute('aria-label', label);
    themeBtn.title = label;
  }
  themeBtn.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    // Revenir au mode du PC = de nouveau suivre automatiquement le réglage du PC
    if (next === systemTheme()) { delete root.dataset.theme; store.set('theme', ''); }
    else { root.dataset.theme = next; store.set('theme', next); }
    updateThemeBtn();
  });
  darkMq.addEventListener('change', updateThemeBtn);

  /* =========================================================
     Langue FR / EN
     ========================================================= */
  const langBtn = $('#lang-btn');
  function applyLang() {
    root.lang = lang;
    $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    $('#lang-label').textContent = lang.toUpperCase();
    langBtn.setAttribute('aria-label', t('lang.switch'));
    langBtn.title = t('lang.switch');
    sidebar.setAttribute('aria-label', t('nav.label'));
    $('#lightbox-close').setAttribute('aria-label', t('lightbox.close'));
    updateThemeBtn();
    updateSidebar();
  }
  langBtn.addEventListener('click', () => {
    lang = lang === 'fr' ? 'en' : 'fr';
    store.set('lang', lang);
    applyLang();
    render();
  });

  /* =========================================================
     Agrandissement des images
     ========================================================= */
  const lightbox = $('#lightbox');
  const lbImg = $('#lightbox-img');
  view.addEventListener('click', e => {
    const item = e.target.closest('[data-lightbox]');
    if (!item) return;
    if (typeof lightbox.showModal !== 'function') { window.open(item.dataset.lightbox, '_blank'); return; }
    lbImg.src = item.dataset.lightbox;
    lbImg.alt = item.dataset.alt || '';
    lightbox.showModal();
  });
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox || e.target.closest('#lightbox-close')) lightbox.close();
  });

  /* =========================================================
     Démarrage
     ========================================================= */
  $$('[data-icon]').forEach(el => { el.innerHTML = icon(el.dataset.icon); });

  const mailLink = $('#side-mail');
  if (SITE.profile.email) mailLink.href = 'mailto:' + SITE.profile.email; else mailLink.hidden = true;
  const liLink = $('#side-linkedin');
  if (SITE.profile.linkedin) { liLink.href = SITE.profile.linkedin; liLink.hidden = false; }
  $('#year').textContent = new Date().getFullYear();

  applyLang();
  window.addEventListener('hashchange', onRoute);
  onRoute();
})();
