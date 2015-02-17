/******************* Global Variables *****************************/
//ti.Map module reference
var cabAnnotations = [];
var _url = require("url");
var _http = require("http");
var _tiMap = require('ti.map');
var _carData = [];
var _isPostlayoutCalled = false; 

//Initialize the page
init();

/**
 * Called when the annotations will be tapped
 */
function onMapViewClick(evt) {
    // get event properties
    var annotation = evt.source;
    //get the Myid from annotation
    var clicksource = evt.clicksource;
    if (evt.clicksource == "leftPane" || evt.clicksource == "leftButton" || evt.clicksource == "title" || evt.clicksource == "subtitle") {//leftButton event
        openCabDetailsWindow(evt.annotation.index);
    }
}

/**
 * Will be called when an item of the list view will be clicked
 */
function onListViewItemClick(e) {
    openCabDetailsWindow(e.itemIndex);
}

/**
 * Will be called when user will press User Porfile action bar menu
 */
function onUserProfileClick(e) {
    var details = Alloy.createController("userProfile").getView();
    details.open();
};

/**
 * Will be called when user will press Booked Cabs action bar menu
 */
function onBookedCabsClick(e) {
    var details = Alloy.createController("bookedCabs").getView();
    details.open();
};

/**
 * Function will be called when Book Now button will be clicked on the Action Bar Manu
 */
function onBookNowClick(e) {
    Ti.API.info('onBookNowClick********');
    var cabBookInputView = Alloy.createController("bookNow").getView();
    cabBookInputView.open();
};

/**
 * Will be called when user clicks ActionBar home icon
 */
function onHomeIconItemSelected() {
    Ti.API.info('onHomeIconItemSelected*******');
};

/**
 * Will open the cab detail window
 */
function openCabDetailsWindow(index) {

    var details = Alloy.createController("cabDetails", {
        carDetails : _carData[index].carDetails, from:"home"
    }).getView();
    //var details = Alloy.createController("cabDetails",{cabDetails:cabData.cabs[index]}).getView();
    var activeTab = $.mainWin.getActiveTab();
    if (activeTab.id == "cabsListTab") {
        $.cabsListTab.open(details);
    } else if (activeTab.id == "cabsMapTab") {
        $.cabsMapTab.open(details);
    }
    // if(OS_ANDROID){
    // details.open();
    // }else if(OS_IOS){
    // var activeTab = $.mainWin.getActiveTab();
    // if(activeTab.id == "cabsListTab"){
    // $.cabsListTab.open(details);
    // }else if(activeTab.id == "cabsMapTab"){
    // $.cabsListTab.open(details);
    // }
    // }
}

/**
 * Method to populate list view of cabs
 */
function populateListView(carData) {
    //var cabDataSet = [];
    _.each(carData, function(car) {
        _carData.push({
            cabName : {
                text : car.carname
            },
            distance : {
                text : car.cartype
            },
            cabImage : {
                image : car.carimageurl
            },
            // Sets the regular list data properties
            properties : {
                accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE,
                height : OS_IOS ? 80 : Ti.UI.SIZE,
                selectedBackgroundColor : "blue",
                touchEnabled : false,
            },
            carDetails : {
                _id : car._id,
                carname : car.carname,
                cartype : car.cartype,
                vendornumber : car.vendornumber,
                vendorsite : car.vendorsite,
                longitude : car.longitude,
                latitude : car.latitude,
                bookstatus : car.bookstatus,
                carimageurl : car.carimageurl
            }
        });
    });
    var cabListSection = Ti.UI.createListSection();
    cabListSection.setItems(_carData);
    //cabListSection.setItems(cabDataSet);
    $.cabListView.sections = [cabListSection];
}

/**
 * Method to draw google map with annotations
 */
function addAnotationToMap(carData) {
    Ti.API.info('addAnotationToMap****:' + JSON.stringify(carData));
    Ti.API.info('addAnotationToMapLength****:' + carData.length);
    _.each(carData, function(car) {
        var cabAnnotation = _tiMap.createAnnotation({
            leftButton : car.carimageurl,
            latitude : car.latitude,
            longitude : car.longitude,
            title : car.carname,
            //subtitle:cab.distance,
            pincolor : _tiMap.ANNOTATION_RED,
            _id : car._id, // Custom property to uniquely identify this annotation.
            carDetails : {
                _id : car._id,
                carname : car.carname,
                cartype : car.cartype,
                vendornumber : car.vendornumber,
                vendorsite : car.vendorsite,
                longitude : car.longitude,
                latitude : car.latitude,
                bookstatus : car.bookstatus,
                carimageurl : car.carimageurl
            }

        });

        //cabAnnotation.addEventListener("click", onAnnotaionClick);
        cabAnnotation.index = cabAnnotations.length;
        //best way to add element in a non pre defined length array.
        cabAnnotations[cabAnnotations.length] = cabAnnotation;
    });
    $.mapview.annotations = cabAnnotations;

    // $.mapview.setLocation({
        // latitude : 48.89364,
        // longitude : 2.33739,
        // latitudeDelta : 0.1,
        // longitudeDelta : 0.1
    // });

    Ti.API.info('cabAnnotations****:' + JSON.stringify(cabAnnotations));

}

/**
 * Function to download the cars list from the server.
 */
function downloadCars() {
    if (OS_ANDROID) {
        $.progressIndicator.show();
    }
    _http.request({
        url : _url.cars,
        type : Alloy.Globals.HTTP_REQUEST_TYPE_GET,
        timeout : 60000,
        format : Alloy.Globals.DATA_FORMAT_JSON,
        success : onHttpSuccess,
        failure : onHttpFailure
    });
};

/**
 * Success callback of the http request of registering user
 */
function onHttpSuccess(e) {
    populateListView(e);
    addAnotationToMap(e);
    if (OS_ANDROID) {
        $.progressIndicator.hide();
    }
    Ti.API.info('success Cars:********' + JSON.stringify(e));
    //var homeController = Alloy.createController("home").getView();
    //homeController.open();
};

/**
 * Failure callback of http request of registering user
 */
function onHttpFailure(e) {
    if (OS_ANDROID) {
        $.progressIndicator.hide();
    }
    Ti.API.info('failure Cars:********' + JSON.stringify(e));
    alert("Car's data loading failed.");
};

function onPostLayout(e){
    if(!_isPostlayoutCalled){
     downloadCars();
     _isPostlayoutCalled = true;
    }
};

/**
 *Initialize the page
 */

function init() {
    if (OS_ANDROID) {
        $.mainWin.orientationModes = [Titanium.UI.PORTRAIT];

    }
    //populateListView();
}

