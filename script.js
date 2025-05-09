
function getLocation() {
    // Play click sound
    playClickSound();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendCoordinates, showError, {
            enableHighAccuracy: true, // Enable high accuracy
            timeout: 5000, // Timeout after 5 seconds
            maximumAge: 0 // Do not use cached location
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function playClickSound() {
    // Create AudioContext
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; // Wave type
    oscillator.frequency.setValueAtTime(2000, audioContext.currentTime); // Frequency for click sound
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1); // Duration of the click sound
}

function sendCoordinates(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // Send data to server using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://your-vercel-app.vercel.app/api/send", true); // Ganti dengan URL API Anda
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            document.getElementById("response").innerHTML = "🚨 Help is on the way to your location!";
            document.getElementById("panic-btn").style.display = "none"; // Sembunyikan tombol
            document.getElementById("txt").style.display = "none";
            document.getElementById("tlt").style.display = "none";
        }
    };
    // Kirim koordinat ke server
    xhr.send("latitude=" + latitude + "&longitude=" + longitude);
}



function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User  denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}
