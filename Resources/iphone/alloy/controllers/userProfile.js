function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function initiateCall(e) {
        Titanium.Platform.openURL("tel:" + e.source.text);
    }
    function initiateCall(e) {
        Titanium.Platform.openURL("tel:" + e.source.text);
    }
    function init() {
        $.userImageView.image = "http://i1.wp.com/www.techrepublic.com/bundles/techrepubliccore/images/icons/standard/icon-user-default.png";
        $.userNameValueLabel.text = _user.getUserProfileProperty(Alloy.Globals.USER_NAME);
        $.userEmailValueLabel.text = _user.getUserProfileProperty(Alloy.Globals.USER_EMAIL);
        $.userProfileNameValueLabel.text = _user.getUserProfileProperty(Alloy.Globals.USER_PROFILE_NAME);
        $.userPhoneNumberValueLabel.text = _user.getUserProfileProperty(Alloy.Globals.USER_PHONE_NUMBER);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "userProfile";
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
    $.__views.mainWin = Ti.UI.createWindow({
        id: "mainWin"
    });
    $.__views.mainWin && $.addTopLevelView($.__views.mainWin);
    $.__views.detailsParentView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        backgroundColor: "white",
        id: "detailsParentView"
    });
    $.__views.mainWin.add($.__views.detailsParentView);
    $.__views.userImageView = Ti.UI.createImageView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 20,
        id: "userImageView"
    });
    $.__views.detailsParentView.add($.__views.userImageView);
    $.__views.userProfileContainer = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 20,
        layout: "vertical",
        id: "userProfileContainer"
    });
    $.__views.detailsParentView.add($.__views.userProfileContainer);
    $.__views.userNameView = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 10,
        id: "userNameView"
    });
    $.__views.userProfileContainer.add($.__views.userNameView);
    $.__views.userNameLabel = Ti.UI.createLabel({
        color: "black",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        left: 0,
        text: L("user_name"),
        id: "userNameLabel"
    });
    $.__views.userNameView.add($.__views.userNameLabel);
    $.__views.__alloyId32 = Ti.UI.createLabel({
        color: "black",
        text: ":",
        id: "__alloyId32"
    });
    $.__views.userNameView.add($.__views.__alloyId32);
    $.__views.userNameValueLabel = Ti.UI.createLabel({
        color: "black",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        left: 10,
        id: "userNameValueLabel"
    });
    $.__views.userNameView.add($.__views.userNameValueLabel);
    $.__views.userEmailView = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 10,
        id: "userEmailView"
    });
    $.__views.userProfileContainer.add($.__views.userEmailView);
    $.__views.userEmailLabel = Ti.UI.createLabel({
        color: "black",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        left: 0,
        text: L("emailid"),
        id: "userEmailLabel"
    });
    $.__views.userEmailView.add($.__views.userEmailLabel);
    $.__views.__alloyId33 = Ti.UI.createLabel({
        color: "black",
        text: ":",
        id: "__alloyId33"
    });
    $.__views.userEmailView.add($.__views.__alloyId33);
    $.__views.userEmailValueLabel = Ti.UI.createLabel({
        color: "black",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        left: 10,
        id: "userEmailValueLabel"
    });
    $.__views.userEmailView.add($.__views.userEmailValueLabel);
    $.__views.userProfileNameView = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 10,
        id: "userProfileNameView"
    });
    $.__views.userProfileContainer.add($.__views.userProfileNameView);
    $.__views.userProfileNameLabel = Ti.UI.createLabel({
        color: "black",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        left: 0,
        text: L("profile_name"),
        id: "userProfileNameLabel"
    });
    $.__views.userProfileNameView.add($.__views.userProfileNameLabel);
    $.__views.__alloyId34 = Ti.UI.createLabel({
        color: "black",
        text: ":",
        id: "__alloyId34"
    });
    $.__views.userProfileNameView.add($.__views.__alloyId34);
    $.__views.userProfileNameValueLabel = Ti.UI.createLabel({
        color: "black",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        left: 10,
        id: "userProfileNameValueLabel"
    });
    $.__views.userProfileNameView.add($.__views.userProfileNameValueLabel);
    $.__views.userPhoneNumberView = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 10,
        id: "userPhoneNumberView"
    });
    $.__views.userProfileContainer.add($.__views.userPhoneNumberView);
    $.__views.userPhoneNumberLabel = Ti.UI.createLabel({
        color: "black",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        left: 0,
        text: L("phone_number"),
        id: "userPhoneNumberLabel"
    });
    $.__views.userPhoneNumberView.add($.__views.userPhoneNumberLabel);
    $.__views.__alloyId35 = Ti.UI.createLabel({
        color: "black",
        text: ":",
        id: "__alloyId35"
    });
    $.__views.userPhoneNumberView.add($.__views.__alloyId35);
    $.__views.userPhoneNumberValueLabel = Ti.UI.createLabel({
        color: "black",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        left: 10,
        id: "userPhoneNumberValueLabel"
    });
    $.__views.userPhoneNumberView.add($.__views.userPhoneNumberValueLabel);
    initiateCall ? $.__views.userPhoneNumberValueLabel.addEventListener("click", initiateCall) : __defers["$.__views.userPhoneNumberValueLabel!click!initiateCall"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    require("http");
    require("url");
    var _user = require("user");
    init();
    __defers["$.__views.userPhoneNumberValueLabel!click!initiateCall"] && $.__views.userPhoneNumberValueLabel.addEventListener("click", initiateCall);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;