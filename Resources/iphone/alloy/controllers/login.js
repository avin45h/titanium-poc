function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function onSignInButtonClick() {}
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
    __defers["$.__views.loginButton!click!onSignInButtonClick"] && $.__views.loginButton.addEventListener("click", onSignInButtonClick);
    __defers["$.__views.signUpButton!click!onSignUpButtonClick"] && $.__views.signUpButton.addEventListener("click", onSignUpButtonClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;