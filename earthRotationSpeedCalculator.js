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

// Track the user's latitude and calculate rotational speed
function trackUser() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const speed = calculateRotationalSpeed(latitude);
            document.getElementById("speed").innerText = 'Your speed due to Earth\'s rotation is: ' + speed.toFixed(2) + ' m/s';
        }, function(error) {
            document.getElementById("speed").innerText = 'Error getting location: ' + error.message;
        });
    } else {
        document.getElementById("speed").innerText = 'Geolocation is not supported by your browser.';
    }
}
