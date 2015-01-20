function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function onSignUpButtonClick() {
        if (validateTextFields()) {
            args.progressIndicator.show();
            setTimeout(function() {
                args.progressIndicator.hide();
                openSmsDialogAndroid($.phoneNumberTextField.value, "Your OTP for Car Rental Aplication is:" + utils.getOTP());
                setTimeout(function() {
                    $.signUpFormContainer.visible = false;
                    $.otpFormContainer.visible = true;
                }, 1e3 * utils.getRandomNumber(1, 2));
            }, 1e3 * utils.getRandomNumber(2, 4));
        }
    }
    function onDoneButtonClick() {
        if (null != $.otpTextField.value && 0 == $.otpTextField.value.length) {
            alert(L("enter_OTP"));
            return;
        }
        args.progressIndicator.show();
        setTimeout(function() {
            args.progressIndicator.hide();
            var homeController = Alloy.createController("home").getView();
            homeController.open();
        }, 1e3 * utils.getRandomNumber(2, 4));
    }
    function validateTextFields() {
        if (null != $.profileNameTextField.value && 0 == $.profileNameTextField.value.length) {
            alert("Enter Profile Name");
            return false;
        }
        if (null != $.userNameTextField.value && 0 == $.userNameTextField.value.length) {
            alert("Enter User Name");
            return false;
        }
        if (null != $.phoneNumberTextField.value && 0 == $.phoneNumberTextField.value.length) {
            alert("Enter Phone Number");
            return false;
        }
        if (null != $.emailIdTextField.value && 0 == $.emailIdTextField.value.length) {
            alert("Enter Email Address");
            return false;
        }
        if (null != $.locationTextField.value && 0 == $.locationTextField.value.length) {
            alert("Enter Location");
            return false;
        }
        return true;
    }
    function openSmsDialogAndroid(mobNumber, message) {
        var intent = Ti.Android.createIntent({
            action: Ti.Android.ACTION_VIEW,
            type: "vnd.android-dir/mms-sms"
        });
        intent.putExtra("sms_body", message);
        intent.putExtra("address", mobNumber);
        try {
            Ti.Android.currentActivity.startActivity(intent);
        } catch (ActivityNotFoundException) {
            displayMessage({
                message: L("message_error")
            });
        }
    }
    function init() {
        var location = require("location");
        location.getCurrentAddress(function(e) {
            e.result && ($.locationTextField.value = e.address);
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "register";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.registerParentView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "white",
        id: "registerParentView"
    });
    $.__views.registerParentView && $.addTopLevelView($.__views.registerParentView);
    $.__views.signUpFormContainer = Ti.UI.createView({
        layout: "vertical",
        left: 10,
        right: 10,
        height: Ti.UI.SIZE,
        backgroundColor: "white",
        id: "signUpFormContainer"
    });
    $.__views.registerParentView.add($.__views.signUpFormContainer);
    $.__views.profileNameTextField = Ti.UI.createTextField({
        width: Ti.UI.FILL,
        height: Alloy.Globals.textFieldHeight,
        color: "#000",
        maxLength: 40,
        top: 0,
        hintText: L("profile_name"),
        id: "profileNameTextField"
    });
    $.__views.signUpFormContainer.add($.__views.profileNameTextField);
    $.__views.userNameTextField = Ti.UI.createTextField({
        width: Ti.UI.FILL,
        height: Alloy.Globals.textFieldHeight,
        color: "#000",
        maxLength: 40,
        top: 10,
        hintText: L("user_name"),
        id: "userNameTextField"
    });
    $.__views.signUpFormContainer.add($.__views.userNameTextField);
    $.__views.phoneNumberTextField = Ti.UI.createTextField({
        width: Ti.UI.FILL,
        height: Alloy.Globals.textFieldHeight,
        color: "#000",
        maxLength: 10,
        top: 10,
        hintText: L("phone_number"),
        keyboardType: Titanium.UI.KEYBOARD_PHONE_PAD,
        id: "phoneNumberTextField"
    });
    $.__views.signUpFormContainer.add($.__views.phoneNumberTextField);
    $.__views.emailIdTextField = Ti.UI.createTextField({
        width: Ti.UI.FILL,
        height: Alloy.Globals.textFieldHeight,
        color: "#000",
        maxLength: 40,
        top: 10,
        hintText: L("emailid"),
        keyboardType: Titanium.UI.KEYBOARD_EMAIL,
        id: "emailIdTextField"
    });
    $.__views.signUpFormContainer.add($.__views.emailIdTextField);
    $.__views.locationTextField = Ti.UI.createTextField({
        width: Ti.UI.FILL,
        height: Alloy.Globals.textFieldHeight,
        color: "#000",
        maxLength: 40,
        top: 10,
        hintText: L("location"),
        id: "locationTextField"
    });
    $.__views.signUpFormContainer.add($.__views.locationTextField);
    $.__views.signupButton = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: Alloy.Globals.buttonHeight,
        color: "black",
        backgrountColor: "green",
        top: 15,
        title: L("signup"),
        id: "signupButton"
    });
    $.__views.signUpFormContainer.add($.__views.signupButton);
    onSignUpButtonClick ? $.__views.signupButton.addEventListener("click", onSignUpButtonClick) : __defers["$.__views.signupButton!click!onSignUpButtonClick"] = true;
    $.__views.otpFormContainer = Ti.UI.createView({
        layout: "vertical",
        left: 10,
        right: 10,
        height: Ti.UI.SIZE,
        backgroundColor: "white",
        visible: false,
        id: "otpFormContainer"
    });
    $.__views.registerParentView.add($.__views.otpFormContainer);
    $.__views.otpTextField = Ti.UI.createTextField({
        width: Ti.UI.FILL,
        height: Alloy.Globals.textFieldHeight,
        color: "#000",
        maxLength: 6,
        top: 10,
        hintText: L("enter_otp"),
        keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
        id: "otpTextField"
    });
    $.__views.otpFormContainer.add($.__views.otpTextField);
    $.__views.doneButton = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: Alloy.Globals.buttonHeight,
        color: "black",
        backgrountColor: "green",
        top: 15,
        title: L("done"),
        id: "doneButton"
    });
    $.__views.otpFormContainer.add($.__views.doneButton);
    onDoneButtonClick ? $.__views.doneButton.addEventListener("click", onDoneButtonClick) : __defers["$.__views.doneButton!click!onDoneButtonClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var utils = require("utils");
    init();
    __defers["$.__views.signupButton!click!onSignUpButtonClick"] && $.__views.signupButton.addEventListener("click", onSignUpButtonClick);
    __defers["$.__views.doneButton!click!onDoneButtonClick"] && $.__views.doneButton.addEventListener("click", onDoneButtonClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;