// cache 버전은 배포 때마다 바꿔 주세요 (캐시 무력화)
const CACHE = 'vibe6w-v7';

const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k === CACHE ? null : caches.delete(k))))
    ).then(() => self.clients.claim())
  );
});

// cache-first, 네트워크 실패 시 캐시
self.addEventListener('fetch', (event) => {
  const req = event.request;
  // GitHub Pages에서 404 방지용: same-origin만 캐시
  if (new URL(req.url).origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        return cached || fetch(req).then((res) => {
          const resClone = res.clone();
          caches.open(CACHE).then((c) => c.put(req, resClone));
          return res;
        }).catch(() => caches.match('./index.html'));
      })
    );
  }
});
