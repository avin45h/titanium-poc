var args = arguments[0] || {};
var utils = require("utils");
if (OS_IOS) {
    var SMS = require('bencoding.sms').createSMSDialog({
        barColor : "#a22621"
    });
}
init();
/**
 * Will be calle when the signup button will be clicked on the signup page.
 * @param {Object} e
 */
function onSignUpButtonClick(e) {
    if (validateTextFields()) {
        args.progressIndicator.show();
        setTimeout(function(){
            args.progressIndicator.hide();
            if (OS_ANDROID) {
              openSmsDialogAndroid($.phoneNumberTextField.value, "Your OTP for Car Rental Aplication is:" + utils.getOTP());
            }
            setTimeout(function(){
                $.signUpFormContainer.visible = false;
                $.otpFormContainer.visible = true;
            },utils.getRandomNumber(1,2)*1000);
        },utils.getRandomNumber(2,4)*1000);
        
    }
}

/**
 * called when user clicks Done button after filling up the OTP
 */
function onDoneButtonClick(e){
    if ($.otpTextField.value != null && $.otpTextField.value.length == 0) {
        alert(L("enter_OTP"));
        return;
    }
    args.progressIndicator.show();
    setTimeout(function(){
           args.progressIndicator.hide();
           var homeController = Alloy.createController("home").getView();
           homeController.open(); 
        },utils.getRandomNumber(2,4)*1000);
}

/**
 * Function to validate if all the fields in register screen are filled properly
 */
function validateTextFields() {
    if ($.profileNameTextField.value != null && $.profileNameTextField.value.length == 0) {
        alert("Enter Profile Name");
        return false;
    } else if ($.userNameTextField.value != null && $.userNameTextField.value.length == 0) {
        alert("Enter User Name");
        return false;
    } else if ($.phoneNumberTextField.value != null && $.phoneNumberTextField.value.length == 0) {
        alert("Enter Phone Number");
        return false;
    } else if ($.emailIdTextField.value != null && $.emailIdTextField.value.length == 0) {
        alert("Enter Email Address");
        return false;
    } else if ($.locationTextField.value != null && $.locationTextField.value.length == 0) {
        alert("Enter Location");
        return false;
    }

    return true;

}

/**
 * Opens sms dialog
 * */
function openSmsDialog() {
    var message = L("sms_message");
    var mobNumber = (OS_IOS) ? $.txtMobileNo.value.split(",") : $.txtMobileNo.value;
    if (OS_IOS) {
        openSmsDialogIOS(mobNumber, message);
    } else if (OS_ANDROID) {
        openSmsDialogAndroid(mobNumber, message);
    }
};

/**
 * Opens sms dialog for IOS
 * */
function openSmsDialogIOS(mobNumber, message) {

    //Check whether device can send SMS
    if (!SMS.canSendText) {
        displayMessage({
            title : L("sms_alert_title"),
            message : L("sms_failure_message")
        });
        return;
    }

    //Set the SMS message
    SMS.setMessageBody(message);
    //Set the SMS ToRecipients, multiple numbers can be sent
    SMS.setToRecipients(mobNumber);
    SMS.open({
        animated : true
    });
};

/**
 * Opens sms dialog for Android
 * */
function openSmsDialogAndroid(mobNumber, message) {
    var intent = Ti.Android.createIntent({
        action : Ti.Android.ACTION_VIEW,
        type : 'vnd.android-dir/mms-sms',
    });
    intent.putExtra('sms_body', message);
    intent.putExtra("address", mobNumber);
    try {
        Ti.Android.currentActivity.startActivity(intent);
        // commenting as sms dialog callbacks is not closed after one tap.Problem with heavy weight window
        /*Ti.Android.currentActivity.startActivityForResult(intent, function(e) {
         var result;
         if (e.resultCode == Ti.Android.RESULT_OK) {
         result = L("message_sent");
         } else if (e.resultCode == Ti.Android.RESULT_CANCELED) {
         result = L("message_cancelled");
         }
         displayMessage({
         message : result
         });
         });*/

    } catch (ActivityNotFoundException) {
        displayMessage({
            message : L("message_error")
        });
        ;
    }
};

/**
 * Initialize the ui components here
 */
function init() {
    var location = require("location");
    location.getCurrentAddress(function(e) {
        if (e.result) {
            $.locationTextField.value = e.address;
        } else {
            //Could not find any address, please fill the address manually.
        }
    });
}
