var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BL8pzd4L3kHSXC4Osv8l_uDfxUuPdZIFaZoqtIxItfLqJ--AW2jhVyl0VDiA5nVHPnxBQYo5EH-k4mOIu2_gzWk",
   "privateKey": "POpItL41F-2vCNL_EkvekhMYZ8WhGtdMf1H3bICMHbQ"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dIrnpOJhQtU:APA91bHghpn8Z_h-0gHF9UAsrW4wr8UIFD_se1KVr3FQq13CpizFLHYuElqR52Fq2-Teqpr-Wor8FrzJAlgnOD2NM54ZklGL7CQPRXAXSypCA2tG5xv9dKvqH8xSBtVPS9NHsKl6szJr",
   "keys": {
       "p256dh": "BBUgrSImem5f6OqqiESKAfornSTnWg2fJdA5wtSfaDqIWRKPFSWiAwf8HQzpuwDL7Y1w0Ebrd5dJNF8iuad/IGU=",
       "auth": "yQC8JcYewX4R0s96nuDQJw=="
   }
};
var payload = 'Selamat datang di aplikasi sepak bola LaLiga!';
 
var options = {
   gcmAPIKey: '1064072543570',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);