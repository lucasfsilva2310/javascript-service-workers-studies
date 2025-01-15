const CACHE_NAME = "offline-app-v1";
const URLS_TO_CACHE = ["./", "./index.html", "./style.css", "./app.js"];

console.log("Installing..");
// Install: Add content to cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Files cached successfuly!");
        return cache.addAll(URLS_TO_CACHE);
      })
      .catch((error) => console.log(error))
  );
});

console.log("Activating..");
// Activation: Clear old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Removing old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

console.log("Intercepting..");
// Interception: return cache or new fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      console.log("responseCache", response);
      return response || fetch(event.request);
    })
  );
});
