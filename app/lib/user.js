exports.setUserProfile = function(userProfile){
    //Ti.App.Properties.setString("userProfile", userProfile);
    Ti.App.Properties.setString(Alloy.Globals.USER_NAME, userProfile.username);
    Ti.App.Properties.setString(Alloy.Globals.USER_EMAIL, userProfile.email);
    Ti.App.Properties.setString(Alloy.Globals.USER_PROFILE_NAME, userProfile.profilename);
    Ti.App.Properties.setString(Alloy.Globals.USER_PHONE_NUMBER, userProfile.phonenumber);
    Ti.App.Properties.setString(Alloy.Globals.USER_LATITUDE, userProfile.latitude);
    Ti.App.Properties.setString(Alloy.Globals.USER_LONGITUDE, userProfile.longitude);
};

/**
 * Get the user profile property e.g. username, email etc
 */    
exports.getUserProfileProperty = function(userProperty){
    return Ti.App.Properties.getString(userProperty);
};

exports.setUserPassword = function(password){
    Ti.App.Properties.setString("userPassword", password);
};

exports.getUserPassword = function(password){
    return Ti.App.Properties.getString("userPassword");
};
