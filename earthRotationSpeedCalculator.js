function initMap(latitude, longitude) {
    var map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    L.marker([latitude, longitude]).addTo(map);
}

function trackUser() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const speed = calculateRotationalSpeed(latitude);
            document.getElementById("speed").innerText = 'Your speed due to Earth\'s rotation is: ' + speed.toFixed(2) + ' m/s';
            initMap(latitude, longitude); // Initialize map with user location
        }, function(error) {
            document.getElementById("speed").innerText = 'Error getting location: ' + error.message;
            initMap(43.8791, -103.4591); // Initialize map with Mount Rushmore as default
        });
    } else {
        document.getElementById("speed").innerText = 'Geolocation is not supported by your browser.';
        initMap(43.8791, -103.4591); // Initialize map with Mount Rushmore as default
    }
}
