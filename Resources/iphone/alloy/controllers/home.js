function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function onMapViewClick(evt) {
        evt.source;
        evt.clicksource;
        ("leftPane" == evt.clicksource || "leftButton" == evt.clicksource || "title" == evt.clicksource || "subtitle" == evt.clicksource) && openCabDetailsWindow(evt.annotation.index);
    }
    function onListViewItemClick(e) {
        openCabDetailsWindow(e.itemIndex);
    }
    function openCabDetailsWindow(index) {
        var details = Alloy.createController("cabDetails", {
            carDetails: _carData[index].carDetails
        }).getView();
        var activeTab = $.mainWin.getActiveTab();
        "cabsListTab" == activeTab.id ? $.cabsListTab.open(details) : "cabsMapTab" == activeTab.id && $.cabsMapTab.open(details);
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
                    height: 80,
                    selectedBackgroundColor: "blue",
                    touchEnabled: false
                },
                carDetails: {
                    _id: car._id,
                    carname: car.carname,
                    cartype: car.cartype,
                    vendornumber: car.vendornumber,
                    vendorsite: car.vendorsite,
                    longitude: car.longitude,
                    latitude: car.latitude,
                    bookstatus: car.bookstatus,
                    carimageurl: car.carimageurl
                }
            });
        });
        var cabListSection = Ti.UI.createListSection();
        cabListSection.setItems(_carData);
        $.cabListView.sections = [ cabListSection ];
    }
    function addAnotationToMap(carData) {
        Ti.API.info("addAnotationToMap****:" + JSON.stringify(carData));
        Ti.API.info("addAnotationToMapLength****:" + carData.length);
        _.each(carData, function(car) {
            var cabAnnotation = _tiMap.createAnnotation({
                leftButton: car.carimageurl,
                latitude: car.latitude,
                longitude: car.longitude,
                title: car.carname,
                pincolor: _tiMap.ANNOTATION_RED,
                _id: car._id,
                carDetails: {
                    _id: car._id,
                    carname: car.carname,
                    cartype: car.cartype,
                    vendornumber: car.vendornumber,
                    vendorsite: car.vendorsite,
                    longitude: car.longitude,
                    latitude: car.latitude,
                    bookstatus: car.bookstatus,
                    carimageurl: car.carimageurl
                }
            });
            cabAnnotation.index = cabAnnotations.length;
            cabAnnotations[cabAnnotations.length] = cabAnnotation;
        });
        $.mapview.annotations = cabAnnotations;
        Ti.API.info("mapview****:" + JSON.stringify($.mapview));
        Ti.API.info("cabAnnotations****:" + JSON.stringify(cabAnnotations));
    }
    function downloadCars() {
        _http.request({
            url: _url.cars,
            type: Alloy.Globals.HTTP_REQUEST_TYPE_GET,
            timeout: 6e4,
            format: Alloy.Globals.DATA_FORMAT_JSON,
            success: onHttpSuccess,
            failure: onHttpFailure
        });
    }
    function onHttpSuccess(e) {
        populateListView(e);
        addAnotationToMap(e);
        Ti.API.info("success Cars:********" + JSON.stringify(e));
    }
    function onHttpFailure(e) {
        Ti.API.info("failure Cars:********" + JSON.stringify(e));
        alert("Car's data loading failed.");
    }
    function init() {
        downloadCars();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "home";
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
    var __alloyId20 = [];
    $.__views.cabsInListWin = Ti.UI.createWindow({
        id: "cabsInListWin"
    });
    $.__views.__alloyId22 = Ti.UI.createView({
        backgroundColor: "#000000",
        height: "1px",
        width: "100%",
        id: "__alloyId22"
    });
    var __alloyId23 = {};
    var __alloyId26 = [];
    var __alloyId27 = {
        type: "Ti.UI.ImageView",
        bindId: "cabImage",
        properties: {
            width: 72,
            height: 72,
            left: 0,
            bindId: "cabImage"
        }
    };
    __alloyId26.push(__alloyId27);
    var __alloyId28 = {
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
    __alloyId26.push(__alloyId28);
    var __alloyId29 = {
        type: "Ti.UI.Label",
        bindId: "distance",
        properties: {
            color: "gray",
            font: {
                fontFamily: "Arial",
                fontSize: "14dp"
            },
            left: 120,
            bottom: 15,
            bindId: "distance"
        }
    };
    __alloyId26.push(__alloyId29);
    var __alloyId25 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId26
    };
    __alloyId23["template"] = __alloyId25;
    $.__views.cabListView = Ti.UI.createListView({
        templates: __alloyId23,
        footerView: $.__views.__alloyId22,
        id: "cabListView",
        defaultItemTemplate: "template",
        separatorColor: "black"
    });
    $.__views.cabsInListWin.add($.__views.cabListView);
    onListViewItemClick ? $.__views.cabListView.addEventListener("itemclick", onListViewItemClick) : __defers["$.__views.cabListView!itemclick!onListViewItemClick"] = true;
    $.__views.cabsListTab = Ti.UI.createTab({
        window: $.__views.cabsInListWin,
        id: "cabsListTab",
        title: "Cab List",
        icon: "KS_nav_views.png"
    });
    __alloyId20.push($.__views.cabsListTab);
    $.__views.cabsInMapWin = Ti.UI.createWindow({
        id: "cabsInMapWin"
    });
    $.__views.label2 = Ti.UI.createLabel({
        color: "#999",
        text: "I am Window 2",
        id: "label2"
    });
    $.__views.cabsInMapWin.add($.__views.label2);
    var __alloyId30 = [];
    $.__views.mapview = require("ti.map").createView({
        region: {
            latitude: 28.535516,
            longitude: 77.391026,
            latitudeDelta: .02,
            longitudeDelta: .02
        },
        animate: true,
        regionFit: true,
        userLocation: true,
        annotations: __alloyId30,
        id: "mapview"
    });
    $.__views.cabsInMapWin.add($.__views.mapview);
    onMapViewClick ? $.__views.mapview.addEventListener("click", onMapViewClick) : __defers["$.__views.mapview!click!onMapViewClick"] = true;
    $.__views.cabsMapTab = Ti.UI.createTab({
        window: $.__views.cabsInMapWin,
        id: "cabsMapTab",
        title: "Show on Map",
        icon: "KS_nav_views.png"
    });
    __alloyId20.push($.__views.cabsMapTab);
    $.__views.mainWin = Ti.UI.createTabGroup({
        tabs: __alloyId20,
        id: "mainWin",
        backgroundColor: "white"
    });
    $.__views.mainWin && $.addTopLevelView($.__views.mainWin);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var cabAnnotations = [];
    var _url = require("url");
    var _http = require("http");
    var _tiMap = require("ti.map");
    var _carData = [];
    init();
    __defers["$.__views.cabListView!itemclick!onListViewItemClick"] && $.__views.cabListView.addEventListener("itemclick", onListViewItemClick);
    __defers["$.__views.mapview!click!onMapViewClick"] && $.__views.mapview.addEventListener("click", onMapViewClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;