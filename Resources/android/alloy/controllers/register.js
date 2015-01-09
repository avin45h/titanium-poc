function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function onSignUpButtonClick() {}
    function init() {
        var location = require("location");
        location.getCurrentAddress(function(e) {
            e.result && ($.locationTextField.text = e.address);
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
        top: 0,
        hintText: L("profile_name"),
        id: "profileNameTextField"
    });
    $.__views.signUpFormContainer.add($.__views.profileNameTextField);
    $.__views.userNameTextField = Ti.UI.createTextField({
        width: Ti.UI.FILL,
        height: Alloy.Globals.textFieldHeight,
        color: "#000",
        top: 10,
        hintText: L("user_name"),
        id: "userNameTextField"
    });
    $.__views.signUpFormContainer.add($.__views.userNameTextField);
    $.__views.phoneNumberTextField = Ti.UI.createTextField({
        width: Ti.UI.FILL,
        height: Alloy.Globals.textFieldHeight,
        color: "#000",
        top: 10,
        hintText: L("phone_number"),
        id: "phoneNumberTextField"
    });
    $.__views.signUpFormContainer.add($.__views.phoneNumberTextField);
    $.__views.emailIdTextField = Ti.UI.createTextField({
        width: Ti.UI.FILL,
        height: Alloy.Globals.textFieldHeight,
        color: "#000",
        top: 10,
        hintText: L("emailid"),
        id: "emailIdTextField"
    });
    $.__views.signUpFormContainer.add($.__views.emailIdTextField);
    $.__views.locationTextField = Ti.UI.createTextField({
        width: Ti.UI.FILL,
        height: Alloy.Globals.textFieldHeight,
        color: "#000",
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("utils");
    init();
    __defers["$.__views.signupButton!click!onSignUpButtonClick"] && $.__views.signupButton.addEventListener("click", onSignUpButtonClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;