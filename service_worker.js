// Cached core static resources 
self.addEventListener("install",e=>{
    // e.waitUntil(
    //   caches.open("static").then(cache=>{
    //     return cache.add(['soa_logo_192.png','soa_logo_512.png','soa_logo.png']);
    //   })
    // );
    console.log("Service Worker Added, App installed");
  });
  
  // Fatch resources
  self.addEventListener("fetch",e=>{
    e.respondWith(
      caches.match(e.request).then(response=>{
        return response||fetch(e.request);
      })
    );
});