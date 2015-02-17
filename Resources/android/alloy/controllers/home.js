function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId50() {
        $.__views.mainWin.removeEventListener("open", __alloyId50);
        if ($.__views.mainWin.activity) $.__views.mainWin.activity.onCreateOptionsMenu = function(e) {
            var __alloyId47 = {
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
                title: "Book Now",
                id: "bookNow"
            };
            $.__views.bookNow = e.menu.add(_.pick(__alloyId47, Alloy.Android.menuItemCreateArgs));
            $.__views.bookNow.applyProperties(_.omit(__alloyId47, Alloy.Android.menuItemCreateArgs));
            onBookNowClick ? $.__views.bookNow.addEventListener("click", onBookNowClick) : __defers["$.__views.bookNow!click!onBookNowClick"] = true;
            var __alloyId48 = {
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
                title: "Booked Cabs",
                id: "bookedCabs"
            };
            $.__views.bookedCabs = e.menu.add(_.pick(__alloyId48, Alloy.Android.menuItemCreateArgs));
            $.__views.bookedCabs.applyProperties(_.omit(__alloyId48, Alloy.Android.menuItemCreateArgs));
            onBookedCabsClick ? $.__views.bookedCabs.addEventListener("click", onBookedCabsClick) : __defers["$.__views.bookedCabs!click!onBookedCabsClick"] = true;
            var __alloyId49 = {
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
                title: "User Profile",
                id: "userProfile"
            };
            $.__views.userProfile = e.menu.add(_.pick(__alloyId49, Alloy.Android.menuItemCreateArgs));
            $.__views.userProfile.applyProperties(_.omit(__alloyId49, Alloy.Android.menuItemCreateArgs));
            onUserProfileClick ? $.__views.userProfile.addEventListener("click", onUserProfileClick) : __defers["$.__views.userProfile!click!onUserProfileClick"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    function onMapViewClick(evt) {
        evt.source;
        evt.clicksource;
        ("leftPane" == evt.clicksource || "leftButton" == evt.clicksource || "title" == evt.clicksource || "subtitle" == evt.clicksource) && openCabDetailsWindow(evt.annotation.index);
    }
    function onListViewItemClick(e) {
        openCabDetailsWindow(e.itemIndex);
    }
    function onUserProfileClick() {
        var details = Alloy.createController("userProfile").getView();
        details.open();
    }
    function onBookedCabsClick() {
        var details = Alloy.createController("bookedCabs").getView();
        details.open();
    }
    function onBookNowClick() {
        Ti.API.info("onBookNowClick********");
        var cabBookInputView = Alloy.createController("bookNow").getView();
        cabBookInputView.open();
    }
    function openCabDetailsWindow(index) {
        var details = Alloy.createController("cabDetails", {
            carDetails: _carData[index].carDetails,
            from: "home"
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
                    height: Ti.UI.SIZE,
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
        Ti.API.info("cabAnnotations****:" + JSON.stringify(cabAnnotations));
    }
    function downloadCars() {
        $.progressIndicator.show();
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
        $.progressIndicator.hide();
        Ti.API.info("success Cars:********" + JSON.stringify(e));
    }
    function onHttpFailure(e) {
        $.progressIndicator.hide();
        Ti.API.info("failure Cars:********" + JSON.stringify(e));
        alert("Car's data loading failed.");
    }
    function onPostLayout() {
        if (!_isPostlayoutCalled) {
            downloadCars();
            _isPostlayoutCalled = true;
        }
    }
    function init() {
        $.mainWin.orientationModes = [ Titanium.UI.PORTRAIT ];
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
    var __alloyId33 = [];
    $.__views.cabsInListWin = Ti.UI.createWindow({
        id: "cabsInListWin"
    });
    $.__views.progressIndicator = Ti.UI.Android.createProgressIndicator({
        message: L("wait"),
        cancelable: false,
        id: "progressIndicator"
    });
    $.__views.cabsInListWin.add($.__views.progressIndicator);
    $.__views.__alloyId35 = Ti.UI.createView({
        backgroundColor: "#000000",
        height: "1dp",
        width: "100%",
        id: "__alloyId35"
    });
    $.__views.__alloyId37 = Ti.UI.createView({
        backgroundColor: "#000000",
        height: "1dp",
        width: "100%",
        id: "__alloyId37"
    });
    var __alloyId38 = {};
    var __alloyId41 = [];
    var __alloyId42 = {
        type: "Ti.UI.ImageView",
        bindId: "cabImage",
        properties: {
            width: 72,
            height: 72,
            left: 0,
            bindId: "cabImage"
        }
    };
    __alloyId41.push(__alloyId42);
    var __alloyId43 = {
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
    __alloyId41.push(__alloyId43);
    var __alloyId44 = {
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
    __alloyId41.push(__alloyId44);
    var __alloyId40 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId41
    };
    __alloyId38["template"] = __alloyId40;
    $.__views.cabListView = Ti.UI.createListView({
        templates: __alloyId38,
        headerView: $.__views.__alloyId35,
        footerView: $.__views.__alloyId37,
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
    __alloyId33.push($.__views.cabsListTab);
    $.__views.cabsInMapWin = Ti.UI.createWindow({
        id: "cabsInMapWin"
    });
    var __alloyId45 = [];
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
        annotations: __alloyId45,
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
    __alloyId33.push($.__views.cabsMapTab);
    $.__views.mainWin = Ti.UI.createTabGroup({
        tabs: __alloyId33,
        id: "mainWin",
        backgroundColor: "white"
    });
    $.__views.mainWin.addEventListener("open", __alloyId50);
    $.__views.mainWin && $.addTopLevelView($.__views.mainWin);
    onPostLayout ? $.__views.mainWin.addEventListener("postlayout", onPostLayout) : __defers["$.__views.mainWin!postlayout!onPostLayout"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var cabAnnotations = [];
    var _url = require("url");
    var _http = require("http");
    var _tiMap = require("ti.map");
    var _carData = [];
    var _isPostlayoutCalled = false;
    init();
    __defers["$.__views.cabListView!itemclick!onListViewItemClick"] && $.__views.cabListView.addEventListener("itemclick", onListViewItemClick);
    __defers["$.__views.mapview!click!onMapViewClick"] && $.__views.mapview.addEventListener("click", onMapViewClick);
    __defers["$.__views.bookNow!click!onBookNowClick"] && $.__views.bookNow.addEventListener("click", onBookNowClick);
    __defers["$.__views.bookedCabs!click!onBookedCabsClick"] && $.__views.bookedCabs.addEventListener("click", onBookedCabsClick);
    __defers["$.__views.userProfile!click!onUserProfileClick"] && $.__views.userProfile.addEventListener("click", onUserProfileClick);
    __defers["$.__views.mainWin!postlayout!onPostLayout"] && $.__views.mainWin.addEventListener("postlayout", onPostLayout);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;