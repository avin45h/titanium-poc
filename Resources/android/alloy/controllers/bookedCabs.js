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
                cabType: {
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
    function onListViewItemClick(e) {
        openBookedCabDetailsWindow(e.itemIndex);
    }
    function openBookedCabDetailsWindow(index) {
        var details = Alloy.createController("bookedCabDetails", {
            carDetails: _carData[index].carDetails
        }).getView();
        details.open();
    }
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
        message: L("wait"),
        id: "progressIndicator"
    });
    $.__views.bookedCabsWin.add($.__views.progressIndicator);
    $.__views.bookedCabsWin.addEventListener("open", __alloyId0);
    $.__views.__alloyId2 = Ti.UI.createView({
        backgroundColor: "#000000",
        height: "1px",
        width: "100%",
        id: "__alloyId2"
    });
    var __alloyId3 = {};
    var __alloyId6 = [];
    var __alloyId7 = {
        type: "Ti.UI.ImageView",
        bindId: "cabImage",
        properties: {
            width: 72,
            height: 72,
            left: 0,
            bindId: "cabImage"
        }
    };
    __alloyId6.push(__alloyId7);
    var __alloyId8 = {
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
            top: 15,
            bindId: "cabName"
        }
    };
    __alloyId6.push(__alloyId8);
    var __alloyId9 = {
        type: "Ti.UI.Label",
        bindId: "cabType",
        properties: {
            color: "gray",
            font: {
                fontFamily: "Arial",
                fontSize: "14dp"
            },
            left: 120,
            bottom: 15,
            bindId: "cabType"
        }
    };
    __alloyId6.push(__alloyId9);
    var __alloyId5 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId6
    };
    __alloyId3["template"] = __alloyId5;
    $.__views.cabListView = Ti.UI.createListView({
        templates: __alloyId3,
        footerView: $.__views.__alloyId2,
        id: "cabListView",
        defaultItemTemplate: "template",
        separatorColor: "black"
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