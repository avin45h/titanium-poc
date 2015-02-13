var args = arguments[0] || {};
var _http = require("http");
var _url = require("url");
var _user = require("user");
init();

/**
 * This method will show the home up button of the action bar
 * @param {Object} e
 */
function enableHomeUpButton() {
    setTimeout(function() {
        var actionBar = $.mainWin.activity.actionBar;
        actionBar.displayHomeAsUp = true;
        $.mainWin.activity.actionBar.onHomeIconItemSelected = onHomeClick;
    }, 1500);

};

/**
 * Will be called when user click the book button
 */
function onBookClick(e) {
    bookCar();
};

/**
 * Function to download the cars list from the server.
 */
function bookCar() {
    if (OS_ANDROID) {
        $.progressIndicator.show();
    }

    Ti.API.info('userName*******:' + _user.getUserProfileProperty(Alloy.Globals.USER_NAME));
    _http.request({
        //url = "https://lit-chamber-6827.herokuapp.com/cars/carname/book"
        url : _url.cars + "/" + args.carDetails.carname + "/book",
        type : Alloy.Globals.HTTP_REQUEST_TYPE_POST,
        data : {
            username : _user.getUserProfileProperty(Alloy.Globals.USER_NAME)
        },
        timeout : 60000,
        format : Alloy.Globals.DATA_FORMAT_JSON,
        success : onHttpCabBookSuccess,
        failure : onHttpCabBookFailure
    });
};

/**
 * Success callback of the http request of registering user
 */
function onHttpCabBookSuccess(e) {
    if (OS_ANDROID) {
        $.progressIndicator.hide();
    }
    Ti.API.info('success CarBook:********' + JSON.stringify(e));
    alert("Congratulations!\nYour cab has been booked successfully.");
};

/**
 * Failure callback of http request of registering user
 */
function onHttpCabBookFailure(e) {
    if (OS_ANDROID) {
        $.progressIndicator.hide();
    }
    Ti.API.info('failure CarBook:********' + JSON.stringify(e));
    alert("CarBook failed. Please try again.");
};

/**
 * Starts a call
 */
function initiateCall(e) {
    Titanium.Platform.openURL("tel:" + e.source.text);
};

/**
 * Will be called when action bar back button will be clicked
 */
function onHomeClick() {
    $.mainWin.close();
};



/**
 * Starts a call
 */
function initiateCall(e) {
    Titanium.Platform.openURL("tel:" + e.source.text);
};

/**
 * Will initiate cancellation of booking of this particular Cab
 */
function onCancelClick(){
    
}

/**
 * Will be called on Edit button click
 */
function onEditClick(){
    
}

/**
 * Function which will initialize the screen
 */
function init() {
    if (OS_ANDROID) {
        if (OS_ANDROID) {
            $.mainWin.orientationModes = [Titanium.UI.PORTRAIT];
            enableHomeUpButton();

        }
    }

    $.userImageView.image = "http://i1.wp.com/www.techrepublic.com/bundles/techrepubliccore/images/icons/standard/icon-user-default.png";
    $.userNameValueLabel.text = _user.getUserProfileProperty(Alloy.Globals.USER_NAME);
    $.userEmailValueLabel.text = _user.getUserProfileProperty(Alloy.Globals.USER_EMAIL);
    $.userProfileNameValueLabel.text = _user.getUserProfileProperty(Alloy.Globals.USER_PROFILE_NAME);
    $.userPhoneNumberValueLabel.text = _user.getUserProfileProperty(Alloy.Globals.USER_PHONE_NUMBER);
};

