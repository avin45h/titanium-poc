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
        Ti.API.info("Annotation " + JSON.stringify(evt));
        evt.source;
        evt.clicksource;
        alert("********000****" + evt.clicksource == "leftButton********DDDD****");
        Ti.API.info("********000****" + evt.clicksource == "leftButton********DDDD****");
        Ti.API.info("********evt.clicksource***" + evt.clicksource);
        if ("leftPane" == evt.clicksource || "leftButton" == evt.clicksource || "title" == evt.clicksource || "subtitle" == evt.clicksource) {
            Ti.API.info("********evt.clicksourceEE***" + evt.clicksource);
            openCabDetailsWindow(evt.annotation.index);
        }
    }
    function onListViewItemClick(e) {
        openCabDetailsWindow(e.itemIndex);
    }
    function openCabDetailsWindow(index) {
        Ti.API.info("********index***" + index);
        var details = Alloy.createController("cabDetails", {
            cabDetails: cabData.cabs[index]
        }).getView();
        var activeTab = $.mainWin.getActiveTab();
        if ("cabsListTab" == activeTab.id) {
            Ti.API.info("********indexXX***" + index);
            $.cabsListTab.open(details);
        } else if ("cabsMapTab" == activeTab.id) {
            Ti.API.info("********indexEEE***" + index);
            $.cabsMapTab.open(details);
        }
    }
    function populateListView() {
        var cabDataSet = [];
        _.each(cabData.cabs, function(cab) {
            cabDataSet.push({
                cabName: {
                    text: cab.cabName
                },
                distance: {
                    text: cab.distance
                },
                cabImage: {
                    image: cab.cabImage
                },
                properties: {
                    itemId: cab.cabId,
                    accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
                }
            });
        });
        var cabListSection = Ti.UI.createListSection();
        cabListSection.setItems(cabDataSet);
        $.cabListView.sections = [ cabListSection ];
    }
    function addAnotationToMap() {
        _.each(cabData.cabs, function(cab) {
            var cabAnnotation = tiMap.createAnnotation({
                leftButton: cab.cabImage,
                latitude: cab.latitude,
                longitude: cab.longitude,
                title: cab.cabName,
                subtitle: cab.distance,
                pincolor: tiMap.ANNOTATION_RED,
                cabId: cab.cabId
            });
            cabAnnotation.index = cabAnnotations.length;
            cabAnnotations[cabAnnotations.length] = cabAnnotation;
        });
        $.mapview.annotations = cabAnnotations;
    }
    function init() {
        populateListView();
        tiMap = require("ti.map");
        addAnotationToMap();
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
    var __alloyId0 = [];
    $.__views.cabsInListWin = Ti.UI.createWindow({
        id: "cabsInListWin"
    });
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
    $.__views.cabsInListWin.add($.__views.cabListView);
    onListViewItemClick ? $.__views.cabListView.addEventListener("itemclick", onListViewItemClick) : __defers["$.__views.cabListView!itemclick!onListViewItemClick"] = true;
    $.__views.cabsListTab = Ti.UI.createTab({
        window: $.__views.cabsInListWin,
        id: "cabsListTab",
        title: "Cab List",
        icon: "KS_nav_views.png"
    });
    __alloyId0.push($.__views.cabsListTab);
    $.__views.cabsInMapWin = Ti.UI.createWindow({
        id: "cabsInMapWin"
    });
    $.__views.label2 = Ti.UI.createLabel({
        text: "I am Window 2",
        id: "label2",
        color: "#999"
    });
    $.__views.cabsInMapWin.add($.__views.label2);
    var __alloyId8 = [];
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
        annotations: __alloyId8,
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
    __alloyId0.push($.__views.cabsMapTab);
    $.__views.mainWin = Ti.UI.createTabGroup({
        tabs: __alloyId0,
        id: "mainWin",
        backgroundColor: "white"
    });
    $.__views.mainWin && $.addTopLevelView($.__views.mainWin);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var tiMap;
    var cabAnnotations = [];
    var cabData = {
        cabs: [ {
            cabId: "1",
            cabName: "Maruti Suzuki",
            cabNumber: "DL A 1234",
            cabImage: "http://static.ibnlive.in.com/ibnlive/pix/sitepix/08_2011/new-maruti-suzuki-swift-170811.jpg",
            cabDriverId: "1",
            cabDriverName: "Surender",
            cabDriverMobile: "1234567890",
            latitude: "28.535516",
            longitude: "77.391026",
            distance: "5.0 km"
        }, {
            cabId: "2",
            cabName: "Maruti VAN",
            cabNumber: "DL B 1234",
            cabImage: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcReJDxGOr9Ic2b_rzYR6ygW25BaRKnCCOdVuKOTgfqmHxE6I1-ytg",
            cabDriverId: "1",
            cabDriverName: "Rajender",
            cabDriverMobile: "1234567890",
            latitude: "28.537692",
            longitude: "77.396010",
            distance: "10.0 km"
        }, {
            cabId: "3",
            cabName: "Honda City",
            cabNumber: "DL C 1234",
            cabImage: "http://indianautosblog.com/wp-content/uploads/2014/03/2014-Honda-City-at-Bangkok-Motor-Show-front-quarter-50x50.jpg",
            cabDriverId: "1",
            cabDriverName: "Rajesh",
            cabDriverMobile: "1234567890",
            latitude: "28.542464",
            longitude: "77.388275",
            distance: "3.0 km"
        } ]
    };
    init();
    __defers["$.__views.cabListView!itemclick!onListViewItemClick"] && $.__views.cabListView.addEventListener("itemclick", onListViewItemClick);
    __defers["$.__views.mapview!click!onMapViewClick"] && $.__views.mapview.addEventListener("click", onMapViewClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;