'use strict';

const CACHE_NAME = 'static-cache-v2';
const FILES_TO_CACHE = [
  'index.html',
  'app.js',
  'calculator.js',
  'manifest.json',
  'style.css',
  'themes.css',
  'img/check.svg',
  'img/icons/android-chrome-192x192.png',
  'img/icons/android-chrome-512x512.png',
  'img/icons/apple-touch-icon.png',
  'img/icons/browserconfig.xml',
  'img/icons/favicon-16x16.png',
  'img/icons/favicon-32x32.png',
  'img/icons/favicon.ico',
  'img/icons/mstile-150x150.png',
  'img/icons/safari-pinned-tab.svg',
  'img/splash/iphone5_splash.png',
  'img/splash/iphone6_splash.png',
  'img/splash/iphoneplus_splash.png',
  'img/splash/iphonex_splash.png',
  'img/splash/iphonexr_splash.png',
  'img/splash/iphonexsmax_splash.png',
  'img/splash/ipad_splash.png',
  'img/splash/ipadpro1_splash.png',
  'img/splash/ipadpro3_splash.png',
  'img/splash/ipadpro2_splash.png',
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

// Clean up old caches
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
      if(CACHE_NAME.indexOf(key) === -1) {
        return caches.delete(key);
      }
    }));
  })
));