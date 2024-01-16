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

function initMap(latitude, longitude) {
    // Initialize map only if latitude and longitude are provided
    if (latitude && longitude) {
        var map = L.map('map').setView([latitude, longitude], 9);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        L.marker([latitude, longitude]).addTo(map);
    }
}
function trackUser() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            // Calculate and display speed first
            const speed = calculateRotationalSpeed(latitude);
            document.getElementById("speed").innerText = 'Your speed due to Earth\'s rotation is: ' + speed.toFixed(2) + ' m/s';
            
            // Then initialize the map
            initMap(latitude, longitude);
        }, function(error) {
            document.getElementById("speed").innerText = 'Error getting location: ' + error.message;
            // Default to Mount Rushmore if error occurs
            initMap(43.8791, -103.4591);
        });
    } else {
        document.getElementById("speed").innerText = 'Geolocation is not supported by your browser.';
        // Default to Mount Rushmore if geolocation is not supported
        initMap(43.8791, -103.4591);
    }
}
