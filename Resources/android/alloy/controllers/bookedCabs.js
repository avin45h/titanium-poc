function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId0() {
        $.__views.bookedCabsWin.removeEventListener("open", __alloyId0);
        if ($.__views.bookedCabsWin.activity) {
            $.__views.bookedCabsWin.activity.actionBar.backgroundImage = "/actionbackground.png";
            $.__views.bookedCabsWin.activity.actionBar.displayHomeAsUp = true;
            $.__views.bookedCabsWin.activity.actionBar.icon = "/actionicon.png";
            $.__views.bookedCabsWin.activity.actionBar.onHomeIconItemSelected = onHomeIconItemSelected;
        } else {
            Ti.API.warn("You attempted to access an Activity on a lightweight Window or other");
            Ti.API.warn("UI component which does not have an Android activity. Android Activities");
            Ti.API.warn("are valid with only windows in TabGroups or heavyweight Windows.");
        }
    }
    function populateListView(carData) {
        _.each(carData, function(car) {
            _carData.push({
                cabName: {
                    text: car.carname
                },
                distance: {
                    text: car.cartype
                },
                cabImage: {
                    image: car.carimageurl
                },
                properties: {
                    accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE,
                    height: Ti.UI.SIZE,
                    selectedBackgroundColor: "blue",
                    touchEnabled: false
                },
                carDetails: {
                    _id: car._id,
                    createdAt: car.createdAt,
                    updatedAt: car.updatedAt,
                    carname: car.carname,
                    carimageurl: car.carimageurl,
                    cartype: car.cartype,
                    vendornumber: car.vendornumber,
                    vendorsite: car.vendorsite,
                    longitude: car.longitude,
                    latitude: car.latitude,
                    __v: car.__v,
                    userId: car.userId,
                    bookstatus: car.bookstatus
                }
            });
        });
        var cabListSection = Ti.UI.createListSection();
        cabListSection.setItems(_carData);
        $.cabListView.sections = [ cabListSection ];
    }
    function downloadCars() {
        $.progressIndicator.show();
        _http.request({
            url: _url.base + "user/" + _user.getUserProfileProperty(Alloy.Globals.USER_NAME) + "/bookings",
            type: Alloy.Globals.HTTP_REQUEST_TYPE_GET,
            timeout: 6e4,
            format: Alloy.Globals.DATA_FORMAT_JSON,
            success: onHttpSuccess,
            failure: onHttpFailure
        });
    }
    function onHttpSuccess(e) {
        populateListView(e);
        $.progressIndicator.hide();
        Ti.API.info("success Cars:********" + JSON.stringify(e));
    }
    function onHttpFailure(e) {
        $.progressIndicator.hide();
        Ti.API.info("failure Cars:********" + JSON.stringify(e));
        alert("Car's data loading failed.");
    }
    function onListViewItemClick() {}
    function onHomeIconItemSelected() {
        $.progressIndicator.hide();
        $.bookedCabsWin.close();
    }
    function init() {
        $.bookedCabsWin.orientationModes = [ Titanium.UI.PORTRAIT ];
        downloadCars();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "bookedCabs";
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
    $.__views.bookedCabsWin = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "bookedCabsWin"
    });
    $.__views.bookedCabsWin && $.addTopLevelView($.__views.bookedCabsWin);
    $.__views.progressIndicator = Ti.UI.Android.createProgressIndicator({
        id: "progressIndicator"
    });
    $.__views.bookedCabsWin.add($.__views.progressIndicator);
    $.__views.bookedCabsWin.addEventListener("open", __alloyId0);
    var __alloyId1 = {};
    var __alloyId4 = [];
    var __alloyId5 = {
        type: "Ti.UI.ImageView",
        bindId: "cabImage",
        properties: {
            top: 10,
            width: 100,
            height: 60,
            left: 10,
            bottom: 10,
            bindId: "cabImage"
        }
    };
    __alloyId4.push(__alloyId5);
    var __alloyId6 = {
        type: "Ti.UI.Label",
        bindId: "cabName",
        properties: {
            color: "black",
            font: {
                fontFamily: "Arial",
                fontSize: "20dp",
                fontWeight: "bold"
            },
            left: 120,
            top: 20,
            bindId: "cabName"
        }
    };
    __alloyId4.push(__alloyId6);
    var __alloyId7 = {
        type: "Ti.UI.Label",
        bindId: "distance",
        properties: {
            color: "gray",
            font: {
                fontFamily: "Arial",
                fontSize: "14dp"
            },
            left: 120,
            bottom: 20,
            bindId: "distance"
        }
    };
    __alloyId4.push(__alloyId7);
    var __alloyId3 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId4
    };
    __alloyId1["template"] = __alloyId3;
    $.__views.cabListView = Ti.UI.createListView({
        templates: __alloyId1,
        id: "cabListView",
        defaultItemTemplate: "template"
    });
    $.__views.bookedCabsWin.add($.__views.cabListView);
    onListViewItemClick ? $.__views.cabListView.addEventListener("itemclick", onListViewItemClick) : __defers["$.__views.cabListView!itemclick!onListViewItemClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var _url = require("url");
    var _http = require("http");
    var _user = require("user");
    var _carData = [];
    init();
    __defers["$.__views.cabListView!itemclick!onListViewItemClick"] && $.__views.cabListView.addEventListener("itemclick", onListViewItemClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;