exports.sendSMS = function(mobileNumber, OTP) {
    var intent = Ti.Android.createIntent({
        action : Ti.Android.ACTION_VIEW,
        type : "vnd.android-dir/mms-sms"
    });

    intent.putExtra("address", mobileNumber);
    intent.putExtra("sms_body", "Your OTP is:"+OTP);
    Ti.Android.currentActivity.startActivity(intent);
};

/**
 * Mehtod to generate 5 digit OTP to register user.
 */
exports.getOTP = function(){
    return exports.getRandomNumber(100000,999999);
};

/**
 * Mehtod to generate a random number between a specified range.
 */
exports.getRandomNumber = function(min, max){
    return Math.floor(Math.random() * (max - min) + min);
};
