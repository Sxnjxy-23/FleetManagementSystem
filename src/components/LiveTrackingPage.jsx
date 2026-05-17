import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import io from 'socket.io-client';

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


import useFetch from '../hooks/useFetch';

const LiveTrackingPage = ({ onNavigate, user }) => {
  const { data: vehiclesData } = useFetch(`/api/vehicles?email=${user?.email}`);
  const userVehicles = vehiclesData || [];
  const [isTracking, setIsTracking] = useState(false);
  const [destination, setDestination] = useState('');
  const [currentPosition, setCurrentPosition] = useState(null); // Start with null to indicate no data
  const [socket, setSocket] = useState(null);
  const [route, setRoute] = useState({
    distance: '0 km',
    estimatedTime: '0 mins',
    traffic: 'Normal'
  });
  const [trackingOptions, setTrackingOptions] = useState({
    showBatteryStations: false,
    optimizedRoute: true,
    showStops: false
  });
  const [vehicleInfo, setVehicleInfo] = useState({
    type: 'Car',
    lastUptime: 'Just now',
    speed: 0,
    driverName: user?.name || 'Sanjay'
  });

  useEffect(() => {
    // Connect to socket
    const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to socket server');
    });

    newSocket.on('position', (data) => {
      // Check if the incoming data belongs to one of the user's vehicles
      const isUserVehicle = userVehicles.some(v => v.vehicleNo === data.device_id);

      if (isUserVehicle) {
        console.log('Received position for user vehicle:', data);
        setCurrentPosition({ lat: data.lat, lng: data.lng });
        setVehicleInfo(prev => ({
          ...prev,
          type: data.vehicleType || prev.type,
          lastUptime: data.lastUptime || prev.lastUptime,
          speed: data.speed_kmph || prev.speed
        }));
        setIsTracking(true);
      } else {
        console.log('Ignored position for unknown vehicle:', data.device_id);
      }
    });

    return () => newSocket.close();
  }, [userVehicles]);

  const handleStartTracking = () => {
    setIsTracking(true);
  };

  const handleStopTracking = () => {
    setIsTracking(false);
  };

  const MapSection = () => (
    <div className="w-full h-[70vh] bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center relative overflow-hidden">
      {currentPosition ? (
        <MapContainer center={currentPosition} zoom={15} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <RecenterMap center={currentPosition} />
          <Marker position={currentPosition}></Marker>
        </MapContainer>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-400">
          <span className="text-4xl mb-4">📡</span>
          <p className="text-xl font-medium">Vehicle not embedded with GPS module</p>
          <p className="text-sm mt-2">Waiting for GPS signal...</p>
        </div>
      )}

      {/* Tracking Controls Overlay */}
      {currentPosition && (
        <div className="absolute top-4 right-4 space-y-2 z-[1000]">
          <div className="bg-gray-900/90 p-3 rounded-lg border border-gray-600">
            <p className="text-white text-sm font-medium">Lat: {currentPosition.lat.toFixed(4)}</p>
          </div>
          <div className="bg-gray-900/90 p-3 rounded-lg border border-gray-600">
            <p className="text-white text-sm font-medium">Lng: {currentPosition.lng.toFixed(4)}</p>
          </div>
          {isTracking && (
            <div className="bg-green-900/90 p-3 rounded-lg border border-green-600">
              <p className="text-green-300 text-sm font-medium">🔴 LIVE</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

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
            <h1 className="text-2xl font-bold text-cyan-400">Live Vehicle Tracking</h1>
          </div>
          <div className="flex items-center space-x-4">
            {isTracking ? (
              <button
                onClick={handleStopTracking}
                className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-lg 
                           transition-colors flex items-center space-x-2"
              >
                <span>⏹️</span>
                <span>Stop Tracking</span>
              </button>
            ) : (
              <button
                onClick={handleStartTracking}
                className="bg-cyan-500 hover: bg-cyan-200 
                           text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 
                           transform hover:scale-105 shadow-lg hover:shadow-cyan-400/25 flex items-center space-x-2"
              >
                <span>Start Tracking</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Controls Panel */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">Tracking Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Destination Input */}
            <div className="md:col-span-2">
              <label className="block text-gray-300 mb-2">Enter Destination</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g., Whitefield, Bangalore"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white 
                           focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            {/* Route Options */}
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={trackingOptions.showBatteryStations}
                  onChange={(e) => setTrackingOptions(prev => ({
                    ...prev,
                    showBatteryStations: e.target.checked
                  }))}
                  className="form-checkbox text-cyan-400"
                />
                <span className="text-gray-300 text-sm">Show Battery Stations</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={trackingOptions.optimizedRoute}
                  onChange={(e) => setTrackingOptions(prev => ({
                    ...prev,
                    optimizedRoute: e.target.checked
                  }))}
                  className="form-checkbox text-cyan-400"
                />
                <span className="text-gray-300 text-sm">Optimized Route</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={trackingOptions.showStops}
                  onChange={(e) => setTrackingOptions(prev => ({
                    ...prev,
                    showStops: e.target.checked
                  }))}
                  className="form-checkbox text-cyan-400"
                />
                <span className="text-gray-300 text-sm">Show Stops</span>
              </label>
            </div>

            {/* Route Info */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-cyan-400 font-medium mb-2">Route Information</h3>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-400">Driver</p>
                  <p className="font-bold text-white">{vehicleInfo.driverName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Vehicle Type</p>
                  <p className="font-bold text-white">{vehicleInfo.type}</p>
                </div>
                <p className="text-gray-300">ETA: <span className="text-white">{route.estimatedTime}</span></p>
                <p className="text-gray-300">Traffic: <span className="text-white">{route.traffic}</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Map */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-cyan-400">Live Map View</h2>
            <div className="flex items-center space-x-4">
              <div className="bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
                <span className="text-gray-400 text-sm mr-2">Type:</span>
                <span className="text-cyan-400 font-bold">{vehicleInfo.type}</span>
              </div>
              <div className="bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
                <span className="text-gray-400 text-sm mr-2">Last Ping:</span>
                <span className="text-green-400 font-bold">{vehicleInfo.lastUptime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-300 text-sm">Current Location</span>
              </div>
            </div>
          </div>
          <MapSection />
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-xl">🚗</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-400">Current Speed</h3>
                <p className="text-gray-400 text-sm">Real-time</p>
              </div>
            </div>
            <p className="text-white text-2xl font-bold">{vehicleInfo.speed} km/h</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-xl">⛽</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-400">Fuel Level</h3>
                <p className="text-gray-400 text-sm">Current tank</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-white text-2xl font-bold">--%</p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-cyan-400 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                <span className="text-xl">🕐</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-400">Travel Time</h3>
                <p className="text-gray-400 text-sm">Current trip</p>
              </div>
            </div>
            <p className="text-white text-2xl font-bold">--</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-xl">📍</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-400">Distance Left</h3>
                <p className="text-gray-400 text-sm">To destination</p>
              </div>
            </div>
            <p className="text-white text-2xl font-bold">-- km</p>
          </div>
        </div>

        {/* Emergency Controls */}
        <div className="bg-red-900/20 border border-red-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-red-400 mb-4">Emergency Controls</h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-lg transition-colors">
              🚨 Emergency Alert
            </button>
            <button className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-6 rounded-lg transition-colors">
              🛑 Immobilize Vehicle
            </button>
            <button className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg transition-colors">
              📞 Call Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTrackingPage;