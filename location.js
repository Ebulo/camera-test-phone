function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation);
    } else {
        // console.log("Location not Available");
        loc = {"lat": "No Lat", "lng": "No Lng", "speed": "0 Km/Hr", "altitude": "Sea Level"};
        alert("Please provide the Location Permission to continue using the app");
        getCurrentLocation();
        // return {"lat": "No Lat", "lng": "No Lng", "speed": "0 Km/Hr", "altitude": "Sea Level"};
    }
}

function showLocation(position) {
    lat = !position.coords.latitude?"No Lat": position.coords.latitude
    lng = !position.coords.longitude?"No Lng": position.coords.latitude
    speed = !position.coords.speed? "0 Km/Hr": position.coords.speed
    altitude = !position.coords.altitude? "Sea Level": position.coords.altitude

    // console.log("lat, lng, speed, alt", lat, lng, speed, altitude);
    loc = {"lat": lat, "lng": lng, "speed": speed, "altitude": altitude};
    // console.log("Added Location");
    // return {"lat": lat, "lng": lng, "speed": speed, "altitude": altitude};
}