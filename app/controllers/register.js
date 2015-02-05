var args = arguments[0] || {};
var utils = require("utils");
var _http = require("http");
var _latitude = "80.80";
var _longitude = "90.90";
var _user = require("user");

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
        var formData = {
            profilename : $.profileNameTextField.value,
            username : $.userNameTextField.value,
            password : $.passwordTextField.value,
            phonenumber : $.phoneNumberTextField.value,
            email : $.emailIdTextField.value,
            latitude : _latitude,
            longitude : _longitude
        };
        // var params = {
        // url : Alloy.Globals.baseURL,
        // data : formData,
        // success : onHttpSuccess,
        // failure : onHttpFailure,
        // format : Alloy.Globals.DATA_FORMAT_JSON,
        // type : Alloy.Globals.HTTP_REQUEST_TYPE_POST,
        // headers : [{
        // name : "content-type",
        // value : "application/json"
        // }]
        // };
        var url = Ti.App.Properties.getString('baseURL');
        var xhr = Titanium.Network.createHTTPClient();
        xhr.onerror = onHttpFailure;
        xhr.open("POST", url);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("Accept-Encoding", "gzip");
        Ti.API.info('Params' + JSON.stringify(formData));
        xhr.send(JSON.stringify(formData));
        xhr.onload = function() {
            Ti.API.info('RAW =' + this.responseText);
            if (this.status == '200') {
                Ti.API.info('got my response, http status code ' + this.status);
                if (this.readyState == 4) {
                    var response = JSON.parse(this.responseText);
                    Ti.API.info('Response = ' + response);
                } else {
                    alert('HTTP Ready State != 4');
                }
            } else if (this.status == '201') {
                Ti.API.info('Response Code 201: New User Profile created');
                onHttpSuccess(this.responseText);
            } else {
                alert('HTTP Error Response Status Code = ' + this.status);
                Ti.API.error("Error =>" + this.response);
            }
        };
    }
}

/**
 * Success callback of the http request of registering user
 */
function onHttpSuccess(responseText) {
    args.progressIndicator.hide();
    _user.setUserProfile(responseText);
    //if (OS_ANDROID) {
       // openSmsDialogAndroid($.phoneNumberTextField.value, "Your OTP for Car Rental Aplication is:" + utils.getOTP());
    //}
    $.signUpFormContainer.visible = false;
    $.otpFormContainer.visible = true;

};

/**
 * Failure callback of http request of registering user
 */
function onHttpFailure(e) {
    args.progressIndicator.hide();
    Ti.API.error('Sever Error****' + JSON.stringify(e));
    alert("Please enter a valid Username and Email Id" );
};

/**
 * called when user clicks Done button after filling up the OTP
 */
function onDoneButtonClick(e) {
    if ($.otpTextField.value != null && $.otpTextField.value.length == 0) {
        alert(L("enter_OTP"));
        return;
    }
    args.progressIndicator.show();
    setTimeout(function() {
        args.progressIndicator.hide();
        var homeController = Alloy.createController("home").getView();
        homeController.open();
    }, utils.getRandomNumber(2, 4) * 1000);
}

/**
 * Function to validate if all the fields in register screen are filled properly
 */
function validateTextFields() {
    if ($.profileNameTextField.value != null && $.profileNameTextField.value.length == 0) {
        alert("Please Enter Profile Name");
        return false;
    } else if ($.userNameTextField.value != null && $.userNameTextField.value.length == 0) {
        alert("Please Enter User Name");
        return false;
    } else if ($.passwordTextField.value != null && $.userNameTextField.value.length == 0) {
        alert("Please Enter Password");
        return false;
    } else if ($.phoneNumberTextField.value != null && $.phoneNumberTextField.value.length == 0) {
        alert("Please Enter Phone Number");
        return false;
    } else if ($.emailIdTextField.value != null && $.emailIdTextField.value.length == 0) {
        alert("Please Enter Email Id");
        return false;
    } else if(!utils.validateEmailId($.emailIdTextField.value)){
        alert("Please Enter a Valid Email Id");
        return false;
    }else if ($.locationTextField.value != null && $.locationTextField.value.length == 0) {
        alert("Please Enter Location");
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
            _latitude = e.latitude;
            _longitude = e.longitude;
        } else {
            //Could not find any address, please fill the address manually.
        }
    });
}
