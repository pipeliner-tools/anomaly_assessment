// Pipeline Anomaly Assessment Tool — PWA Service Worker
const CACHE_NAME = 'pipe-integrity-pwa-v1.0.2';

// Assets to precache on installation (relative paths ensure GitHub Pages subpath compatibility)
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './MLA.html',
  './manifest.json',
  './lib/chart.umd.min.js',
  './lib/xlsx.full.min.js',
  './lib/pdfmake.min.js',
  './lib/vfs_fonts.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable.png',
  './icons/icon.svg',
  './favicon.svg',
  './favicon.png',
  './favicon.ico'
];

// Installation: Cache core assets
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Cache files individually with catch so one missing asset doesn't abort install
      for (const asset of PRECACHE_ASSETS) {
        try {
          await cache.add(asset);
        } catch (err) {
          console.warn(`[Service Worker] Pre-cache skipped for ${asset}:`, err);
        }
      }
    })
  );
});

// Activation: Clean up old caches & take immediate control
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Strategy:
// - Navigation requests (HTML): Network-first with Cache fallback
// - Static assets (JS, CSS, images): Cache-first with Network fallback and dynamic caching
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // HTML page navigations
  if (req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            const resClone = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          }
          return networkRes;
        })
        .catch(async () => {
          const cached = await caches.match(req);
          if (cached) return cached;
          return (await caches.match('./index.html')) || (await caches.match('./MLA.html'));
        })
    );
    return;
  }

  // Static assets & library files: Cache-first
  event.respondWith(
    caches.match(req).then((cachedRes) => {
      if (cachedRes) {
        // Fetch in background to revalidate cache if online
        fetch(req).then((networkRes) => {
          if (networkRes && (networkRes.status === 200 || networkRes.type === 'opaque')) {
            caches.open(CACHE_NAME).then((cache) => cache.put(req, networkRes));
          }
        }).catch(() => {});
        return cachedRes;
      }

      return fetch(req).then((networkRes) => {
        if (networkRes && (networkRes.status === 200 || networkRes.type === 'opaque')) {
          const resClone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
        }
        return networkRes;
      }).catch(async (err) => {
        console.warn('[Service Worker] Fetch failed for:', req.url, err);
        // Robust cross-fallback for vendor libraries when offline
        if (req.url.includes('xlsx')) {
          return (await caches.match('./lib/xlsx.full.min.js')) ||
                 (await caches.match('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js')) ||
                 (await caches.match('https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js'));
        }
        if (req.url.includes('chart') || req.url.includes('Chart')) {
          return (await caches.match('./lib/chart.umd.min.js')) ||
                 (await caches.match('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js'));
        }
        if (req.url.includes('vfs_fonts')) {
          return (await caches.match('./lib/vfs_fonts.js')) ||
                 (await caches.match('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js'));
        }
        if (req.url.includes('pdfmake')) {
          return (await caches.match('./lib/pdfmake.min.js')) ||
                 (await caches.match('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js'));
        }
        return undefined;
      });
    })
  );
});
