let webPush = require('web-push');

//key di dapat dari hasil run npm 'web-push generate-vapid-keys --json' 
const vapidKeys = {
    "publicKey" : "BIcg0v6mAKovsVY_j3f7LlluHz7GQ6eYN3GqMpJUywXgzYLaNm7YsAaNlQS7o-cnrsE_KFXN3wx1Ldp9RYq3ZrU",
    "privateKey" : "j8b-j0J2Apt2J9sQ1ZX69GoQuk0SBE1QWO-GytA__po"
};

webPush.setVapidDetails(
    'mailto: alfredcoolace@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

//untuk endpoint dan keys p256dh terdapat pada console di chrome
let pushSubscription = {
    "endpoint" : "https://fcm.googleapis.com/fcm/send/cbmSHzWJ3ZM:APA91bH9rDEqYG8qiueQFGb7IgBB42Z4W8MiAyvcVQIwtNi3xKXcz7V9yee3s5m7crQ2TxKNvF5zgC50HHxea4pfJC0s23c8rwokSOjQJ0HbXutZfWGMUfK2n3CQPhInjdUcfXiemcKj",
    "keys" : {
        "p256dh": "BH/FHHEmRcV9pEQiy/rZ4uqtjMFiWtH0KpwcRnx6T1Ej/cmEjFPkiN6ubgjld4HTAVPpeqMGyHTC19Kpqc4Qwhk=",
        "auth": "5nyaQHDmHt37tSXbAbJDsA=="
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