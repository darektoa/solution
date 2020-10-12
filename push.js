var webPush = require("web-push");
 
const vapidKeys = {
   publicKey: "BISxs2bXvhQkxOdu5XrBZPKhdfk1hugOYAf-84zxzZ3ZUGbh7JNn-S_bSAkPGEPxYWZKMZWZajOyvNclp4jtEFI",
   privateKey: "r9F5VbiHJyH45PM0-Z9kXAJ-hBEGuwuzjggIZ6pEs0g"
};
 
 
webPush.setVapidDetails(
   "mailto:example@yourdomain.org",
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/ewgC4nxeIbY:APA91bHYfF9DOhFAEJHJavfBzORmHRzSWslCnwx7r_67TS3aWyzg-QhLoMETWgOHZ_29HX13DqDtUYgKVn2dufZKyweVcE4hgTATX7vhy5aE3rzPq9t_9mPYWfdvqWjNraJKxaOp-T2X",
   "keys": {
       "p256dh": "BFyhs8qJ33CqVzdpiUw4911BhvLO0YCVgPVsksQOjmrBtEZF5s2opNY+TsHHVd4AkrHUIHSdATCghGMIRtLvS5o=",
       "auth": "oOFp9bAQTyxxB5plchCEcA=="
   }
};
var payload = 'Selamat Datang! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '815348104450',
   TTL: 60
};

webPush.sendNotification(
   pushSubscription, 
   payload, 
   options)
   .catch(function(err){
   console.log(err);
   });;