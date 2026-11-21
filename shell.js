/* MI IA · armazón de la app: cuenta de Google, datos de Neural Brain en vivo, navegación, hojas, avisos.
   La pantalla de la IA vive en app.js (window.AICore). La memoria es la de Neural Brain (mismo proyecto de Firebase):
   Mi iA no tiene una base aparte, así nunca hay dos memorias distintas. */
'use strict';
(function () {
  const NB_URL = '../Neural-Brain-Claude/';
  const FB_CFG = {apiKey: 'AIzaSyA2DWrIlysRhhzQoBwDWGNmon7uCD6yFMM', authDomain: 'neural-brain-148a4.firebaseapp.com', projectId: 'neural-brain-148a4', storageBucket: 'neural-brain-148a4.firebasestorage.app', messagingSenderId: '150945061630', appId: '1:150945061630:web:75babe8d8b88a1b48023af'};
  const $ = s => document.querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const P = {
    brain:'<path d="M9.5 4.5A2.5 2.5 0 0 0 7 7a2.5 2.5 0 0 0-2.5 2.5c0 .9.5 1.7 1.2 2.1A2.8 2.8 0 0 0 5 13.5 2.5 2.5 0 0 0 7 16a2.5 2.5 0 0 0 2.5 3.5c1.2 0 2.5-.8 2.5-2.2V6.8c0-1.3-1.2-2.3-2.5-2.3z"/><path d="M14.5 4.5A2.5 2.5 0 0 1 17 7a2.5 2.5 0 0 1 2.5 2.5c0 .9-.5 1.7-1.2 2.1.4.5.7 1.2.7 1.9A2.5 2.5 0 0 1 17 16a2.5 2.5 0 0 1-2.5 3.5c-1.2 0-2.5-.8-2.5-2.2"/>',
    chart:'<path d="M4 19V5"/><path d="M4 19h16"/><path d="m7 14 4-4 3 3 5-6"/><path d="M15 7h4v4"/>',
    ink:'<path d="m14.5 4 5.5 5.5"/><path d="m12 6.5 5.5 5.5-7 7H5v-5.5z"/><path d="M3 21l2-2"/>',
    spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="m12 8 1.4 2.6L16 12l-2.6 1.4L12 16l-1.4-2.6L8 12l2.6-1.4z"/>',
    heart:'<path d="M20.8 6.6a5 5 0 0 0-8.8-2.4 5 5 0 0 0-8.8 2.4c0 5.4 8.8 11.4 8.8 11.4s8.8-6 8.8-11.4z"/>',
    book:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/><path d="M8 7h7"/>',
    rocket:'<path d="M5 15c-1.5 1.3-2 4-2 4s2.7-.5 4-2"/><path d="M9 12a12 12 0 0 1 11-9c0 4-2 8-9 11z"/><path d="M9 12 7 10l-3 1 3-4h5M12 15l2 2-1 3 4-3v-5"/>',
    planet:'<circle cx="12" cy="12" r="5"/><path d="M4.2 15.5C2.3 17.4 1.7 19 2.4 19.7c1.3 1.3 6.6-1.5 11.8-6.6s7.9-10.5 6.6-11.8c-.7-.7-2.3-.1-4.2 1.8"/>',
    bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
    music:'<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
    home:'<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/>',
    bot:'<rect x="4" y="8" width="16" height="12" rx="4"/><path d="M12 8V4M9 4h6"/><circle cx="9" cy="14" r="1.3"/><circle cx="15" cy="14" r="1.3"/><path d="M2 13v3M22 13v3"/>',
    plus:'<path d="M12 5v14M5 12h14"/>', back:'<path d="M15 18l-6-6 6-6"/>', x:'<path d="M18 6 6 18M6 6l12 12"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', send:'<path d="M5 12h14M13 6l6 6-6 6"/>',
    mic:'<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    star:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>', trash:'<path d="M4 7h16M10 11v6M14 11v6"/><path d="M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    wand:'<path d="m15 4 1 2 2 1-2 1-1 2-1-2-2-1 2-1z"/><path d="M3 21 14 10"/><path d="m19 13 .7 1.3L21 15l-1.3.7L19 17l-.7-1.3L17 15l1.3-.7z"/>',
    link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', chat:'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
    gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
    net:'<circle cx="12" cy="12" r="2.6"/><circle cx="4.5" cy="6" r="1.8"/><circle cx="19.5" cy="6" r="1.8"/><circle cx="6" cy="19" r="1.8"/><circle cx="18" cy="18.5" r="1.8"/><path d="M6 7l4 3.4M18 7l-4 3.4M7.3 17.6l3-3.4M16.7 17.2l-2.9-3"/>',
    learn:'<path d="M22 9 12 4 2 9l10 5 10-5z"/><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/>', down:'<path d="M12 4v12M6 10l6 6 6-6M4 20h16"/>',
    logout:'<path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10"/>', info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>', check:'<path d="m5 12 5 5 9-10"/>'
  };
  Object.assign(P, {grow: '<circle cx="12" cy="12" r="3.4"/><circle cx="12" cy="12" r="8" stroke-dasharray="2 3"/><path d="M12 1.8v2M12 20.2v2M1.8 12h2M20.2 12h2"/>', more: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>', ai: '<path d="M11 3.5c.6 3.9 2.6 5.9 6.5 6.5-3.9.6-5.9 2.6-6.5 6.5-.6-3.9-2.6-5.9-6.5-6.5 3.9-.6 5.9-2.6 6.5-6.5z"/><path d="M18.5 14.5c.3 1.9 1.2 2.8 3 3-1.8.3-2.7 1.2-3 3-.3-1.8-1.2-2.7-3-3 1.8-.2 2.7-1.1 3-3z"/>'});
  const ic = (k, sw) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw || 1.8}" stroke-linecap="round" stroke-linejoin="round">${P[k] || P.brain}</svg>`;

  const S = {user: null, ready: false, brains: [], notes: {}, events: [], evLimit: 600, conn: {novahub: true, vortex: true}, status: {}};
  let db = null, unsubs = [], noteUnsubs = {};
  const U = () => db.collection('users').doc(S.user.uid);
  const firstName = () => S.user && S.user.displayName ? S.user.displayName.split(' ')[0] : '';
  const notesOf = id => S.notes[id] || [];
  const eventsOf = b => b && window.BrainLearn ? BrainLearn.brainEvents(b, S.events) : [];
  const saveBrain = (id, patch) => U().collection('brains').doc(id).set(Object.assign({}, patch, {owner: firstName()}), {merge: true});
  const loadScript = src => new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = () => rej(new Error('No cargó ' + src)); document.head.appendChild(s); });

  function toast(t) { const el = $('#toast'); el.textContent = t; el.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('on'), 2600); }
  function ago(ms) {
    if (!ms) return 'nunca'; const s = (Date.now() - ms) / 1000;
    if (s < 60) return 'hace un momento'; if (s < 3600) return `hace ${Math.round(s / 60)} min`; if (s < 86400) return `hace ${Math.round(s / 3600)} h`;
    const d = Math.round(s / 86400); return d === 1 ? 'ayer' : d < 30 ? `hace ${d} días` : new Date(ms).toLocaleDateString('es-MX', {day: 'numeric', month: 'short'});
  }
  function md(t) {
    const lines = esc(t).split('\n'), out = []; let ul = false;
    const inl = s => s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code>$1</code>').replace(/(^|\s)\*(\S[^*]*?)\*(?=\s|$|[.,;:])/g, '$1<em>$2</em>');
    for (const raw of lines) {
      const l = raw.trim();
      if (/^[-*•]\s+/.test(l)) { if (!ul) { out.push('<ul>'); ul = true; } out.push('<li>' + inl(l.replace(/^[-*•]\s+/, '')) + '</li>'); continue; }
      if (/^\d+[.)]\s+/.test(l)) { if (!ul) { out.push('<ul>'); ul = true; } out.push('<li>' + inl(l.replace(/^\d+[.)]\s+/, '')) + '</li>'); continue; }
      if (ul) { out.push('</ul>'); ul = false; }
      if (/^#{1,4}\s+/.test(l)) out.push('<h3>' + inl(l.replace(/^#{1,4}\s+/, '')) + '</h3>');
      else if (l) out.push('<p>' + inl(l) + '</p>');
    }
    if (ul) out.push('</ul>'); return '<div class="md">' + out.join('') + '</div>';
  }
  function openSheet(html) { $('#sheet').innerHTML = '<div class="grab"></div>' + html; $('#back').classList.add('on'); $('#sheet').classList.add('on'); setTimeout(() => { const t = $('#sheet textarea, #sheet input'); if (t && innerWidth > 720) t.focus(); }, 300); }
  function closeSheet() { $('#back').classList.remove('on'); $('#sheet').classList.remove('on'); stopMic(); }

  /* ───────── Dictado por voz ───────── */
  let rec = null;
  function stopMic() { if (rec) { try { rec.stop(); } catch {} rec = null; } document.querySelectorAll('.rec').forEach(x => x.classList.remove('rec')); }
  function mic(btn) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition; if (!SR) { toast('Tu navegador no permite dictar'); return; }
    if (rec) { stopMic(); return; }
    const el = $('#' + btn.dataset.target); if (!el) return; const base = el.value ? el.value.replace(/\s*$/, ' ') : '';
    rec = new SR(); rec.lang = 'es-MX'; rec.continuous = true; rec.interimResults = true; btn.classList.add('rec');
    const VL = window.VozLimpia; let said = ''; // une el dictado sin duplicar lo que Android repite y al final quita muletillas y repeticiones
    rec.onresult = e => { said = VL ? VL.fromResults(e.results) : Array.from(e.results).map(r => r[0].transcript).join(''); el.value = base + said; el.dispatchEvent(new Event('input', {bubbles: true})); };
    rec.onend = () => { if (VL && said) { el.value = base + (VL.clean(said) || said); el.dispatchEvent(new Event('input', {bubbles: true})); } stopMic(); }; rec.onerror = () => stopMic(); rec.start();
  }

  /* ───────── Firebase ───────── */
  async function boot() {
    try {
      const B = 'https://www.gstatic.com/firebasejs/10.12.2/';
      await loadScript(B + 'firebase-app-compat.js');
      await Promise.all([loadScript(B + 'firebase-auth-compat.js'), loadScript(B + 'firebase-firestore-compat.js')]);
      firebase.initializeApp(FB_CFG); db = firebase.firestore();
      try { await db.enablePersistence({synchronizeTabs: true}); } catch {}
      firebase.auth().onAuthStateChanged(u => { S.user = u; S.ready = true; detach(); if (u) attach(); render(); dispatchEvent(new Event('mi-auth')); });
    } catch (e) { S.ready = true; $('#main').innerHTML = `<div class="empty"><b>No pude conectar</b>Revisa tu internet y vuelve a abrir Mi iA.<br><small>${esc(e.message)}</small></div>`; }
  }
  function detach() { unsubs.forEach(f => { try { f(); } catch {} }); unsubs = []; Object.values(noteUnsubs).forEach(f => { try { f(); } catch {} }); noteUnsubs = {}; S.brains = []; S.notes = {}; S.events = []; S.status = {}; }
  let rT = 0; const soft = () => { clearTimeout(rT); rT = setTimeout(() => { if (window.AICore) AICore.paint(); }, 120); };
  function attach() {
    U().set({email: S.user.email || '', name: S.user.displayName || '', seenAt: Date.now()}, {merge: true}).catch(() => {});
    unsubs.push(U().collection('brains').onSnapshot(snap => {
      S.brains = snap.docs.filter(d => d.id !== '_core').map(d => Object.assign({id: d.id, sources: []}, d.data())).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
      for (const b of S.brains) if (!noteUnsubs[b.id]) noteUnsubs[b.id] = U().collection('brains').doc(b.id).collection('notes').onSnapshot(s => { S.notes[b.id] = s.docs.map(d => Object.assign({id: d.id}, d.data())); soft(); }, () => {});
      soft(); sideInfo();
    }, e => console.warn(e)));
    unsubs.push(U().collection('events').orderBy('at', 'desc').limit(S.evLimit).onSnapshot(s => { S.events = s.docs.map(d => Object.assign({id: d.id}, d.data())); soft(); }, () => {}));
    unsubs.push(U().collection('settings').doc('connections').onSnapshot(s => { S.conn = Object.assign({novahub: true, vortex: true}, s.data() || {}); soft(); }, () => {}));
    unsubs.push(U().collection('settings').doc('status').onSnapshot(s => { S.status = s.data() || {}; soft(); sideInfo(); }, () => {}));
  }

  /* ───────── Pantallas ───────── */
  const NAV = [['chat', 'Chat', 'chat'], ['grow', 'Crecimiento', 'grow'], ['watch', 'Vigilancias', 'target'], ['bots', 'Bots', 'bot'], ['mem', 'Memoria', 'brain'], ['conn', 'Conexiones', 'link'], ['guide', 'Guía', 'book']];
  const DOCK = [['chat', 'Chat', 'chat'], ['grow', 'Crecer', 'grow'], ['watch', 'Vigila', 'target'], ['bots', 'Bots', 'bot'], ['more', 'Más', 'more']];
  function render() {
    const m = $('#main'), side = $('#side'), dock = $('#dock'); if (!S.ready) return;
    if (!S.user) { dock.hidden = true; side.innerHTML = ''; m.innerHTML = welcome(); document.body.classList.remove('in'); return; }
    document.body.classList.add('in'); dock.hidden = false;
    dock.innerHTML = DOCK.map(([k, t, i]) => `<button data-nav="${k}">${ic(i)}<span>${t}</span></button>`).join('');
    side.innerHTML = `<div class="side-brand"><img src="icons/icon-192.png" alt="" width="42" height="42" class="brandimg"><div><b>Mi iA</b><small>Tu IA personal</small></div></div>
      ${NAV.map(([k, t, i]) => `<button class="side-nav" data-nav="${k}">${ic(i)}${t}</button>`).join('')}
      <div class="side-sep">Conversaciones</div><div class="ai-chatlist side-chats"></div>
      <div class="side-foot"><button class="side-nav" data-mi="nb">${ic('brain')}Abrir Neural Brain</button><div class="side-user" id="sideUser"></div></div>`;
    m.innerHTML = '<div id="aiRoot" class="view"></div>';
    sideInfo();
    if (window.AICore) { AICore.attach(); AICore.setTab(start()); }
  }
  function start() { try { const q = new URLSearchParams(location.search), t = q.get('tab'); if (q.get('new')) { localStorage.removeItem('nb_ai_chat'); return 'chat'; } if (t) return t; } catch {} return localStorage.getItem('nb_ai_tab') || 'chat'; }
  function sideInfo() { const el = $('#sideUser'); if (!el || !S.user) return; el.innerHTML = `<img src="${esc(S.user.photoURL || 'icons/icon-96.png?v=3')}" alt="" width="32" height="32"><span><b>${esc(S.user.displayName || 'Tu cuenta')}</b><small>${S.brains.length} cerebros · ${S.events.length} recuerdos</small></span><button class="mini" data-mi="logout" title="Salir">${ic('logout')}</button>`; }
  function nav(k) { document.querySelectorAll('[data-nav]').forEach(b => b.classList.toggle('on', b.dataset.nav === k || (b.dataset.nav === 'more' && ['mem', 'conn', 'guide'].includes(k)))); if (window.AICore) AICore.badge(); }
  function more() {
    const it = (k, i, t, d) => `<button class="set" data-ai="tab" data-k="${k}"><span class="bicon" style="width:38px;height:38px">${ic(i)}</span><span class="bd"><b>${t}</b><small>${d}</small></span></button>`;
    openSheet(`<h2>Más</h2><div class="glass list" style="margin-top:12px">${it('mem', 'brain', 'Memoria', 'Lo que sabe de ti y lo que recuerda')}${it('conn', 'link', 'Conexiones', 'Tus apps, Google, avisos y su personalidad')}${it('guide', 'book', 'Guía', 'Cómo funciona todo, hecha para ti')}
      <button class="set" data-mi="nb"><span class="bicon" style="width:38px;height:38px">${ic('net')}</span><span class="bd"><b>Abrir Neural Brain</b><small>Tus cerebros, enseñanzas y recuerdos</small></span>${ic('link')}</button>
      <button class="set" data-mi="logout"><span class="bicon" style="width:38px;height:38px">${ic('logout')}</span><span class="bd"><b>Salir</b><small>${esc(S.user.email || '')}</small></span></button></div>`);
  }
  function welcome() {
    const f = (i, t, d) => `<div class="glass"><span class="bicon">${ic(i)}</span><span><b>${t}</b>${d}</span></div>`;
    return `<div class="welcome view"><div class="wl-orb"><img src="icons/icon-512.png" alt="" width="132" height="132"></div><h1>Mi iA</h1>
      <p>Tu IA personal. Te conoce por todo lo que guarda tu Neural Brain, aprende de cada conversación y crece contigo.</p>
      <div class="steps">${f('chat', 'Platica', ' · con historial; responde con tus proyectos, tus bots y tu agenda')}${f('target', 'Vigila', ' · lo que le pidas, con informes y alertas')}${f('bot', 'Tus bots', ' · cuál mejora, cuál no y qué probar')}${f('grow', 'Crece', ' · un núcleo que se hace más grande mientras más sabe')}</div>
      <button class="gbtn" data-mi="login"><svg width="20" height="20" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>Entrar con Google</button>
      <p style="font-size:12px">Usa la misma cuenta de Neural Brain, Nova Hub y VORTEX.</p></div>`;
  }

  /* ───────── Eventos del armazón ───────── */
  document.addEventListener('click', async e => {
    const t = e.target.closest('[data-nav],[data-mi],[data-act]'); if (!t) { if (e.target.id === 'back') closeSheet(); return; }
    const d = t.dataset;
    if (d.nav) { if (d.nav === 'more') return more(); closeSheet(); if (window.AICore) AICore.setTab(d.nav); return; }
    if (d.act === 'mic') return mic(t);
    if (d.act === 'closeSheet') return closeSheet();
    if (d.mi === 'nb') return window.open(NB_URL, '_blank', 'noopener');
    if (d.mi === 'logout') { if (confirm('¿Salir de Mi iA?')) { closeSheet(); await firebase.auth().signOut(); } return; }
    if (d.mi === 'login') {
      if (window.self !== window.top) { toast('Abre Mi iA en una pestaña nueva para iniciar sesión'); return; }
      const pr = new firebase.auth.GoogleAuthProvider(); pr.setCustomParameters({prompt: 'select_account'});
      try { await firebase.auth().signInWithPopup(pr); }
      catch (er) { const c = er && er.code; toast(c === 'auth/popup-blocked' ? 'El navegador bloqueó la ventana: permite ventanas emergentes' : c === 'auth/popup-closed-by-user' || c === 'auth/cancelled-popup-request' ? 'Inicio de sesión cancelado' : c === 'auth/unauthorized-domain' ? 'Este dominio no está autorizado en Firebase' : 'No se pudo iniciar sesión (' + (c || 'error') + ')'); }
    }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && $('#sheet').classList.contains('on')) closeSheet(); });

  /* ───────── Red neuronal de fondo ───────── */
  (function net() {
    const c = $('#net'), x = c.getContext('2d'); let W, H, pts = [], raf = 0, last = 0;
    function size() { const d = Math.min(2, devicePixelRatio || 1); W = innerWidth; H = innerHeight; c.width = W * d; c.height = H * d; x.setTransform(d, 0, 0, d, 0, 0); const n = Math.round(Math.min(48, W * H / 28000)); pts = Array.from({length: n}, () => ({x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .16, vy: (Math.random() - .5) * .16})); }
    function frame(t) {
      raf = requestAnimationFrame(frame); if (t - last < 33) return; last = t; x.clearRect(0, 0, W, H);
      for (const p of pts) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; }
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) { const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y); if (d < 150) { x.strokeStyle = `rgba(150,130,255,${(1 - d / 150) * .14})`; x.lineWidth = 1; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke(); } }
      x.fillStyle = 'rgba(190,175,255,.5)'; for (const p of pts) { x.beginPath(); x.arc(p.x, p.y, 1.3, 0, 7); x.fill(); }
    }
    size(); addEventListener('resize', size);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) { raf = requestAnimationFrame(frame); document.addEventListener('visibilitychange', () => { if (document.hidden) cancelAnimationFrame(raf); else raf = requestAnimationFrame(frame); }); }
  })();

  window.MI = {NB_URL, nav, core: () => ({db: () => db, U, S, L: window.BrainLearn, ic, md, toast, ago, firstName, openSheet, closeSheet, saveBrain, notesOf, eventsOf, go() {}, render: () => window.AICore && AICore.paint()})};
  if ('serviceWorker' in navigator) addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  boot();
})();
