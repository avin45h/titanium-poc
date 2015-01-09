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
    return Math.floor((Math.random() * 89999) + 10000);
};
