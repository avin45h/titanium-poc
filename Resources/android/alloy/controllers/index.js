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
        registerView = Alloy.createController("register", {
            progressIndicator: $.progressIndicator
        }).getView();
        $.mainWin.add(registerView);
        $.mainWin.activity.actionBar.onHomeIconItemSelected = onHomeClick;
        $.mainWin.addEventListener("androidback", onAndroidBackButtonPressed);
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
    $.__views.mainWin = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "mainWin"
    });
    $.__views.mainWin && $.addTopLevelView($.__views.mainWin);
    $.__views.progressIndicator = Ti.UI.Android.createProgressIndicator({
        message: L("wait"),
        cancelable: false,
        id: "progressIndicator"
    });
    $.__views.mainWin.add($.__views.progressIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var registerView;
    var loginView;
    $.mainWin.orientationModes = [ Titanium.UI.PORTRAIT ];
    loginView = Alloy.createController("login", {
        progressIndicator: $.progressIndicator,
        callBacks: {
            signUpCallback: onSignUpButtonClick,
            enableHomeUpButtonCallback: enableHomeUpButton,
            hideHomeUpButtonCallBack: hideHomeUpButton
        }
    }).getView();
    $.mainWin.add(loginView);
    $.mainWin.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;