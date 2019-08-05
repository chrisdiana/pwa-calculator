'use strict';

const CACHE_NAME = 'static-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/app.js',
  '/calculator.js',
  '/manifest.json',
  '/style.css',
  '/img/icons/android-chrome-192x192.png',
  '/img/icons/android-chrome-512x512.png',
  '/img/icons/apple-touch-icon.png',
  '/img/icons/browserconfig.xml',
  '/img/icons/favicon-16x16.png',
  '/img/icons/favicon-32x32.png',
  '/img/icons/favicon.ico',
  '/img/icons/mstile-150x150.png',
  '/img/icons/safari-pinned-tab.svg',
];

// Install service worker and cache all content
self.addEventListener('install', e => e.waitUntil(
  caches.open(CACHE_NAME).then(c => c.addAll(FILES_TO_CACHE))));

// Fetch content from cache if available for 
// offline support and cache new resources if available
self.addEventListener('fetch', e => e.respondWith(
  caches.match(e.request).then((r) => {
    return r || fetch(e.request).then((res) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(e.request, res.clone());
        return res;
      })
    })
  })
));