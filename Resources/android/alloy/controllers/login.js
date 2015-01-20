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
            setTimeout(function() {
                args.progressIndicator.hide();
                var homeController = Alloy.createController("home").getView();
                homeController.open();
            }, 1e3 * utils.getRandomNumber(2, 4));
        }
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
        args.callBacks.enableHomeUpButtonCallback(e);
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
        height: 60,
        color: "black",
        backgrountColor: "green",
        top: 20,
        title: "Login",
        id: "loginButton"
    });
    $.__views.loginFormContainer.add($.__views.loginButton);
    onSignInButtonClick ? $.__views.loginButton.addEventListener("click", onSignInButtonClick) : __defers["$.__views.loginButton!click!onSignInButtonClick"] = true;
    $.__views.signUpButton = Ti.UI.createButton({
        width: "100%",
        height: 60,
        color: "black",
        backgrountColor: "green",
        top: 50,
        title: "SignUp",
        id: "signUpButton"
    });
    $.__views.loginFormContainer.add($.__views.signUpButton);
    onSignUpButtonClick ? $.__views.signUpButton.addEventListener("click", onSignUpButtonClick) : __defers["$.__views.signUpButton!click!onSignUpButtonClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var utils = require("utils");
    __defers["$.__views.loginButton!click!onSignInButtonClick"] && $.__views.loginButton.addEventListener("click", onSignInButtonClick);
    __defers["$.__views.signUpButton!click!onSignUpButtonClick"] && $.__views.signUpButton.addEventListener("click", onSignUpButtonClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;