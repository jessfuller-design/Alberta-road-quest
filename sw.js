const CACHE='andy-road-quest-v6-db-377';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg','./data/questions.js','./data/questions.json','./data/pack-006-ids-278-327.json','./data/pack-007-ids-328-377.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
