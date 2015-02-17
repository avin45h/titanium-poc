var args = arguments[0] || {};
Ti.API.info('args********:' + JSON.stringify(args));
var _http = require("http");
var _url = require("url");
var _user = require("user");
var _utils = require("utils");
var _phoneNumber;

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

function pickerValueChangedListener() {
    Ti.API.info("User selected date: " + JSON.stringify(e));
};

/**
 * Will be called when user click the book button
 */
function onBookClick(e) {
    if (args.from === "home") {

        alert("Under Construction.....");
        return;
    }
    //loadSourceAndDestination();
    //TODO: Separate these two called and put at proper location
    bookCar();
    //$.bookButton.visible = false;
    //onHttpCabBookSuccess();
};

/**
 * Function to download the cars list from the server.
 */
function loadSourceAndDestination() {
    var cabBookInputView = Alloy.createController("cabBookInput", {
        progressIndicator : $.progressIndicator
    }).getView();
    $.cabBookingInputPageHolder.add(cabBookInputView);
};

/**
 * Loads a list of source and destination and creates a spinner to choose source and destination
 */
function bookCar() {
    if (OS_ANDROID) {
        $.progressIndicator.show();
    }

    Ti.API.info('userName*******:' + _user.getUserProfileProperty(Alloy.Globals.USER_NAME));
    _http.request({
        //url = "https://lit-chamber-6827.herokuapp.com/cars/carname/book";Not working anymore
        //url = "https://lit-chamber-6827.herokuapp.com/book"
        //url : _url.cars + "/" + args.carDetails.carname + "/book",
        url : _url.book,
        type : Alloy.Globals.HTTP_REQUEST_TYPE_POST,
        data : {
            username : _user.getUserProfileProperty(Alloy.Globals.USER_NAME),
            from:args.source,
            to:args.destination,
            carname:args.carDetails.carname
        },
        timeout : 60000,
        format : Alloy.Globals.DATA_FORMAT_JSON,
        success : onHttpCabBookSuccess,
        failure : onHttpCabBookFailure
    });
};

/**

 /**
 * Success callback of the http request of registering user
 */
function onHttpCabBookSuccess(e) {
    if (OS_ANDROID) {
        $.progressIndicator.hide();
    }
    Ti.API.info('success CarBook:********' + JSON.stringify(e));
    // alert("Congratulations!\nYour cab has been booked successfully.");
    if (args.from === "bookNow") {
        var dialog = Ti.UI.createAlertDialog({
            title : 'Success',
            message : "Congratulations!\nYour cab has been booked successfully.",
            buttonNames : ['OK']
        });
        dialog.addEventListener('click', function(e) {
            args.closeWindowCallback();
            closeWindow();
        });
        dialog.show();
    }
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

    Titanium.Platform.openURL("tel:" + _phoneNumber);
};

/**
 * Will be called when action bar back button will be clicked
 */
function onHomeClick() {
    closeWindow();
};

function closeWindow() {
    $.mainWin.close();
};

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

    $.carImageView.image = args.carDetails.carimageurl;
    $.cabNameValueLabel.text = args.carDetails.carname;
    $.cabTypeValueLabel.text = args.carDetails.cartype;
    $.driverNameValueLabel.text = args.carDetails.vendorsite;
    _phoneNumber = args.carDetails.vendornumber;
    //$.driverPhoneNumberValueLabel.text = args.carDetails.vendornumber;
    if (OS_ANDROID) {
        //$.driverPhoneNumberValueLabel.html = "<html><u>"+args.carDetails.vendornumber+"</u></html>";
        $.driverPhoneNumberValueLabel.color = "blue";
        $.driverPhoneNumberValueLabel.html = _utils.getUnderlinedString(_phoneNumber);
    } else {
        $.driverPhoneNumberValueLabel.text = _phoneNumber;
    }
};
