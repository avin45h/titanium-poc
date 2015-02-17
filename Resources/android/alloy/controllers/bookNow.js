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
        $.__views.bookNowWin.removeEventListener("open", __alloyId0);
        if ($.__views.bookNowWin.activity) {
            $.__views.bookNowWin.activity.actionBar.displayHomeAsUp = true;
            $.__views.bookNowWin.activity.actionBar.homeButtonEnabled = true;
            $.__views.bookNowWin.activity.actionBar.onHomeIconItemSelected = onHomeIconItemSelected;
        } else {
            Ti.API.warn("You attempted to access an Activity on a lightweight Window or other");
            Ti.API.warn("UI component which does not have an Android activity. Android Activities");
            Ti.API.warn("are valid with only windows in TabGroups or heavyweight Windows.");
        }
    }
    function loadData() {
        $.progressBar.show();
        _http.request({
            url: _url.coverage,
            type: Alloy.Globals.HTTP_REQUEST_TYPE_GET,
            timeout: 3e4,
            format: Alloy.Globals.DATA_FORMAT_JSON,
            success: onHttpSuccess,
            failure: onHttpFailure
        });
    }
    function onHttpSuccess(responseText) {
        populatePickers(responseText);
        $.progressBar.hide();
        Ti.API.info("success:********" + JSON.stringify(responseText));
        $.searchButton.visible = true;
    }
    function onHttpFailure(e) {
        $.progressBar.hide();
        Ti.API.info("failure:********" + JSON.stringify(e));
        alert("Request faild. Please try again.");
    }
    function populateAvailableCabsListView(carData) {
        _carData.length = 0;
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
                    width: Ti.UI.FILL,
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
        $.availableCabsListView.sections = [ cabListSection ];
        $.availableCabsListView.visible = true;
    }
    function populatePickers(coverageAreas) {
        var rowData = [];
        _.each(coverageAreas, function(area) {
            _coverageAreas.push(area);
            var row = Ti.UI.createPickerRow({
                title: area,
                id: rowData.length
            });
            rowData.push(row);
        });
        $.sourcePicker.add(rowData);
        $.destinationPicker.add(rowData);
        if (rowData.length > 1) {
            $.sourcePicker.setSelectedRow(0, 1, false);
            $.sourcePicker.setSelectedRow(0, 0, false);
            $.destinationPicker.setSelectedRow(0, 1, false);
            $.destinationPicker.setSelectedRow(0, 0, false);
        }
        Ti.API.info("_coverageAreas:********" + JSON.stringify(_coverageAreas));
    }
    function onSearchClick() {
        loadAvailableCabsList();
    }
    function loadAvailableCabsList() {
        $.progressBar.show();
        _http.request({
            url: _url.availableCars,
            type: Alloy.Globals.HTTP_REQUEST_TYPE_POST,
            data: {
                from: _source,
                to: _destination
            },
            timeout: 6e4,
            format: Alloy.Globals.DATA_FORMAT_JSON,
            success: onHttpCabsListSuccess,
            failure: onHttpCabsListFailure
        });
    }
    function onHttpCabsListSuccess(cabsList) {
        $.progressBar.hide();
        cabsList.length > 0 ? populateAvailableCabsListView(cabsList) : alert("No cab availabe from " + _source + " to " + _destination);
        Ti.API.info("success CabsList:********" + JSON.stringify(cabsList));
    }
    function onHttpCabsListFailure(e) {
        $.progressBar.hide();
        Ti.API.info("failure CabsList:********" + JSON.stringify(e));
        alert("Request failed. Please try again.");
    }
    function pickerValueChangedListener(e) {
        if ("sourcePicker" === e.source.id) {
            _source = $.sourcePicker.getSelectedRow(0).title;
            Ti.API.info("source******: " + $.sourcePicker.getSelectedRow(0).title);
        } else {
            _destination = $.destinationPicker.getSelectedRow(0).title;
            Ti.API.info("destinationPicker******: " + $.destinationPicker.getSelectedRow(0).title);
        }
    }
    function onListViewItemClick(e) {
        Ti.API.info("onListViewItemClick BookNow **********");
        openCabDetailsWindow(e.itemIndex);
    }
    function openCabDetailsWindow(index) {
        var details = Alloy.createController("cabDetails", {
            carDetails: _carData[index].carDetails,
            closeWindowCallback: closeWindow,
            from: "bookNow",
            source: _source,
            destination: _destination
        }).getView();
        details.open();
    }
    function onHomeIconItemSelected() {
        $.progressBar.hide();
        closeWindow();
    }
    function closeWindow() {
        $.bookNowWin.close();
    }
    function winPostlayout() {
        if (!_isPostlayoutCalled) {
            $.progressBar.show();
            loadData();
            _isPostlayoutCalled = true;
        }
        Ti.API.info("PostLalyout : window called ********");
    }
    function init() {
        $.bookNowWin.orientationModes = [ Titanium.UI.PORTRAIT ];
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "bookNow";
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
    $.__views.bookNowWin = Ti.UI.createWindow({
        id: "bookNowWin"
    });
    $.__views.bookNowWin && $.addTopLevelView($.__views.bookNowWin);
    winPostlayout ? $.__views.bookNowWin.addEventListener("postlayout", winPostlayout) : __defers["$.__views.bookNowWin!postlayout!winPostlayout"] = true;
    $.__views.bookNowWin.addEventListener("open", __alloyId0);
    $.__views.progressBar = Ti.UI.Android.createProgressIndicator({
        message: "Please Wait...",
        id: "progressBar"
    });
    $.__views.bookNowWin.add($.__views.progressBar);
    $.__views.cabBookInputParentView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        backgroundColor: "white",
        id: "cabBookInputParentView"
    });
    $.__views.bookNowWin.add($.__views.cabBookInputParentView);
    $.__views.cabBookInputContainer = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 20,
        layout: "vertical",
        id: "cabBookInputContainer"
    });
    $.__views.cabBookInputParentView.add($.__views.cabBookInputContainer);
    $.__views.cabSourceView = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 10,
        id: "cabSourceView"
    });
    $.__views.cabBookInputContainer.add($.__views.cabSourceView);
    $.__views.cabSourceLabel = Ti.UI.createLabel({
        color: "black",
        width: 85,
        text: "Source:",
        id: "cabSourceLabel"
    });
    $.__views.cabSourceView.add($.__views.cabSourceLabel);
    $.__views.sourcePicker = Ti.UI.createPicker({
        color: "black",
        id: "sourcePicker",
        selectionIndicator: "true",
        useSpinner: "false"
    });
    $.__views.cabSourceView.add($.__views.sourcePicker);
    pickerValueChangedListener ? $.__views.sourcePicker.addEventListener("change", pickerValueChangedListener) : __defers["$.__views.sourcePicker!change!pickerValueChangedListener"] = true;
    $.__views.cabDestinationView = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 10,
        layout: "horizontal",
        id: "cabDestinationView"
    });
    $.__views.cabBookInputContainer.add($.__views.cabDestinationView);
    $.__views.cabDestinationLabel = Ti.UI.createLabel({
        color: "black",
        width: 85,
        text: "Destination:",
        id: "cabDestinationLabel"
    });
    $.__views.cabDestinationView.add($.__views.cabDestinationLabel);
    $.__views.destinationPicker = Ti.UI.createPicker({
        color: "black",
        useSpinner: "false",
        id: "destinationPicker"
    });
    $.__views.cabDestinationView.add($.__views.destinationPicker);
    pickerValueChangedListener ? $.__views.destinationPicker.addEventListener("change", pickerValueChangedListener) : __defers["$.__views.destinationPicker!change!pickerValueChangedListener"] = true;
    $.__views.searchButton = Ti.UI.createButton({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 10,
        title: "Search Cabs",
        visible: true,
        id: "searchButton"
    });
    $.__views.cabBookInputContainer.add($.__views.searchButton);
    onSearchClick ? $.__views.searchButton.addEventListener("click", onSearchClick) : __defers["$.__views.searchButton!click!onSearchClick"] = true;
    $.__views.__alloyId2 = Ti.UI.createView({
        backgroundColor: "#000000",
        height: "1dp",
        width: "100%",
        id: "__alloyId2"
    });
    $.__views.__alloyId4 = Ti.UI.createView({
        backgroundColor: "#000000",
        height: "1dp",
        width: "100%",
        id: "__alloyId4"
    });
    var __alloyId5 = {};
    var __alloyId8 = [];
    var __alloyId9 = {
        type: "Ti.UI.ImageView",
        bindId: "cabImage",
        properties: {
            width: 72,
            height: 72,
            left: 0,
            bindId: "cabImage"
        }
    };
    __alloyId8.push(__alloyId9);
    var __alloyId10 = {
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
    __alloyId8.push(__alloyId10);
    var __alloyId11 = {
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
    __alloyId8.push(__alloyId11);
    var __alloyId7 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId8
    };
    __alloyId5["template"] = __alloyId7;
    $.__views.availableCabsListView = Ti.UI.createListView({
        top: 10,
        defaultItemTemplate: "template",
        onItemclick: "onAvailableCabsListViewItemClick",
        separatorColor: "black",
        visible: false,
        templates: __alloyId5,
        headerView: $.__views.__alloyId2,
        footerView: $.__views.__alloyId4,
        id: "availableCabsListView"
    });
    $.__views.cabBookInputContainer.add($.__views.availableCabsListView);
    onListViewItemClick ? $.__views.availableCabsListView.addEventListener("itemclick", onListViewItemClick) : __defers["$.__views.availableCabsListView!itemclick!onListViewItemClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    Ti.API.info("args********:" + JSON.stringify(args));
    var _http = require("http");
    var _url = require("url");
    require("user");
    var _coverageAreas = [];
    var _source;
    var _destination;
    var _carData = [];
    init();
    var _isPostlayoutCalled = false;
    __defers["$.__views.bookNowWin!postlayout!winPostlayout"] && $.__views.bookNowWin.addEventListener("postlayout", winPostlayout);
    __defers["$.__views.sourcePicker!change!pickerValueChangedListener"] && $.__views.sourcePicker.addEventListener("change", pickerValueChangedListener);
    __defers["$.__views.destinationPicker!change!pickerValueChangedListener"] && $.__views.destinationPicker.addEventListener("change", pickerValueChangedListener);
    __defers["$.__views.searchButton!click!onSearchClick"] && $.__views.searchButton.addEventListener("click", onSearchClick);
    __defers["$.__views.availableCabsListView!itemclick!onListViewItemClick"] && $.__views.availableCabsListView.addEventListener("itemclick", onListViewItemClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;