const CACHE='andy-road-quest-v13';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg','./road-signs.js','./questions.js','./questions.json','./pack-006-ids-278-327.json','./pack-007-ids-328-377.json','./pack-008-ids-378-427.json','./pack-009-ids-428-477.json','./pack-010-ids-478-527.json','./pack-011-ids-528-547.json','./pack-012-ids-548-597.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
