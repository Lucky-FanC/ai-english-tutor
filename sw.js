/* English Around You — 简易 Service Worker：离线可用 + 更新自动生效 */
const CACHE = 'eay-v7';
const ASSETS = ['./', './index.html', './style.css', './app.js', './data.js', './data-levels.js', './manifest.json', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(r => {
        const cp = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, cp)).catch(() => {});
        return r;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then(m => m || caches.match('./')))
  );
});
