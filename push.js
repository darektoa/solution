var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BIfnd2TKnrPWEshPq-XbQh_lLmDVGA5tTHc9dOHlNj1Uo6lLJmgpQSWqiKQItJQ1et-pvGJDvvRyxn3H0tBizxo",
   "privateKey": "HK51x75E2NJMniOjaJiVdhCuGkPtgbOkE1BixzNQp24"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/c-1KXqq5SFo:APA91bEJ_2z9YQNbrYwyYA9qG0HYfmPsuvNPBRs06nohNtsRslW2OBgNW9kGOs7ecUU2kPUgSEU7D0bJWe_ha0TZvYNL6_6TVjGQdTeq0nndul6O--YuzxYtF4CvXweSeMoqjyuPqE8t",
   "keys": {
       "p256dh": "BEQ7rzMScSvijQxfJF7mIjsGEd2qIOSTILccZviVp7Uk7uneH/zabMYSwZ4WB214OsubMmz9APTyolnoD6mHEjA=",
       "auth": "Okd6PR49F3TeXmVz2gEgzQ=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '772472312233',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
).catch(err => {
   console.log(err)
})