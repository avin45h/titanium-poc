function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function onSignInButtonClick() {
        doLogin();
    }
    function doLogin() {
        if (validateTextFields()) {
            args.progressIndicator.show();
            _http.request({
                url: Alloy.Globals.baseURL + $.userNameTextField.value,
                type: Alloy.Globals.HTTP_REQUEST_TYPE_GET,
                timeout: 3e4,
                format: Alloy.Globals.DATA_FORMAT_JSON,
                success: onHttpSuccess,
                failure: onHttpFailure
            });
        }
    }
    function onHttpSuccess(responseText) {
        args.progressIndicator.hide();
        _user.setUserProfile(responseText);
        Ti.API.info("success:********" + JSON.stringify(responseText));
        var homeController = Alloy.createController("home").getView();
        homeController.open();
    }
    function onHttpFailure(e) {
        args.progressIndicator.hide();
        Ti.API.info("failure:********" + JSON.stringify(e));
        alert("Please enter valid Username and Password");
    }
    function validateTextFields() {
        if (null != $.userNameTextField.value && 0 == $.userNameTextField.value.length) {
            alert(L("enter_user_name"));
            return false;
        }
        if (null != $.passwordTextField.value && 0 == $.passwordTextField.value.length) {
            alert(L("enter_password"));
            return false;
        }
        return true;
    }
    function onSignUpButtonClick(e) {
        args.callBacks.signUpCallback(e);
        "android" == Titanium.Platform.osname && args.callBacks.enableHomeUpButtonCallback(e);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
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
    $.__views.loginParentView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "loginParentView"
    });
    $.__views.loginParentView && $.addTopLevelView($.__views.loginParentView);
    $.__views.carRentalImageView = Ti.UI.createImageView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 10,
        image: "/car_rantal_login_logo.png",
        id: "carRentalImageView"
    });
    $.__views.loginParentView.add($.__views.carRentalImageView);
    $.__views.loginFormContainer = Ti.UI.createView({
        left: 10,
        right: 10,
        height: Ti.UI.SIZE,
        layout: "vertical",
        top: 140,
        id: "loginFormContainer"
    });
    $.__views.loginParentView.add($.__views.loginFormContainer);
    $.__views.userNameTextField = Ti.UI.createTextField({
        width: "100%",
        height: 60,
        color: "black",
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        hintText: "User Name",
        maxLength: 40,
        id: "userNameTextField"
    });
    $.__views.loginFormContainer.add($.__views.userNameTextField);
    $.__views.passwordTextField = Ti.UI.createTextField({
        width: "100%",
        height: 60,
        color: "black",
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        top: 15,
        hintText: "Password",
        maxLength: 40,
        passwordMask: true,
        id: "passwordTextField"
    });
    $.__views.loginFormContainer.add($.__views.passwordTextField);
    $.__views.loginButton = Ti.UI.createButton({
        width: "100%",
        height: 40,
        color: "black",
        backgrountColor: "green",
        top: 10,
        title: "Login",
        id: "loginButton"
    });
    $.__views.loginFormContainer.add($.__views.loginButton);
    onSignInButtonClick ? $.__views.loginButton.addEventListener("click", onSignInButtonClick) : __defers["$.__views.loginButton!click!onSignInButtonClick"] = true;
    $.__views.signUpButton = Ti.UI.createButton({
        width: "100%",
        height: 40,
        color: "black",
        backgrountColor: "green",
        top: 10,
        title: "SignUp",
        id: "signUpButton"
    });
    $.__views.loginFormContainer.add($.__views.signUpButton);
    onSignUpButtonClick ? $.__views.signUpButton.addEventListener("click", onSignUpButtonClick) : __defers["$.__views.signUpButton!click!onSignUpButtonClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    require("utils");
    var _http = require("http");
    var _user = require("user");
    __defers["$.__views.loginButton!click!onSignInButtonClick"] && $.__views.loginButton.addEventListener("click", onSignInButtonClick);
    __defers["$.__views.signUpButton!click!onSignUpButtonClick"] && $.__views.signUpButton.addEventListener("click", onSignUpButtonClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;