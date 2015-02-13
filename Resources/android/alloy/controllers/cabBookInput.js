function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadData() {
        args.progressIndicator.show();
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
        args.progressIndicator.hide();
        Ti.API.info("success:********" + JSON.stringify(responseText));
        $.nextButton.visible = true;
    }
    function onHttpFailure(e) {
        args.progressIndicator.hide();
        Ti.API.info("failure:********" + JSON.stringify(e));
        alert("Please enter valid Username and Password");
    }
    function populateAvailableCabsListView(carData) {
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
        $.availableCabsListView.sections = [ cabListSection ];
        $.nextButton.visible = false;
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
    function onNextClick() {
        loadAvailableCabsList();
    }
    function loadAvailableCabsList() {
        args.progressIndicator.show();
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
    function onAvailableCabsListViewItemClick() {
        alert("item clicked");
    }
    function onHttpCabsListSuccess(cabsList) {
        args.progressIndicator.hide();
        cabsList.length > 0 ? populateAvailableCabsListView(cabsList) : alert("No cab availabe from " + _source + " to " + _destination);
        Ti.API.info("success CabsList:********" + JSON.stringify(cabsList));
    }
    function onHttpCabsListFailure(e) {
        args.progressIndicator.hide();
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
    function init() {
        loadData();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "cabBookInput";
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
    $.__views.cabBookInputParentView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        backgroundColor: "white",
        id: "cabBookInputParentView"
    });
    $.__views.cabBookInputParentView && $.addTopLevelView($.__views.cabBookInputParentView);
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
        width: 80,
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
        width: 80,
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
    $.__views.__alloyId11 = Ti.UI.createView({
        backgroundColor: "#000000",
        height: "1dp",
        width: "100%",
        id: "__alloyId11"
    });
    $.__views.__alloyId13 = Ti.UI.createView({
        backgroundColor: "#000000",
        height: "1dp",
        width: "100%",
        id: "__alloyId13"
    });
    var __alloyId14 = {};
    var __alloyId17 = [];
    var __alloyId18 = {
        type: "Ti.UI.ImageView",
        bindId: "cabImage",
        properties: {
            width: 72,
            height: 72,
            left: 0,
            bindId: "cabImage"
        }
    };
    __alloyId17.push(__alloyId18);
    var __alloyId19 = {
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
    __alloyId17.push(__alloyId19);
    var __alloyId20 = {
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
    __alloyId17.push(__alloyId20);
    var __alloyId16 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId17
    };
    __alloyId14["template"] = __alloyId16;
    $.__views.availableCabsListView = Ti.UI.createListView({
        templates: __alloyId14,
        headerView: $.__views.__alloyId11,
        footerView: $.__views.__alloyId13,
        id: "availableCabsListView",
        defaultItemTemplate: "template",
        separatorColor: "black"
    });
    $.__views.cabBookInputContainer.add($.__views.availableCabsListView);
    onAvailableCabsListViewItemClick ? $.__views.availableCabsListView.addEventListener("itemclick", onAvailableCabsListViewItemClick) : __defers["$.__views.availableCabsListView!itemclick!onAvailableCabsListViewItemClick"] = true;
    $.__views.nextButton = Ti.UI.createButton({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 10,
        title: "Next",
        visible: false,
        id: "nextButton"
    });
    $.__views.cabBookInputContainer.add($.__views.nextButton);
    onNextClick ? $.__views.nextButton.addEventListener("click", onNextClick) : __defers["$.__views.nextButton!click!onNextClick"] = true;
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
    __defers["$.__views.sourcePicker!change!pickerValueChangedListener"] && $.__views.sourcePicker.addEventListener("change", pickerValueChangedListener);
    __defers["$.__views.destinationPicker!change!pickerValueChangedListener"] && $.__views.destinationPicker.addEventListener("change", pickerValueChangedListener);
    __defers["$.__views.availableCabsListView!itemclick!onAvailableCabsListViewItemClick"] && $.__views.availableCabsListView.addEventListener("itemclick", onAvailableCabsListViewItemClick);
    __defers["$.__views.nextButton!click!onNextClick"] && $.__views.nextButton.addEventListener("click", onNextClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;