var _ = require('underscore')._;

var win = Ti.UI.currentWindow;

var view = Titanium.UI.createView({
	backgroundColor : "#FFFF00",
});
var data = [];
var inputFields = [];

var headerRow = Ti.UI.createTableViewRow({
	height : 'auto',
	backgroundColor : '#000'
});

var header = Ti.UI.createLabel({
	text : 'REGISTER WITH US',
	left : 10,
	color : "#FFFF00",
});

headerRow.add(header);
data.push(headerRow);

var simpleRowTextFieldGenerator = function(params) {
	params.row = params.row || {};
	params.label = params.label || {};
	params.field = params.field || {};

	var row = Ti.UI.createTableViewRow({
		height : params.row.height || 'auto'
	});

	var label = Ti.UI.createLabel({
		text : params.label.text || 'My Label',
		left : params.label.left || 10,
		color : "#000"
	});

	var field = Ti.UI.createTextField({
		right : 10,
		hintText : params.field.hintText || "Type here",
		textAlign : params.field.textAlign || "right",
		keyboardType : params.field.keyboardType || Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType : params.field.returnKeyType || Ti.UI.RETURNKEY_DONE,
		borderStyle : params.field.borderStyle || Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : params.field.color || '#000'
	});

	inputFields.push({
	name : params.field.name,
	field : field	
	});

	row.add(label);
	row.add(field);
	return row;
};

var getLocation = function() {
	var location = "";
	if (Ti.Network.online) {
		var providerGps = Ti.Geolocation.Android.createLocationProvider({

			name : Ti.Geolocation.PROVIDER_GPS,
			minUpdateDistance : 0.0,
			minUpdateTime : 0
		});
		Ti.Geolocation.Android.addLocationProvider(providerGps);
		Ti.Geolocation.Android.manualMode = true;
		var locationCallback = function(e) {
			if (!e.success || e.error) {
				Ti.API.info('error:' + JSON.stringify(e.error));
			} else {
				location = e.coords.latitude + ", " + e.coords.longitude;
				var locationField = _.find(inputFields,function(field){return field.name == "location";});
				locationField.field.value = location;				
			}
		};
		Titanium.Geolocation.addEventListener('location', locationCallback);
	}
	Ti.API.info("Returning Location");
	return location;
};

//=============UserName row start================
var row2 = simpleRowTextFieldGenerator({
	label : {
		text : 'Username'
	},
	field : {
		name : 'userName',
		hintText : 'user name'
	}
});

var row3 = simpleRowTextFieldGenerator({
	label : {
		text : 'Phone'
	},
	field : {
		name : 'phone',
		hintText : 'phone'
	}
});

var row4 = simpleRowTextFieldGenerator({
	label : {
		text : 'Email ID'
	},
	field : {
		name : 'email',
		hintText : 'email'
	}
});

var row5 = simpleRowTextFieldGenerator({
	label : {
		text : 'Location'
	},
	field : {
		name : 'location',
		hintText : 'location'
	}
});

getLocation();

data.push(row2);
data.push(row3);
data.push(row4);
data.push(row5);
Ti.API.info(JSON.stringify(row5));
//=============UserName row end================

var button = Ti.UI.createButton({
	title : "Finish"
});

button.addEventListener('click', function(e) {
	var data = "You are submitting : ";
	inputFields.forEach(function(e, i) {
		data = data + e.name + " : " +e.field.value + "\n";
	});
	alert(data);
});

var bottomRow = Ti.UI.createTableViewRow({
	height : 'auto'
});

bottomRow.add(button);
data.push(bottomRow);

var table = Ti.UI.createTableView({
	data : data
});

view.add(table);
win.add(view);
