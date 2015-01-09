var registerView;
var loginView;
var iPhoneNavigationWin;

//Will be called when signup button will be tapped
function onSignUpButtonClick(e) {
   registerView = Alloy.createController("register").getView();
   if(Titanium.Platform.osname == "iphone"){
       var win = Ti.UI.createWindow();
       win.add(registerView);
       $.navWin.openWindow(win);
   }else if(Titanium.Platform.osname == "android"){
       $.mainWin.add(registerView);
       $.mainWin.activity.actionBar.onHomeIconItemSelected = onHomeClick;
       $.mainWin.addEventListener("androidback", onAndroidBackButtonPressed);
   }
   
}


/**
 * This method will show the home up button of the action bar
 * @param {Object} e
 */
function enableHomeUpButton(e){
	var actionBar = $.mainWin.activity.actionBar;
	actionBar.displayHomeAsUp = true;
}

/**
 * This method will hide the home up back button of the action bar
 * @param {Object} e
 */
function hideHomeUpButton(e){
	var actionBar = $.mainWin.activity.actionBar;
	actionBar.displayHomeAsUp = false;
	
}

/**
 * Will be calle when the Home button of the action bar will be clicked
 * @param {Object} e
 */
function onHomeClick(e){
	 $.mainWin.remove(registerView);
	 $.mainWin.add(loginView);
	 $.mainWin.removeEventListener("androidback", onAndroidBackButtonPressed);
	 hideHomeUpButton(e);
};

/**
 * Will be called when Android device's hardware backbutton is clicked.
 * @param {Object} e
 */
function onAndroidBackButtonPressed(e){
	e.cancelBubble = true;
	e.bubble = false;
	onHomeClick();
}

loginView = Alloy.createController("login",{callBacks:{signUpCallback:onSignUpButtonClick, enableHomeUpButtonCallback:enableHomeUpButton, hideHomeUpButtonCallBack:hideHomeUpButton}}).getView();


if(Titanium.Platform.osname == "iphone"){
	$.navRootWin.add(loginView);
	$.navWin.open();
}else{
	$.mainWin.add(loginView);
	$.mainWin.open();
}


