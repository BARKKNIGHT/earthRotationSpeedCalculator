function calculateRotationalSpeed(latitude) {
    const earthRadius = 6378100; // Average radius of Earth in meters
    const earthRotationPeriod = 86164.1; // Sidereal day in seconds (23h 56m 4.1s)
    const angularVelocity = 2 * Math.PI / earthRotationPeriod; // Earth's angular velocity in rad/s

    // Convert latitude to radians
    const latitudeRadians = latitude * (Math.PI / 180);

    // Calculate linear velocity
    const linearVelocity = earthRadius * Math.cos(latitudeRadians) * angularVelocity;

    return linearVelocity; // The speed in meters per second
}
// Initialize the map with a default location (Mount Rushmore)
var map = L.map('map').setView([43.8791, -103.4591], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);
L.marker([43.8791, -103.4591]).addTo(map);

function updateMap(latitude, longitude) {
    map.setView([latitude, longitude], 13);
    L.marker([latitude, longitude]).addTo(map);
}

function trackUser() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Calculate and display speed
            const speed = calculateRotationalSpeed(latitude);
            document.getElementById("speed").innerText = 'Your speed due to Earth\'s rotation is: ' + speed.toFixed(2) + ' m/s';

            // Update the map with the user's location
            updateMap(latitude, longitude);
        }, function(error) {
            document.getElementById("speed").innerText = 'Error getting location: ' + error.message;
        });
    } else {
        document.getElementById("speed").innerText = 'Geolocation is not supported by your browser.';
    }
}

// Optionally, call trackUser() when the page loads to immediately request location
// window.onload = trackUser;
