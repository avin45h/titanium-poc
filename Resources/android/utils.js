exports.sendSMS = function(mobileNumber, OTP) {
    var intent = Ti.Android.createIntent({
        action: Ti.Android.ACTION_VIEW,
        type: "vnd.android-dir/mms-sms"
    });
    intent.putExtra("address", mobileNumber);
    intent.putExtra("sms_body", "Your OTP is:" + OTP);
    Ti.Android.currentActivity.startActivity(intent);
};

exports.getOTP = function() {
    return exports.getRandomNumber(1e5, 999999);
};

exports.getRandomNumber = function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

exports.validateEmailId = function(emailId) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(emailId);
};

exports.getUnderlinedString = function(input) {
    return "<html><u>" + input + "</u></html>";
};