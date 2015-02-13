function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function onBookClick() {
        loadSourceAndDestination();
        $.bookButton.visible = false;
    }
    function loadSourceAndDestination() {
        var cabBookInputView = Alloy.createController("cabBookInput", {
            progressIndicator: $.progressIndicator
        }).getView();
        $.cabBookingInputPageHolder.add(cabBookInputView);
    }
    function initiateCall() {
        Titanium.Platform.openURL("tel:" + _phoneNumber);
    }
    function init() {
        $.carImageView.image = args.carDetails.carimageurl;
        $.cabNameValueLabel.text = args.carDetails.carname;
        $.cabTypeValueLabel.text = args.carDetails.cartype;
        $.driverNameValueLabel.text = args.carDetails.vendorsite;
        _phoneNumber = args.carDetails.vendornumber;
        $.driverPhoneNumberValueLabel.text = _phoneNumber;
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
    $.__views.scrollView = Ti.UI.createScrollView({
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "true",
        height: "100%",
        width: "100%",
        id: "scrollView"
    });
    $.__views.mainWin.add($.__views.scrollView);
    $.__views.detailsParentView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        backgroundColor: "white",
        id: "detailsParentView"
    });
    $.__views.scrollView.add($.__views.detailsParentView);
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
        text: "Cab Name:",
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
    $.__views.cabTypeView = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 10,
        id: "cabTypeView"
    });
    $.__views.cabDetailContainer.add($.__views.cabTypeView);
    $.__views.cabTypeLabel = Ti.UI.createLabel({
        color: "black",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        left: 0,
        text: "Car Type:",
        id: "cabTypeLabel"
    });
    $.__views.cabTypeView.add($.__views.cabTypeLabel);
    $.__views.cabTypeValueLabel = Ti.UI.createLabel({
        color: "black",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        left: 10,
        id: "cabTypeValueLabel"
    });
    $.__views.cabTypeView.add($.__views.cabTypeValueLabel);
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
        text: "Driver Name:",
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
        text: "Driver Phone Number:",
        id: "driverPhoneNumberLabel"
    });
    $.__views.driverPhoneNumberView.add($.__views.driverPhoneNumberLabel);
    $.__views.driverPhoneNumberValueLabel = Ti.UI.createLabel({
        color: "blue",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        left: 10,
        html: "<html><u>9339873894</u></html>",
        id: "driverPhoneNumberValueLabel"
    });
    $.__views.driverPhoneNumberView.add($.__views.driverPhoneNumberValueLabel);
    initiateCall ? $.__views.driverPhoneNumberValueLabel.addEventListener("click", initiateCall) : __defers["$.__views.driverPhoneNumberValueLabel!click!initiateCall"] = true;
    $.__views.cabBookingInputPageHolder = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        borderColor: "white",
        id: "cabBookingInputPageHolder"
    });
    $.__views.cabDetailContainer.add($.__views.cabBookingInputPageHolder);
    $.__views.bookButton = Ti.UI.createButton({
        top: 20,
        left: 0,
        right: 0,
        height: 60,
        title: L("book"),
        id: "bookButton"
    });
    $.__views.cabDetailContainer.add($.__views.bookButton);
    onBookClick ? $.__views.bookButton.addEventListener("click", onBookClick) : __defers["$.__views.bookButton!click!onBookClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    Ti.API.info("args********:" + JSON.stringify(args));
    require("http");
    require("url");
    require("user");
    require("utils");
    var _phoneNumber;
    init();
    __defers["$.__views.driverPhoneNumberValueLabel!click!initiateCall"] && $.__views.driverPhoneNumberValueLabel.addEventListener("click", initiateCall);
    __defers["$.__views.bookButton!click!onBookClick"] && $.__views.bookButton.addEventListener("click", onBookClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;