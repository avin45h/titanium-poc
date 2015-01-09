var utils = require("utils");
init();
/**
 * Will be calle when the signup button will be clicked on the signup page.
 * @param {Object} e
 */
function onSignUpButtonClick(e){
    //utils.sendSMS('9310330655',utils.getOTP());
    //Titanium.Platform.openURL('sms:'+e.rowData.value);
    // get current location

    
}


/**
 * Initialize the ui components here
 */
function init(){
    var location = require("location");
    location.getCurrentAddress(function(e){
        if(e.result){
            $.locationTextField.text = e.address;
        }else{
            //Could not find any address, please fill the address manually.
        }
    });
}
