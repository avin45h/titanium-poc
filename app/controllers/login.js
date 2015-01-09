var args = arguments[0] || {};

/**
 * Will be called when user will click the sign in button
 * @param {Object} e
 */
function onSignInButtonClick(e){
	
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
