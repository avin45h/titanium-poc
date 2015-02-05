/******************* Global Variables *****************************/
//ti.Map module reference
var tiMap;
var cabAnnotations = [];
var _url = require("url");
var _http = require("http");
var _carData = [];
//Cab Data Sample
var cabData = {
  "cabs":[
     {
      "cabId":"1",
      "cabName":"Maruti Suzuki",
      "cabNumber":"DL A 1234",
      "cabImage":"http://static.ibnlive.in.com/ibnlive/pix/sitepix/08_2011/new-maruti-suzuki-swift-170811.jpg",
      "cabDriverId":"1",
      "cabDriverName":"Surender",
      "cabDriverMobile":"1234567890",
      "latitude":"28.535516",
      "longitude":"77.391026",
      "distance":"5.0 km"
     },
     {
      "cabId":"2",
      "cabName":"Maruti VAN",
      "cabNumber":"DL B 1234",
      "cabImage" : "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcReJDxGOr9Ic2b_rzYR6ygW25BaRKnCCOdVuKOTgfqmHxE6I1-ytg",
      "cabDriverId":"1",
      "cabDriverName":"Rajender",
      "cabDriverMobile":"1234567890",
      "latitude":"28.537692",
      "longitude":"77.396010",
      "distance":"10.0 km"
     },
{
      "cabId":"3",
      "cabName":"Honda City",
      "cabNumber":"DL C 1234",
      "cabImage" :"http://indianautosblog.com/wp-content/uploads/2014/03/2014-Honda-City-at-Bangkok-Motor-Show-front-quarter-50x50.jpg",
      "cabDriverId":"1",
      "cabDriverName":"Rajesh",
      "cabDriverMobile":"1234567890",
      "latitude":"28.542464",
      "longitude":"77.388275",
      "distance":"3.0 km"
     }
   ]
};

//Initialize the page 
init();

/**
 * Called when the annotations will be tapped
 */
function onMapViewClick(evt) {
     // get event properties
        var annotation = evt.source; //get the Myid from annotation
        var clicksource = evt.clicksource;
        if (evt.clicksource == "leftPane" || evt.clicksource == "leftButton"|| evt.clicksource =="title" || evt.clicksource =="subtitle"){  //leftButton event      
             openCabDetailsWindow(evt.annotation.index);
        }
}

/**
 * Will be called when an item of the list view will be clicked
 */
function onListViewItemClick(e){
    openCabDetailsWindow(e.itemIndex);
}


/**
 * Will open the cab detail window
 */
function openCabDetailsWindow(index){
    
    var details = Alloy.createController("cabDetails",{carDetails:_carData[index].carDetails}).getView();
    //var details = Alloy.createController("cabDetails",{cabDetails:cabData.cabs[index]}).getView();
    var activeTab = $.mainWin.getActiveTab();
        if(activeTab.id == "cabsListTab"){
             $.cabsListTab.open(details);
        }else if(activeTab.id == "cabsMapTab"){
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
function populateListView(carData){
    //var cabDataSet = [];
    _.each(carData, function(car){
        _carData.push({
            cabName : { text: car.carname },
            distance : { text : car.cartype },
            cabImage : { image : car.carimageurl },
            // Sets the regular list data properties
            properties : {
                accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE,
                height:OS_IOS ? 80 : Ti.UI.SIZE,
                selectedBackgroundColor : "blue",
                touchEnabled:false,
            },
            carDetails : {
                _id: car._id,
                carname:car.carname,
                cartype : car.cartype,
                vendornumber : car.vendornumber,
                vendorsite : car.vendorsite,
                longitude : car.longitude,
                latitude : car.latitude,
                bookstatus : car.bookstatus,
                carimageurl:car.carimageurl
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
function addAnotationToMap(){
    _.each(cabData.cabs, function(cab){
        var cabAnnotation = tiMap.createAnnotation({
            leftButton:cab.cabImage,
            latitude:cab.latitude,
            longitude:cab.longitude,
            title:cab.cabName,
            subtitle:cab.distance,
            pincolor:tiMap.ANNOTATION_RED,
            cabId:cab.cabId // Custom property to uniquely identify this annotation.
        });
        
        //cabAnnotation.addEventListener("click", onAnnotaionClick);
        cabAnnotation.index = cabAnnotations.length;
        //best way to add element in a non prdefined lenght array.
        cabAnnotations[cabAnnotations.length] = cabAnnotation;
    });
    $.mapview.annotations = cabAnnotations;
}

/**
 * Function to download the cars list from the server.
 */
function downloadCars(){
    if(OS_ANDROID){
        $.progressIndicator.show();
    }
     _http.request({
            url:_url.cars,
            type:Alloy.Globals.HTTP_REQUEST_TYPE_GET,
            timeout:60000,
            format:Alloy.Globals.DATA_FORMAT_JSON,
            success:onHttpSuccess,
            failure:onHttpFailure
        });
};


/**
 * Success callback of the http request of registering user
 */
function onHttpSuccess(e) {
    populateListView(e);
    if(OS_ANDROID){
        $.progressIndicator.hide();
    }
    Ti.API.info('success Cars:********'+JSON.stringify(e));
    //var homeController = Alloy.createController("home").getView();
    //homeController.open();
};

/**
 * Failure callback of http request of registering user
 */
function onHttpFailure(e) {
    if(OS_ANDROID){
        $.progressIndicator.hide();
    }
    Ti.API.info('failure Cars:********'+JSON.stringify(e));
    alert("Car's data loading failed.");
};

/**
 *Initialize the page 
 */

function init(){
    if(OS_ANDROID){
       $.mainWin.orientationModes = [Titanium.UI.PORTRAIT]; 
    }
    downloadCars();
    populateListView();
    tiMap = require('ti.map');
    addAnotationToMap();
    
}

