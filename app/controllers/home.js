/******************* Global Variables *****************************/
//ti.Map module reference
var tiMap;
var cabAnnotations = [];

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
    
    var details = Alloy.createController("cabDetails",{cabDetails:cabData.cabs[index]}).getView();
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
function populateListView(){
    var cabDataSet = [];
    _.each(cabData.cabs, function(cab){
        cabDataSet.push({
            cabName : { text: cab.cabName },
            distance : { text : cab.distance },
            cabImage : { image : cab.cabImage },
            // Sets the regular list data properties
            properties : {
                itemId: cab.cabId,
                accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE,
                height:OS_IOS ? 80 : Ti.UI.SIZE,
                selectedBackgroundColor : "blue",
                touchEnabled:false,
            }
        });
    });
    var cabListSection = Ti.UI.createListSection();
    cabListSection.setItems(cabDataSet);
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
 *Initialize the page 
 */

function init(){
    if(OS_ANDROID){
       $.mainWin.orientationModes = [Titanium.UI.PORTRAIT]; 
    }
    populateListView();
    tiMap = require('ti.map');
    addAnotationToMap();
    
}

