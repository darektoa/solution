importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([
    {url: '/', revision: '1'},
    {url: '/nav.html', revision: '1'},
    {url: '/index.html', revision: '1'},
    {url: '/detail.html', revision: '1'},
    {url: '/manifest.json', revision: '1'},
    {url: '/css/style.css', revision: '1'},
    {url: '/css/materialize.min.css', revision: '1'},
    {url: '/images/icon-144.png', revision: '1'},
    {url: '/images/icon-192.png', revision: '1'},
    {url: '/images/icon-512.png', revision: '1'},
    {url: '/pages/premier-league.html', revision: '1'},
    {url: '/pages/championship.html', revision: '1'},
    {url: '/pages/saved.html', revision: '1'},
    {url: '/js/notification-request.js', revision: '1'},
    {url: '/js/sw-register.js', revision: '1'},
    {url: '/js/materialize.min.js', revision: '1'},
    {url: '/js/api.js', revision: '1'},
    {url: '/js/nav.js', revision: '1'},
    {url: '/js/db.js', revision: '1'},
    {url: '/js/idb.js', revision: '1'},
    {url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1'},
    {url: 'https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '1'},
], {
  ignoreUrlParametersMatching: [/.*/],
});



workbox.routing.registerRoute(
    new RegExp('/pages'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);



workbox.routing.registerRoute(
    new RegExp('(https://|http://)'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'data-api'
    })
);



self.addEventListener('push', function(event) {
    const body = event.data ? event.data.text() : 'Push message no payload';

    const options = {
      body: body,
      icon: 'images/icon-512.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };

    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
});