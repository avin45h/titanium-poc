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
        registerView = Alloy.createController("register").getView();
        if ("iphone" == Titanium.Platform.osname) {
            var win = Ti.UI.createWindow();
            win.add(registerView);
            $.navWin.openWindow(win);
        } else if ("android" == Titanium.Platform.osname) {
            $.mainWin.add(registerView);
            $.mainWin.activity.actionBar.onHomeIconItemSelected = onHomeClick;
            $.mainWin.addEventListener("androidback", onAndroidBackButtonPressed);
        }
    }
    function enableHomeUpButton() {
        var actionBar = $.mainWin.activity.actionBar;
        actionBar.displayHomeAsUp = true;
    }
    function hideHomeUpButton() {
        var actionBar = $.mainWin.activity.actionBar;
        actionBar.displayHomeAsUp = false;
    }
    function onHomeClick(e) {
        $.mainWin.remove(registerView);
        $.mainWin.add(loginView);
        $.mainWin.removeEventListener("androidback", onAndroidBackButtonPressed);
        hideHomeUpButton(e);
    }
    function onAndroidBackButtonPressed(e) {
        e.cancelBubble = true;
        e.bubble = false;
        onHomeClick();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    $.__views.navRootWin = Ti.UI.createWindow({
        id: "navRootWin",
        title: "Login",
        backgroundColor: "white"
    });
    $.__views.navWin = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.navRootWin,
        id: "navWin"
    });
    $.__views.navWin && $.addTopLevelView($.__views.navWin);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var registerView;
    var loginView;
    loginView = Alloy.createController("login", {
        callBacks: {
            signUpCallback: onSignUpButtonClick,
            enableHomeUpButtonCallback: enableHomeUpButton,
            hideHomeUpButtonCallBack: hideHomeUpButton
        }
    }).getView();
    if ("iphone" == Titanium.Platform.osname) {
        $.navRootWin.add(loginView);
        $.navWin.open();
    } else {
        $.mainWin.add(loginView);
        $.mainWin.open();
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;