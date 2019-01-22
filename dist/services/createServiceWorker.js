export function register() {
  if ('serviceWorker' in navigator) window.addEventListener('load', function () {
    var swUrl = process.env.PUBLIC_URL + '/service-worker.js';

    navigator.serviceWorker.register(swUrl).then(function (registration) {
      registration.onupdatefound = function () {
        var installingWorker = registration.installing;

        installingWorker.onstatechange = function () {
          if (installingWorker.state === 'installed') if (navigator.serviceWorker.controller) {
            console.log('New content is available; please refresh.');
          } else {
            console.log('Content is cached for offline use.');
          }
        };
      };
    }).catch(function (error) {
      console.error('Error during service worker registration:', error);
    });
  });
}

export function unregister() {
  if ('serviceWorker' in navigator) navigator.serviceWorker.ready.then(function (registration) {
    registration.unregister();
  });
}