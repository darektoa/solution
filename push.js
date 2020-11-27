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
   "endpoint": "https://fcm.googleapis.com/fcm/send/dYOpNlRbqYA:APA91bFdUIhXUaqx-OgZMF7xSLU068ry73ZOuDclpDL2LxBDNcmDzIW1AHVfZWxQmcMkJQnnw8Uhi84L4V1NrcSzjHjM1K-IV8XwdWAf78ikJD1IOywZDH3hCcDP1P9k5ILiRvo-fhLC",
   "keys": {
       "p256dh": "BPJNvaaMAHBXFa41JnorTGCF3vXDPOos5bOfp7eaThWe0p52cioXpmmE+9BL0EZakm6VdS9Dwqf1lwYjxLNWA94=",
       "auth": "dqNYJ0KyrTLYMfhPWn7xEQ=="
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