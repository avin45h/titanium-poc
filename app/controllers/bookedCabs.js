var _url = require("url");
var _http = require("http");
var _user = require("user");
var _carData = [];

//Initialize the page
init();
 
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
                createdAt:car.createdAt,
                updatedAt:car.updatedAt,
                carname:car.carname,
                carimageurl:car.carimageurl,
                cartype : car.cartype,
                vendornumber : car.vendornumber,
                vendorsite : car.vendorsite,
                longitude : car.longitude,
                latitude : car.latitude,
                __v:car.__v,
                userId:car.userId,
                bookstatus : car.bookstatus,
            }
        });
    });
    var cabListSection = Ti.UI.createListSection();
    cabListSection.setItems(_carData);
    //cabListSection.setItems(cabDataSet);
    $.cabListView.sections = [cabListSection];
};



/*{
"_id":"54d460578e47553d14b5b619",
"createdAt":"2015-02-06T06:33:59.652Z",
"updatedAt":"2015-02-06T11:15:08.463Z",
"carname":"Miura",
"carimageurl":"http://upload.wikimedia.org/wikipedia/commons/4/42/Lamborghini_miura_svj_spider_4808.jpg",
"cartype":"SuperSports",
"vendornumber":"000",
"vendorsite":"www.wikipedia.com",
"longitude":"77.328461",
"latitude":"28.547117",
"__v":0,
"userId":"54d1ef36541f260c00d2e883",
"bookstatus":true
}*/


/**
 * Function to download the cars list from the server.
 */
function downloadCars(){
    if(OS_ANDROID){
        $.progressIndicator.show();
    }
     _http.request({
            //url:"https://lit-chamber-6827.herokuapp.com/user/Noor1/bookings"
            url:_url.base+"user/"+_user.getUserProfileProperty(Alloy.Globals.USER_NAME)+"/bookings",
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
 * Will be called when an item of the list view will be clicked
 */
function onListViewItemClick(e) {
    //openCabDetailsWindow(e.itemIndex);
};

/**
 * Will be called when user clicks ActionBar home icon
 */
function onHomeIconItemSelected() {
    if(OS_ANDROID){
        $.progressIndicator.hide();
    }
    $.bookedCabsWin.close();
};

/**
 *Initialize the page 
 */

function init(){
    if(OS_ANDROID){
       $.bookedCabsWin.orientationModes = [Titanium.UI.PORTRAIT];
    }
    downloadCars();
};
