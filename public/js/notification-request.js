window.addEventListener('load', requestPermission);

function requestPermission() {
  if ('Notification' in window) {
    Notification.requestPermission().then((result) => {
      if (result === "denied") {
        M.toast({html: 'Notification Denied', classes: "red darken-3"})
        return;
      } else if (result === "default") {
        M.toast({html: 'Request Notification Closed', classes: "blue darken-3"})
        return;
      } else {
        subscribe();
      }
    });
  }
}

function subscribe() {
  if (('PushManager' in window)) {
    navigator.serviceWorker
    .getRegistration()
    .then((registration) => {
        registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array("BDZUC_aX-R2SnFP-dJ_EpJ25ybGbTlxaIFOv5zg3rWCKIPUsxdwYXlA8Gsspd9ynWzu4lO0U-uhyJ2anQe1lyRg")
        }).then((subscribe) => {
            console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
            console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                null, new Uint8Array(subscribe.getKey('p256dh')))));
            console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                null, new Uint8Array(subscribe.getKey('auth')))));
        }).catch((err) => {
            console.error('Tidak dapat melakukan subscribe ', err.message);
        });
    });
  }
}
  
function urlBase64ToUint8Array(base64String) {
  const padding     = '='.repeat((4 - base64String.length % 4) % 4);
  const base64      = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData     = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  
  return outputArray;
}