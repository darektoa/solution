let webPush = require('web-push');

//key di dapat dari hasil run npm 'web-push generate-vapid-keys --json' 
const vapidKeys = {
    "publicKey" : "BE0UoDsbl1y1ZUeg4q6M8OppRXMa8t5AMF3MlkiBVBPKcqIwGKafcgfdWwxUmc4_qglV3ruPWnFJL8KDBshtKBA",
    "privateKey" : "gCLN5L9WJRwJehoHUibze9usHw9ek97BesSAnsKIicA"
};

webPush.setVapidDetails(
    'mailto: alfredcoolace@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

//untuk endpoint dan keys p256dh terdapat pada console di chrome
let pushSubscription = {
    "endpoint" : "https://fcm.googleapis.com/fcm/send/fhg2CQsAItc:APA91bFioHtW3qHRsq3WA5jJcMOssyBGB4nkQZg1ijji1EdEhkqIUW0X74hzsfRexKD-m7VakWBi0OgaaOtr55FhehgpN-Glro7YwDgD4stG1vEAFc-tUOsccijNwScM_0Z66y0GuktQ",
    "keys" : {
        "p256dh": "BPTp8fEoyXrWKQ3zmO2y89boZ4Qot4jv2AObxdNcLkApe4JABG60EXwhVx8EWQKVRHZywpGdPAEE0oDOGIHUfZE=",
        "auth": "m9CGwfFtlxBDGVrv3FzdrA=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey : '44112752474',
    TTL : 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);