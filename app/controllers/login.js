var args = arguments[0] || {};
/*****Global Variables****/
var utils = require("utils");
var _http = require("http");
var _user = require("user");

/**
 * Will be called when user will click the sign in button
 * @param {Object} e
 */
function onSignInButtonClick(e) {
    doLogin();
}

/**
 * Method to perform login
 */
function doLogin() {
    if (validateTextFields()) {
         args.progressIndicator.show();
        _http.request({
            url:Alloy.Globals.baseURL+$.userNameTextField.value,
            type:Alloy.Globals.HTTP_REQUEST_TYPE_GET,
            timeout:30000,
            format:Alloy.Globals.DATA_FORMAT_JSON,
            success:onHttpSuccess,
            failure:onHttpFailure
        });
    }
}


/**
 * Success callback of the http request of registering user
 */
function onHttpSuccess(responseText) {
    args.progressIndicator.hide();
    _user.setUserProfile(responseText);
    Ti.API.info('success:********'+JSON.stringify(responseText));
    var homeController = Alloy.createController("home").getView();
    homeController.open();
    
};

/**
 * Failure callback of http request of registering user
 */
function onHttpFailure(e) {
    args.progressIndicator.hide();
    Ti.API.info('failure:********'+JSON.stringify(e));
    alert("Please enter valid Username and Password");
};



/**
 * Method to check the entry validity in the user id and password fields
 */
function validateTextFields() {
    if ($.userNameTextField.value != null && $.userNameTextField.value.length == 0) {
        alert(L("enter_user_name"));
        return false;
    }

    if ($.passwordTextField.value != null && $.passwordTextField.value.length == 0) {
        alert(L("enter_password"));
        return false;
    }

    
    // if (!validateEmailId($.userNameTextField.value)) {
        // alert("Enter a valid email address.");
        // alert(L("enter_valid_email"));
        // return;
    // }
    
    return true;
}

// /**
 // * This method checks if the email address entered is in correct format.
 // */
// function validateEmailId(emailId) {
    // var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    // return reg.test(emailId);
// }

/**
 * Will be called when user will click the Sign Up button on the sign in page
 * @param {Object} e
 */
function onSignUpButtonClick(e) {
    //Call the callback method from the args supplied while creating this controller in index.js
    args.callBacks.signUpCallback(e);
    if (Titanium.Platform.osname == "android") {
        args.callBacks.enableHomeUpButtonCallback(e);
    }

}
