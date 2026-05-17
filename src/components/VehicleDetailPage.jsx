import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import { useMap } from 'react-leaflet';

// Fix Leaflet marker icon issue
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const RecenterMap = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

const VehicleDetailPage = ({ onNavigate, vehicle }) => {
  const parseLocation = (loc) => {
    if (!loc || loc === 'Unknown' || typeof loc !== 'string' || !loc.includes(',')) return null;
    const [latStr, lngStr] = loc.split(',');
    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);
    if (isNaN(lat) || isNaN(lng)) return null;
    return { lat, lng, address: 'Live Location' };
  };

  const [vehicleData, setVehicleData] = useState({
    driverName: 'Sanjay', // Default to user name if available, hardcoded for now until passed
    vehicleId: vehicle?.vehicleNo || 'VH001',
    vehicleType: vehicle ? `${vehicle.type} - ${vehicle.model || 'Unknown'}` : 'Sedan - Honda City',
    lastPing: vehicle?.lastSeen || '2 minutes ago',
    status: vehicle?.status || 'offline',
    distanceCoveredToday: '00 km',
    averageSpeed: vehicle?.speed ? `${vehicle.speed} km/h` : '00 km/h',
    warningsHit: 2,
    abnormalDetected: false,
    systemUptime: '99.8%',
    batteryStatus: '-- %',
    lastCharged: '-- hours ago',
    currentLocation: parseLocation(vehicle?.location)
  });

  useEffect(() => {
    if (vehicle) {
      setVehicleData(prev => ({
        ...prev,
        driverName: 'Sanjay', // Ideally passed from user prop
        vehicleId: vehicle.vehicleNo,
        vehicleType: `${vehicle.type} - ${vehicle.model || 'Unknown'}`,
        lastPing: vehicle.lastSeen,
        status: vehicle.status,
        averageSpeed: vehicle.speed ? `${vehicle.speed} km/h` : prev.averageSpeed,
        currentLocation: parseLocation(vehicle.location) || prev.currentLocation
      }));
    }
  }, [vehicle]);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000');

    socket.on('connect', () => {
      console.log('VehicleDetail connected to socket');
    });

    socket.on('position', (data) => {
      // Only update if the data is for the current vehicle
      if (vehicle && data.device_id === vehicle.vehicleNo) {
        setVehicleData(prev => ({
          ...prev,
          lastPing: data.lastUptime || new Date().toISOString(),
          averageSpeed: `${data.speed_kmph.toFixed(2)} km/h`,
          currentLocation: {
            lat: data.lat,
            lng: data.lng,
            address: 'Live Location'
          },
          status: 'Moving' // Assume moving if receiving data
        }));
      }
    });

    return () => socket.close();
  }, [vehicle]);

  const MapSection = () => (
    <div className="w-full h-96 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center overflow-hidden">
      {vehicleData.currentLocation ? (
        <MapContainer
          center={vehicleData.currentLocation}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <RecenterMap center={vehicleData.currentLocation} />
          <Marker position={vehicleData.currentLocation}></Marker>
        </MapContainer>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-400">
          <span className="text-4xl mb-4">📡</span>
          <p className="text-xl font-medium">Vehicle not embedded with GPS module</p>
          <p className="text-sm mt-2">Waiting for GPS signal...</p>
        </div>
      )}
    </div>
  );

  const StatusBadge = ({ status }) => {
    const getStatusColor = () => {
      switch (status.toLowerCase()) {
        case 'moving': return 'bg-green-900 text-green-300';
        case 'parked': return 'bg-yellow-900 text-yellow-300';
        case 'offline': return 'bg-red-900 text-red-300';
        default: return 'bg-gray-900 text-gray-300';
      }
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              ← Back
            </button>
            <img
              src="/assets/logo.png"
              alt="Jaska Technologies"
              className="h-10 w-auto"
            />
            <h1 className="text-2xl font-bold text-cyan-400">Vehicle Details</h1>
          </div>
          <div className="flex items-center space-x-4">
            <StatusBadge status={vehicleData.status} />
            <span className="text-2xl font-bold text-white">{vehicle?.vehicleNo || 'KA01AB1234'}</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Google Maps Section */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">Live Location</h2>
          <MapSection />
        </div>

        {/* Vehicle Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Driver Information */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-xl">👤</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-400">Driver</h3>
                <p className="text-gray-400 text-sm">Current operator</p>
              </div>
            </div>
            <p className="text-white text-xl font-medium">{vehicleData.driverName}</p>
          </div>

          {/* Vehicle ID */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-xl">🚗</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-400">Vehicle ID</h3>
                <p className="text-gray-400 text-sm">System identifier</p>
              </div>
            </div>
            <p className="text-white text-xl font-medium">{vehicleData.vehicleId}</p>
          </div>

          {/* Vehicle Type */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-xl">🏎️</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-400">Vehicle Type</h3>
                <p className="text-gray-400 text-sm">Model & specifications</p>
              </div>
            </div>
            <p className="text-white font-medium">{vehicleData.vehicleType}</p>
          </div>

          {/* Last Ping */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-xl">📡</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-400">Last Ping</h3>
                <p className="text-gray-400 text-sm">Latest communication</p>
              </div>
            </div>
            <p className="text-white text-xl font-medium">{vehicleData.lastPing}</p>
          </div>

          {/* Distance Covered */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-xl">📏</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-400">Distance Today</h3>
                <p className="text-gray-400 text-sm">Total kilometers</p>
              </div>
            </div>
            <p className="text-white text-xl font-medium">{vehicleData.distanceCoveredToday}</p>
          </div>

          {/* Average Speed */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-xl">⚡</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-400">Average Speed</h3>
                <p className="text-gray-400 text-sm">Current session</p>
              </div>
            </div>
            <p className="text-white text-xl font-medium">{vehicleData.averageSpeed}</p>
          </div>

          {/* Warnings */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                <span className="text-xl">⚠️</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-400">Warnings</h3>
                <p className="text-gray-400 text-sm">Today's alerts</p>
              </div>
            </div>
            <p className="text-white text-xl font-medium">{vehicleData.warningsHit}</p>
          </div>

          {/* Abnormal Detection */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${vehicleData.abnormalDetected ? 'bg-red-600' : 'bg-green-600'
                }`}>
                <span className="text-xl">{vehicleData.abnormalDetected ? '🚨' : '✅'}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-400">Abnormal Activity</h3>
                <p className="text-gray-400 text-sm">Detection status</p>
              </div>
            </div>
            <p className={`text-xl font-medium ${vehicleData.abnormalDetected ? 'text-red-400' : 'text-green-400'
              }`}>
              {vehicleData.abnormalDetected ? 'Detected' : 'None'}
            </p>
          </div>

          {/* System Uptime */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
                <span className="text-xl">⏱️</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-400">System Uptime</h3>
                <p className="text-gray-400 text-sm">Reliability metric</p>
              </div>
            </div>
            <p className="text-white text-xl font-medium">{vehicleData.systemUptime}</p>
          </div>

          {/* Battery Status */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-xl">🔋</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-400">Battery Status</h3>
                <p className="text-gray-400 text-sm">Current charge level</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-white text-xl font-medium">{vehicleData.batteryStatus}</p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-cyan-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: vehicleData.batteryStatus }}
                ></div>
              </div>
            </div>
          </div>

          {/* Last Charged */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-xl">🔌</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-400">Last Charged</h3>
                <p className="text-gray-400 text-sm">Charging history</p>
              </div>
            </div>
            <p className="text-white text-xl font-medium">{vehicleData.lastCharged}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => onNavigate('live-tracking')}
            className="bg-cyan-500 hover: bg-cyan-300 
                       text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 
                       transform hover:scale-105 shadow-lg hover:shadow-cyan-400/25"
          >
            Start Live Tracking
          </button>

          <button
            onClick={() => onNavigate('customer-support')}
            className="bg-cyan-500 hover:bg-cyan-300
                       text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 
                       transform hover:scale-105 shadow-lg hover:shadow-cyan-400/25"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailPage;