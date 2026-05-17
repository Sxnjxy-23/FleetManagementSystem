import express from 'express';

const router = express.Router();

// Mock Data
const areaChartData = [
    { name: 'Jan', revenue: 4000, profit: 2400 },
    { name: 'Feb', revenue: 3000, profit: 1398 },
    { name: 'Mar', revenue: 2000, profit: 9800 },
    { name: 'Apr', revenue: 2780, profit: 3908 },
    { name: 'May', revenue: 1890, profit: 4800 },
    { name: 'Jun', revenue: 2390, profit: 3800 },
    { name: 'Jul', revenue: 3490, profit: 4300 },
    { name: 'Aug', revenue: 4000, profit: 2400 },
    { name: 'Sep', revenue: 3000, profit: 1398 },
    { name: 'Oct', revenue: 2000, profit: 9800 },
    { name: 'Nov', revenue: 2780, profit: 3908 },
    { name: 'Dec', revenue: 1890, profit: 4800 },
];

const barChartData = [
    { name: 'Jan', online: 4000, inStore: 2400 },
    { name: 'Feb', online: 3000, inStore: 1398 },
    { name: 'Mar', online: 2000, inStore: 5800 },
    { name: 'Apr', online: 2780, inStore: 3908 },
    { name: 'May', online: 1890, inStore: 4800 },
    { name: 'Jun', online: 2390, inStore: 3800 },
];

const pieChartData = [
    { name: 'Organic', value: 400 },
    { name: 'Direct', value: 300 },
    { name: 'Referral', value: 300 },
    { name: 'Social', value: 200 },
];

const lineChartData = [
    { name: 'Jan', visits: 4000, conversions: 240 },
    { name: 'Feb', visits: 3000, conversions: 139 },
    { name: 'Mar', visits: 2000, conversions: 980 },
    { name: 'Apr', visits: 2780, conversions: 390 },
    { name: 'May', visits: 1890, conversions: 480 },
    { name: 'Jun', visits: 2390, conversions: 380 },
];

const radarChartData = [
    { subject: 'Speed', A: 80, B: 60 },
    { subject: 'Quality', A: 95, B: 90 },
    { subject: 'Support', A: 50, B: 85 },
    { subject: 'Features', A: 85, B: 65 },
    { subject: 'UX', A: 90, B: 79 },
    { subject: 'Stability', A: 70, B: 60 },
];

const mockStats = [
    {
        title: 'Total Revenue',
        value: '$54,385',
        change: '+14.5%',
        trend: 'up',
        icon: {
            path: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
            bgColor: 'bg-indigo-500'
        }
    },
    {
        title: 'New Users',
        value: '8,549',
        change: '+5.25%',
        trend: 'up',
        icon: {
            path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
            bgColor: 'bg-green-500'
        }
    },
    {
        title: 'Engagement',
        value: '87.5%',
        change: '-2.35%',
        trend: 'down',
        icon: {
            path: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
            bgColor: 'bg-blue-500'
        }
    },
    {
        title: 'Conversion Rate',
        value: '3.24%',
        change: '+1.2%',
        trend: 'up',
        icon: {
            path: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
            bgColor: 'bg-purple-500'
        }
    }
];

// Routes
router.get('/charts/area', (req, res) => res.json(areaChartData));
router.get('/charts/bar', (req, res) => res.json(barChartData));
router.get('/charts/pie', (req, res) => res.json(pieChartData));
router.get('/charts/line', (req, res) => res.json(lineChartData));
router.get('/charts/radar', (req, res) => res.json(radarChartData));
router.get('/stats', (req, res) => res.json(mockStats));

// In-memory user store (for demo purposes)
const users = [];

// Vehicle store
const vehicles = {}; // { userEmail: [vehicle1, vehicle2] }
const lastPositions = {}; // { deviceId: { lat, lng, ... } }

import jwt from 'jsonwebtoken';

// Secret key for JWT (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Auth Routes
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Generate token valid for 5 minutes
        const token = jwt.sign(
            { email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: '5m' }
        );

        res.json({
            success: true,
            user: { email: user.email, name: user.name },
            token
        });
    } else {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
});

router.post('/register', (req, res) => {
    const { email, password, phone, vehicleNo, vehicleType, vehicleModel } = req.body;

    if (users.find(u => u.email === email)) {
        return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const newUser = { email, password, phone };
    users.push(newUser);

    // Initialize user vehicles
    vehicles[email] = [];

    // If vehicle details provided during registration
    if (vehicleNo) {
        vehicles[email].push({
            id: Date.now(),
            vehicleNo,
            type: vehicleType || 'Car',
            model: vehicleModel || 'Unknown',
            status: 'Active',
            lastSeen: 'Just now',
            location: 'Unknown',
            batteryLevel: 100,
            deviceId: vehicleNo // Using vehicleNo as deviceId for simplicity
        });
    }

    // Generate token valid for 5 minutes
    const token = jwt.sign(
        { email, phone },
        JWT_SECRET,
        { expiresIn: '5m' }
    );

    res.json({
        success: true,
        user: { email, phone },
        token
    });
});

router.post('/update-profile', (req, res) => {
    const { email, ...details } = req.body;
    const user = users.find(u => u.email === email);

    if (user) {
        Object.assign(user, details);
        res.json({ success: true, user });
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
});

// Verify Token Endpoint
router.get('/verify', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // Check if user still exists (optional, but good practice)
        const user = users.find(u => u.email === decoded.email);
        if (!user) {
            // Fallback if user was in-memory and server restarted, but token is valid signed by same secret (if secret is constant)
            // For this demo, we'll accept the decoded data
            return res.json({ success: true, user: decoded });
        }
        res.json({ success: true, user });
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
});

// Vehicle Routes
router.get('/vehicles', (req, res) => {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: 'Email required' });

    const userVehicles = vehicles[email] || [];

    // Enrich with last known position if available
    const enrichedVehicles = userVehicles.map(v => {
        const lastPos = lastPositions[v.deviceId];
        if (lastPos) {
            return {
                ...v,
                location: `${lastPos.lat.toFixed(4)}, ${lastPos.lng.toFixed(4)}`,
                lastSeen: lastPos.timestamp, // Use the timestamp from the last position
                speed: lastPos.speed_kmph
            };
        }
        return v;
    });

    res.json(enrichedVehicles);
});

router.post('/vehicles', (req, res) => {
    const { email, vehicle } = req.body;
    if (!email || !vehicle) return res.status(400).json({ error: 'Missing data' });

    if (!vehicles[email]) vehicles[email] = [];

    const newVehicle = {
        ...vehicle,
        id: Date.now(),
        status: 'Active',
        lastSeen: 'Just now',
        batteryLevel: 100,
        deviceId: vehicle.vehicleNo
    };

    vehicles[email].push(newVehicle);
    res.json({ success: true, vehicle: newVehicle });
});

// Tracking Route
router.post('/track', (req, res) => {
    try {
        const { device_id, lat, lng, speed_kmph, timestamp } = req.body;
        if (!device_id || !lat || !lng) return res.status(400).send('missing fields');

        const data = {
            device_id,
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            speed_kmph: parseFloat(speed_kmph || 0),
            timestamp: timestamp || Date.now()
        };

        // Save last pos
        lastPositions[device_id] = data;

        // Find vehicle to get type
        let vehicleType = 'Unknown';
        // Search through all users' vehicles to find the matching deviceId
        for (const userEmail in vehicles) {
            const userVehicles = vehicles[userEmail];
            const vehicle = userVehicles.find(v => v.deviceId === device_id);
            if (vehicle) {
                vehicleType = vehicle.type;
                // Update vehicle status in store
                vehicle.lastSeen = timestamp || new Date().toISOString();
                vehicle.location = `${data.lat}, ${data.lng}`;
                break;
            }
        }

        const emitData = {
            ...data,
            vehicleType,
            lastUptime: data.timestamp
        };

        // Broadcast to all connected web clients
        if (req.io) {
            req.io.emit('position', emitData);
        }

        return res.json({ ok: true });
    } catch (err) {
        console.error(err);
        return res.status(500).send('server error');
    }
});

export default router;
