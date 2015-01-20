var args = arguments[0] || {};

init();



/**
 * This method will show the home up button of the action bar
 * @param {Object} e
 */
function enableHomeUpButton(){
    setTimeout(function(){
            var actionBar = $.mainWin.activity.actionBar;
            actionBar.displayHomeAsUp = true;
            $.mainWin.activity.actionBar.onHomeIconItemSelected = onHomeClick;
    },1500);
   
}

/**
 * Starts a call
 */
function initiateCall(e){
    Titanium.Platform.openURL("tel:"+e.source.text);
};

/**
 * Will be called when action bar back button will be clicked
 */
function onHomeClick(){
     $.mainWin.close();
}

/**
 * Function which will initialize the screen
 */
function init(){
    if(OS_ANDROID){
        enableHomeUpButton();
    }
    
    $.carImageView.image = args.cabDetails.cabImage;
    $.cabNameValueLabel.text = args.cabDetails.cabName;
    $.cabDistanceValueLabel.text = args.cabDetails.distance;
    $.driverNameValueLabel.text = args.cabDetails.cabDriverName;
    $.driverPhoneNumberValueLabel.text = args.cabDetails.cabDriverMobile;
}
