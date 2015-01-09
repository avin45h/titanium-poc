exports.getCurrentAddress = function(callBackMethod){
    Titanium.Geolocation.getCurrentPosition( function(e) {
    if (!e.success) {
        callBackMethod({result:false, address:'Could not retrieve location'});
        return;
    }
    //here are users coordinates
    var longitude = e.coords.longitude;
    var latitude = e.coords.latitude;
 
    // try to get address
    Titanium.Geolocation.reverseGeocoder(latitude,longitude, function(evt) {
        //here we will store address information
        //var street;
        //var city;
        //var country;
        if (evt.success) {
            var places = evt.places;
            console.log("addresses::"+JSON.stringify(places));
            if (places && places.length) {
                //street = places[0].street;
                //city = places[0].city;
                //country = places[0].country_code;
                //alert("street:"+street+" city:"+city+" country:"+country);
                callBackMethod({result:true, address:places[0].address});
            } else {
                callBackMethod({result:true, address:"No address found"});
            }
        }
    });
});
};
