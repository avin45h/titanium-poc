function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function enableHomeUpButton() {
        setTimeout(function() {
            var actionBar = $.mainWin.activity.actionBar;
            actionBar.displayHomeAsUp = true;
            $.mainWin.activity.actionBar.onHomeIconItemSelected = onHomeClick;
        }, 1500);
    }
    function onBookClick() {
        bookCar();
    }
    function bookCar() {
        $.progressIndicator.show();
        Ti.API.info("userName*******:" + _user.getUserProfileProperty(Alloy.Globals.USER_NAME));
        _http.request({
            url: _url.cars + "/" + args.carDetails.carname + "/book",
            type: Alloy.Globals.HTTP_REQUEST_TYPE_POST,
            data: {
                username: _user.getUserProfileProperty(Alloy.Globals.USER_NAME)
            },
            timeout: 6e4,
            format: Alloy.Globals.DATA_FORMAT_JSON,
            success: onHttpCabBookSuccess,
            failure: onHttpCabBookFailure
        });
    }
    function onHttpCabBookSuccess(e) {
        $.progressIndicator.hide();
        Ti.API.info("success CarBook:********" + JSON.stringify(e));
        alert("Congratulations!\nYour cab has been booked successfully.");
    }
    function onHttpCabBookFailure(e) {
        $.progressIndicator.hide();
        Ti.API.info("failure CarBook:********" + JSON.stringify(e));
        alert("CarBook failed. Please try again.");
    }
    function initiateCall(e) {
        Titanium.Platform.openURL("tel:" + e.source.text);
    }
    function onHomeClick() {
        $.mainWin.close();
    }
    function init() {
        enableHomeUpButton();
        $.carImageView.image = args.carDetails.carimageurl;
        $.cabNameValueLabel.text = args.carDetails.carname;
        $.cabDistanceValueLabel.text = args.carDetails.cartype;
        $.driverNameValueLabel.text = args.carDetails.vendorsite;
        $.driverPhoneNumberValueLabel.text = args.carDetails.vendornumber;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "cabDetails";
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
    $.__views.progressIndicator = Ti.UI.Android.createProgressIndicator({
        id: "progressIndicator"
    });
    $.__views.mainWin.add($.__views.progressIndicator);
    $.__views.detailsParentView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        backgroundColor: "white",
        id: "detailsParentView"
    });
    $.__views.mainWin.add($.__views.detailsParentView);
    $.__views.carImageView = Ti.UI.createImageView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 20,
        id: "carImageView"
    });
    $.__views.detailsParentView.add($.__views.carImageView);
    $.__views.cabDetailContainer = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 20,
        layout: "vertical",
        id: "cabDetailContainer"
    });
    $.__views.detailsParentView.add($.__views.cabDetailContainer);
    $.__views.cabNameView = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 10,
        id: "cabNameView"
    });
    $.__views.cabDetailContainer.add($.__views.cabNameView);
    $.__views.cabNameLabel = Ti.UI.createLabel({
        color: "black",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        left: 0,
        text: L("cab_name"),
        id: "cabNameLabel"
    });
    $.__views.cabNameView.add($.__views.cabNameLabel);
    $.__views.cabNameValueLabel = Ti.UI.createLabel({
        color: "black",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        left: 10,
        id: "cabNameValueLabel"
    });
    $.__views.cabNameView.add($.__views.cabNameValueLabel);
    $.__views.cabDistanceView = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 10,
        id: "cabDistanceView"
    });
    $.__views.cabDetailContainer.add($.__views.cabDistanceView);
    $.__views.cabDistanceLabel = Ti.UI.createLabel({
        color: "black",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        left: 0,
        text: L("cab_distance"),
        id: "cabDistanceLabel"
    });
    $.__views.cabDistanceView.add($.__views.cabDistanceLabel);
    $.__views.cabDistanceValueLabel = Ti.UI.createLabel({
        color: "black",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        left: 10,
        id: "cabDistanceValueLabel"
    });
    $.__views.cabDistanceView.add($.__views.cabDistanceValueLabel);
    $.__views.driverNameView = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 10,
        id: "driverNameView"
    });
    $.__views.cabDetailContainer.add($.__views.driverNameView);
    $.__views.driverNameLabel = Ti.UI.createLabel({
        color: "black",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        left: 0,
        text: L("driver_name"),
        id: "driverNameLabel"
    });
    $.__views.driverNameView.add($.__views.driverNameLabel);
    $.__views.driverNameValueLabel = Ti.UI.createLabel({
        color: "black",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        left: 10,
        id: "driverNameValueLabel"
    });
    $.__views.driverNameView.add($.__views.driverNameValueLabel);
    $.__views.driverPhoneNumberView = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 10,
        id: "driverPhoneNumberView"
    });
    $.__views.cabDetailContainer.add($.__views.driverPhoneNumberView);
    $.__views.driverPhoneNumberLabel = Ti.UI.createLabel({
        color: "black",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        left: 0,
        text: L("driver_phone_number"),
        id: "driverPhoneNumberLabel"
    });
    $.__views.driverPhoneNumberView.add($.__views.driverPhoneNumberLabel);
    $.__views.driverPhoneNumberValueLabel = Ti.UI.createLabel({
        color: "black",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        left: 10,
        id: "driverPhoneNumberValueLabel"
    });
    $.__views.driverPhoneNumberView.add($.__views.driverPhoneNumberValueLabel);
    initiateCall ? $.__views.driverPhoneNumberValueLabel.addEventListener("click", initiateCall) : __defers["$.__views.driverPhoneNumberValueLabel!click!initiateCall"] = true;
    $.__views.bookButton = Ti.UI.createButton({
        top: 20,
        left: 0,
        right: 0,
        height: 60,
        title: L("book"),
        color: "white",
        id: "bookButton"
    });
    $.__views.cabDetailContainer.add($.__views.bookButton);
    onBookClick ? $.__views.bookButton.addEventListener("click", onBookClick) : __defers["$.__views.bookButton!click!onBookClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    Ti.API.info("args********:" + JSON.stringify(args));
    var _http = require("http");
    var _url = require("url");
    var _user = require("user");
    init();
    __defers["$.__views.driverPhoneNumberValueLabel!click!initiateCall"] && $.__views.driverPhoneNumberValueLabel.addEventListener("click", initiateCall);
    __defers["$.__views.bookButton!click!onBookClick"] && $.__views.bookButton.addEventListener("click", onBookClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;