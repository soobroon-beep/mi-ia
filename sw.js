/* Mi IA · service worker: abre sin internet, pero siempre busca primero la versión nueva.
   También guarda los archivos compartidos de Neural Brain (misma cuenta, mismo cerebro). */
const CACHE = 'mi-ia-v1';
const ASSETS = ['./', './index.html', './base.css', './app.css', './shell.js', './app.js', './manifest.json', './icons/icon-192.png', './icons/icon-96.png',
  '../Neural-Brain-Claude/brain-learn.js', '../Neural-Brain-Claude/ai-core-lib.js', '../Neural-Brain-Claude/graphs.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {})); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('mi-ia-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return; // Firebase, IA, Google y fuentes: directo a la red
  if (!u.pathname.includes('/mi-ia/') && !/\/Neural-Brain-Claude\/(brain-learn|ai-core-lib|graphs)\.js$/.test(u.pathname)) return;
  e.respondWith(fetch(e.request).then(r => { if (r.ok) { const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); } return r; }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html'))));
});
self.addEventListener('notificationclick', e => { e.notification.close(); e.waitUntil(self.clients.matchAll({type: 'window'}).then(ws => { for (const w of ws) if (w.url.includes('/mi-ia/')) return w.focus(); return self.clients.openWindow('./index.html?tab=watch'); })); });
