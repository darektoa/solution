const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BDZUC_aX-R2SnFP-dJ_EpJ25ybGbTlxaIFOv5zg3rWCKIPUsxdwYXlA8Gsspd9ynWzu4lO0U-uhyJ2anQe1lyRg",
   "privateKey": "ugC2mnkYv9A4IjbxvS06vWy4G_aCLYAOYwKRr9_lCys"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)

var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/ckpAO9l39ns:APA91bFHd2RPklGuXTtrS_4NKPHILUbbMPYOlDfuv0DZ80NYkiVoyFb_DJdrcipKDdjL6hJvzD2RF8o1sBvKIDYGw5nQ2dFgwiHl1fFk3wN7GMZRW5KEndu5WYP3YWZKge3zb9h96gFl",
   "keys": {
       "p256dh": "BGz5UvHrna+A/1uChmGK+/FdoiyUzmQzQsE+9OvEkoBXqKUuhN74mFB3dAVlg+wTZX/LVymio7dpnAw2AUOIO5I=",
       "auth": "HZnZM5/WyAKvNZD5mZUeVw=="
   }
};

var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notification !';
 
var options = {
   gcmAPIKey: '892207367145',
   TTL: 60
};

webPush.sendNotification(
   pushSubscription,
   payload,
   options
)