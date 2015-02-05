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
            var formData = {
                profilename: $.profileNameTextField.value,
                username: $.userNameTextField.value,
                password: $.passwordTextField.value,
                phonenumber: $.phoneNumberTextField.value,
                email: $.emailIdTextField.value,
                latitude: _latitude,
                longitude: _longitude
            };
            var url = Ti.App.Properties.getString("baseURL");
            var xhr = Titanium.Network.createHTTPClient();
            xhr.onerror = onHttpFailure;
            xhr.open("POST", url);
            xhr.setRequestHeader("content-type", "application/json");
            xhr.setRequestHeader("Accept-Encoding", "gzip");
            Ti.API.info("Params" + JSON.stringify(formData));
            xhr.send(JSON.stringify(formData));
            xhr.onload = function() {
                Ti.API.info("RAW =" + this.responseText);
                if ("200" == this.status) {
                    Ti.API.info("got my response, http status code " + this.status);
                    if (4 == this.readyState) {
                        var response = JSON.parse(this.responseText);
                        Ti.API.info("Response = " + response);
                    } else alert("HTTP Ready State != 4");
                } else if ("201" == this.status) {
                    Ti.API.info("Response Code 201: New User Profile created");
                    onHttpSuccess(this.responseText);
                } else {
                    alert("HTTP Error Response Status Code = " + this.status);
                    Ti.API.error("Error =>" + this.response);
                }
            };
        }
    }
    function onHttpSuccess(responseText) {
        args.progressIndicator.hide();
        _user.setUserProfile(responseText);
        $.signUpFormContainer.visible = false;
        $.otpFormContainer.visible = true;
    }
    function onHttpFailure(e) {
        args.progressIndicator.hide();
        Ti.API.error("Sever Error****" + JSON.stringify(e));
        alert("Please enter a valid Username and Email Id");
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
            alert("Please Enter Profile Name");
            return false;
        }
        if (null != $.userNameTextField.value && 0 == $.userNameTextField.value.length) {
            alert("Please Enter User Name");
            return false;
        }
        if (null != $.passwordTextField.value && 0 == $.userNameTextField.value.length) {
            alert("Please Enter Password");
            return false;
        }
        if (null != $.phoneNumberTextField.value && 0 == $.phoneNumberTextField.value.length) {
            alert("Please Enter Phone Number");
            return false;
        }
        if (null != $.emailIdTextField.value && 0 == $.emailIdTextField.value.length) {
            alert("Please Enter Email Id");
            return false;
        }
        if (!utils.validateEmailId($.emailIdTextField.value)) {
            alert("Please Enter a Valid Email Id");
            return false;
        }
        if (null != $.locationTextField.value && 0 == $.locationTextField.value.length) {
            alert("Please Enter Location");
            return false;
        }
        return true;
    }
    function init() {
        var location = require("location");
        location.getCurrentAddress(function(e) {
            if (e.result) {
                $.locationTextField.value = e.address;
                _latitude = e.latitude;
                _longitude = e.longitude;
            }
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
    $.__views.passwordTextField = Ti.UI.createTextField({
        width: Ti.UI.FILL,
        height: Alloy.Globals.textFieldHeight,
        color: "#000",
        maxLength: 40,
        top: 10,
        hintText: L("password"),
        id: "passwordTextField"
    });
    $.__views.signUpFormContainer.add($.__views.passwordTextField);
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
    require("http");
    var _latitude = "80.80";
    var _longitude = "90.90";
    var _user = require("user");
    init();
    __defers["$.__views.signupButton!click!onSignUpButtonClick"] && $.__views.signupButton.addEventListener("click", onSignUpButtonClick);
    __defers["$.__views.doneButton!click!onDoneButtonClick"] && $.__views.doneButton.addEventListener("click", onDoneButtonClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;