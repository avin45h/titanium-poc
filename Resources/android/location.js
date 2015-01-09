exports.getCurrentAddress = function(callBackMethod) {
    Titanium.Geolocation.getCurrentPosition(function(e) {
        if (!e.success) {
            callBackMethod({
                result: false,
                address: "Could not retrieve location"
            });
            return;
        }
        var longitude = e.coords.longitude;
        var latitude = e.coords.latitude;
        Titanium.Geolocation.reverseGeocoder(latitude, longitude, function(evt) {
            if (evt.success) {
                var places = evt.places;
                console.log("addresses::" + JSON.stringify(places));
                callBackMethod(places && places.length ? {
                    result: true,
                    address: places[0].address
                } : {
                    result: true,
                    address: "No address found"
                });
            }
        });
    });
};