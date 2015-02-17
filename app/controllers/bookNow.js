var args = arguments[0] || {};
Ti.API.info('args********:' + JSON.stringify(args));
var _http = require("http");
var _url = require("url");
var _user = require("user");
var _coverageAreas = [];
var _source;
var _destination;
var _carData = [];
init();
var _isPostlayoutCalled = false;

/**
 * The data from the server will be downloaded to populate the source and destination picker
 */
function loadData() {
    $.progressBar.show();
    _http.request({
        url : _url.coverage,
        type : Alloy.Globals.HTTP_REQUEST_TYPE_GET,
        timeout : 30000,
        format : Alloy.Globals.DATA_FORMAT_JSON,
        success : onHttpSuccess,
        failure : onHttpFailure
    });
};

/**
 * Success callback of the http request of registering user
 */
function onHttpSuccess(responseText) {
    populatePickers(responseText);
    $.progressBar.hide();
    Ti.API.info('success:********' + JSON.stringify(responseText));
    $.searchButton.visible = true;
};

/**
 * Failure callback of http request of registering user
 */
function onHttpFailure(e) {
    $.progressBar.hide();
    Ti.API.info('failure:********' + JSON.stringify(e));
    alert("Request faild. Please try again.");
};

/**
 * Method to populate list view of cabs
 */
function populateAvailableCabsListView(carData) {
    _carData.length = 0;
    _.each(carData, function(car) {
        _carData.push({
            cabName : {
                text : car.carname
            },
            cabType : {
                text : car.cartype
            },
            cabImage : {
                image : car.carimageurl
            },
            // Sets the regular list data properties
            properties : {
                accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE,
                height : OS_IOS ? 80 : Ti.UI.SIZE,
                width : Ti.UI.FILL,
                selectedBackgroundColor : "blue",
                touchEnabled : false,
            },
            carDetails : {
                _id : car._id,
                createdAt : car.createdAt,
                updatedAt : car.updatedAt,
                carname : car.carname,
                carimageurl : car.carimageurl,
                cartype : car.cartype,
                vendornumber : car.vendornumber,
                vendorsite : car.vendorsite,
                longitude : car.longitude,
                latitude : car.latitude,
                __v : car.__v,
                userId : car.userId,
                bookstatus : car.bookstatus,
            }
        });
    });
    var cabListSection = Ti.UI.createListSection();
    cabListSection.setItems(_carData);
    $.availableCabsListView.sections = [cabListSection];
    $.availableCabsListView.visible = true;
};

/**
 * Populates the source and destination picker with the coverage areas returned from the server
 */
function populatePickers(coverageAreas) {
    var rowData = [];
    _.each(coverageAreas, function(area) {
        _coverageAreas.push(area);
        var row = Ti.UI.createPickerRow({
            title : area,
            id : rowData.length
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
    Ti.API.info('_coverageAreas:********' + JSON.stringify(_coverageAreas));

};

/**
 * Will be called when user will click the search button
 */
function onSearchClick(e) {

    loadAvailableCabsList();
};

/**
 * Function to load list of available cabs.
 */
function loadAvailableCabsList() {
    $.progressBar.show();
    _http.request({
        //url = "http://lit-chamber-6827.herokuapp.com/availableCars"
        url : _url.availableCars,
        type : Alloy.Globals.HTTP_REQUEST_TYPE_POST,
        data : {
            from : _source,
            to : _destination
        },
        timeout : 60000,
        format : Alloy.Globals.DATA_FORMAT_JSON,
        success : onHttpCabsListSuccess,
        failure : onHttpCabsListFailure
    });
};

/**
 * Success callback of the http request to download availabe cabs
 */
function onHttpCabsListSuccess(cabsList) {
    if (OS_ANDROID) {
        $.progressBar.hide();
    }
    if (cabsList.length > 0) {
        populateAvailableCabsListView(cabsList);
    } else {
        alert("No cab availabe from " + _source + " to " + _destination);
    }
    Ti.API.info('success CabsList:********' + JSON.stringify(cabsList));
};

/**
 * Failure callback of http request to download availabe cabs
 */
function onHttpCabsListFailure(e) {
    if (OS_ANDROID) {
        $.progressBar.hide();
    }
    Ti.API.info('failure CabsList:********' + JSON.stringify(e));
    alert("Request failed. Please try again.");
};

function pickerValueChangedListener(e) {
    if (e.source.id === "sourcePicker") {
        _source = $.sourcePicker.getSelectedRow(0).title;
        Ti.API.info("source******: " + $.sourcePicker.getSelectedRow(0).title);
    } else {
        _destination = $.destinationPicker.getSelectedRow(0).title;
        Ti.API.info("destinationPicker******: " + $.destinationPicker.getSelectedRow(0).title);
    }
};

/**
 * Will be called when an item of the list view will be clicked
 */
function onListViewItemClick(e) {
    Ti.API.info('onListViewItemClick BookNow **********');
    openCabDetailsWindow(e.itemIndex);
}

/**
 * Will open the cab detail window
 */
function openCabDetailsWindow(index) {

    var details = Alloy.createController("cabDetails", {
        carDetails : _carData[index].carDetails, closeWindowCallback : closeWindow, from: "bookNow", source:_source, destination:_destination
    }).getView();

    details.open();
}

/**
 * Will be called when user clicks android ActionBar home icon
 */
function onHomeIconItemSelected() {
    $.progressBar.hide();
    closeWindow();
};

function closeWindow() {
    $.bookNowWin.close();
};

function winPostlayout(e) {
    if (!_isPostlayoutCalled) {
        $.progressBar.show();
        loadData();
        _isPostlayoutCalled = true;

    }
    Ti.API.info('PostLalyout : window called ********');
};

/**
 * Function which will initialize the screen
 */
function init() {
    if (OS_ANDROID) {
        $.bookNowWin.orientationModes = [Titanium.UI.PORTRAIT];
    }
    //$.progressBar.show();
    //loadData();
};