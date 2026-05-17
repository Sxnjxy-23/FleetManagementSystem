import io from 'socket.io-client';

// Connect to the backend
const socket = io('http://localhost:5000');

const DEVICE_ID = 'ESP32_TEST';

// Fixed coordinates as requested due to cyclone/no satellite signal
const FIXED_LAT = 12.96041889405188;
const FIXED_LNG = 80.05233291797659;

socket.on('connect', () => {
    console.log(`Connected to server as ${DEVICE_ID}`);

    // Send data every 3 seconds
    setInterval(() => {
        const data = {
            device_id: DEVICE_ID,
            lat: FIXED_LAT,
            lng: FIXED_LNG,
            speed_kmph: 0, // Stationary
            timestamp: new Date().toISOString()
        };

        console.log('Sending data:', data);
        socket.emit('gps_data', data);

        // Also hit the REST endpoint for persistence/compatibility
        fetch('http://localhost:5000/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).catch(err => console.error('Error sending to API:', err.message));

    }, 3000);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

/*
// PREVIOUS DYNAMIC SIMULATION CODE (KEPT FOR REFERENCE)
// const startLat = 12.9716;
// const startLng = 77.5946;
// let lat = startLat;
// let lng = startLng;

// setInterval(() => {
//     // Simulate movement
//     lat += (Math.random() - 0.5) * 0.001;
//     lng += (Math.random() - 0.5) * 0.001;
//     const speed = Math.random() * 60;
//
//     const data = {
//         device_id: DEVICE_ID,
//         lat: lat,
//         lng: lng,
//         speed_kmph: speed,
//         timestamp: new Date().toISOString()
//     };
//     // ... emit logic ...
// }, 3000);
*/
