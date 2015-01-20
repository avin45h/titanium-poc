var args = arguments[0] || {};
/*****Global Variables****/
var utils = require("utils");

/**
 * Will be called when user will click the sign in button
 * @param {Object} e
 */
function onSignInButtonClick(e){
	doLogin();
}

/**
 * Method to perform login
 */
function doLogin(){
    if(validateTextFields()){
        args.progressIndicator.show();
        setTimeout(function(){
            args.progressIndicator.hide();
           var homeController = Alloy.createController("home").getView();
           homeController.open(); 
        },utils.getRandomNumber(2,4)*1000);
    }
}

/**
 * Method to check the entry validity in the user id and password fields
 */
function validateTextFields(){
    if ($.userNameTextField.value != null && $.userNameTextField.value.length == 0) {
        alert(L("enter_user_name"));
        return false;
    } else if ($.passwordTextField.value != null && $.passwordTextField.value.length == 0) {
         alert(L("enter_password"));
        return false;
    } 
    
    return true;
}

/**
 * Will be called when user will click the Sign Up button on the sign in page
 * @param {Object} e
 */
function onSignUpButtonClick(e){
	//Call the callback method from the args supplied while creating this controller in index.js
	 args.callBacks.signUpCallback(e);
	if(Titanium.Platform.osname == "android"){
       args.callBacks.enableHomeUpButtonCallback(e); 
	}
	
}
