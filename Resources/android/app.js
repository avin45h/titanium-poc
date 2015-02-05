var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.textFieldHeight = 60;

Alloy.Globals.buttonHeight = 60;

Alloy.Globals.baseURL = "https://lit-chamber-6827.herokuapp.com/users/";

Alloy.Globals.DATA_FORMAT_JSON = "json";

Alloy.Globals.HTTP_REQUEST_TYPE_POST = "POST";

Alloy.Globals.HTTP_REQUEST_TYPE_GET = "GET";

Alloy.Globals.USER_NAME = "username";

Alloy.Globals.USER_EMAIL = "email";

Alloy.Globals.USER_PROFILE_NAME = "profilename";

Alloy.Globals.USER_PHONE_NUMBER = "phonenumber";

Alloy.Globals.USER_LONGITUDE = "longitude";

Alloy.Globals.USER_LATITUDE = "latitude";

Alloy.createController("index");