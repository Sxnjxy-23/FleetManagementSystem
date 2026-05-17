import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import useFetch from '../hooks/useFetch';

const VehicleDashboard = ({ onNavigate, user }) => {
  const { data: vehiclesData, loading, error } = useFetch(`/api/vehicles?email=${user?.email}`);
  const [vehicles, setVehicles] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    vehicleNo: '',
    type: 'Car',
    model: '',
    color: '',
    year: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    if (vehiclesData) {
      setVehicles(vehiclesData);
    }
  }, [vehiclesData]);

  const resetAddForm = () => {
    setNewVehicle({ vehicleNo: '', type: 'Car', model: '', color: '', year: '' });
    setSubmitError(null);
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    if (!user?.email) {
      setSubmitError('You must be signed in to add a vehicle.');
      return;
    }
    if (!newVehicle.vehicleNo.trim()) {
      setSubmitError('Vehicle number is required.');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${baseUrl}/api/vehicles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          vehicle: {
            vehicleNo: newVehicle.vehicleNo.trim().toUpperCase(),
            type: newVehicle.type,
            model: newVehicle.model.trim() || 'Unknown',
            color: newVehicle.color.trim() || undefined,
            year: newVehicle.year.trim() || undefined,
          },
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to add vehicle');
      }
      setVehicles((prev) => [...prev, result.vehicle]);
      setShowAddModal(false);
      resetAddForm();
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000');

    socket.on('connect', () => {
      console.log('Dashboard connected to socket');
    });

    socket.on('position', (data) => {
      setVehicles(prevVehicles => prevVehicles.map(v => {
        if (v.vehicleNo === data.device_id) {
          return {
            ...v,
            location: `${data.lat.toFixed(4)}, ${data.lng.toFixed(4)}`,
            lastSeen: data.lastUptime || new Date().toISOString(),
            status: 'Active',
            batteryLevel: v.batteryLevel // Maintain existing battery level or update if data available
          };
        }
        return v;
      }));
    });

    return () => socket.close();
  }, []);

  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-cyan-400">Your Vehicles</h2>
                <button
                  onClick={() => { resetAddForm(); setShowAddModal(true); }}
                  className="bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-500 hover:to-cyan-300
                             text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300
                             shadow-lg hover:shadow-cyan-400/25"
                >
                  + Add New Vehicle
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    onClick={() => onNavigate('vehicle-detail', vehicle)}
                    className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-cyan-400
                               cursor-pointer transition-all duration-300 transform hover:scale-105
                               hover:shadow-lg hover:shadow-cyan-400/25"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{vehicle.vehicleNo}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${vehicle.status === 'Active'
                        ? 'bg-green-900 text-green-300'
                        : 'bg-yellow-900 text-yellow-300'
                        }`}>
                        {vehicle.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-gray-300">
                      <p><span className="text-gray-500">Type:</span> {vehicle.type}</p>
                      <p><span className="text-gray-500">Location:</span> {vehicle.location}</p>
                      <p><span className="text-gray-500">Last Seen:</span> {vehicle.lastSeen}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">Battery:</span>
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-500 to-cyan-400 h-2 rounded-full"
                            style={{ width: `${vehicle.batteryLevel}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{vehicle.batteryLevel}%</span>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => { resetAddForm(); setShowAddModal(true); }}
                  className="bg-gray-800/50 p-6 rounded-lg border-2 border-dashed border-gray-700
                             hover:border-cyan-400 hover:bg-gray-800 transition-all duration-300
                             flex flex-col items-center justify-center text-gray-400 hover:text-cyan-400
                             min-h-[180px]"
                >
                  <div className="text-5xl mb-2">+</div>
                  <div className="font-semibold">Add New Vehicle</div>
                  <p className="text-sm text-gray-500 mt-1">Register a vehicle to track</p>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => onNavigate('live-tracking')}
                className="bg-cyan-500 hover: cyan-300 
                           text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 
                           transform hover:scale-105 shadow-lg hover:shadow-cyan-400/25 text-lg"
              >
                Enable Live Tracking
              </button>

              <button
                onClick={() => onNavigate('order-system')}
                className="bg-cyan-500 hover: bg-cyan-300 
                           text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 
                           transform hover:scale-105 shadow-lg hover:shadow-cyan-400/25 text-lg"
              >
                Order Jaska Live Tracking System
              </button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => onNavigate('customer-support')}
                className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg border border-gray-700 
                           hover:border-cyan-400 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🎧</div>
                  <h3 className="font-bold text-cyan-400">Customer Support</h3>
                  <p className="text-gray-400 text-sm">Get help & support</p>
                </div>
              </button>

              <button
                onClick={() => onNavigate('customer-rights')}
                className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg border border-gray-700 
                           hover:border-cyan-400 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">📋</div>
                  <h3 className="font-bold text-cyan-400">Customer Rights</h3>
                  <p className="text-gray-400 text-sm">Rights & regulations</p>
                </div>
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg border border-gray-700 
                           hover:border-cyan-400 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">📞</div>
                  <h3 className="font-bold text-cyan-400">Contact Team</h3>
                  <p className="text-gray-400 text-sm">Reach out to us</p>
                </div>
              </button>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Security Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Anti-theft Protection</h3>
                  <p className="text-gray-400 text-sm">Real-time theft detection and alerts</p>
                </div>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg">Enabled</button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Movement Alerts</h3>
                  <p className="text-gray-400 text-sm">Get notified when vehicle moves</p>
                </div>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg">Enabled</button>
              </div>
            </div>
          </div>
        );

      case 'subscription':
        return (
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Subscription Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Basic</h3>
                <p className="text-3xl font-bold text-cyan-400 mb-4">₹999<span className="text-sm text-gray-400">/month</span></p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Real-time tracking</li>
                  <li>• Basic alerts</li>
                  <li>• 1 vehicle</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-cyan-400 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-4">Premium</h3>
                <p className="text-3xl font-bold text-white mb-4">₹1999<span className="text-sm text-gray-200">/month</span></p>
                <ul className="space-y-2 text-white">
                  <li>• Everything in Basic</li>
                  <li>• Advanced analytics</li>
                  <li>• Up to 5 vehicles</li>
                  <li>• 24/7 support</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Enterprise</h3>
                <p className="text-3xl font-bold text-cyan-400 mb-4">₹4999<span className="text-sm text-gray-400">/month</span></p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Everything in Premium</li>
                  <li>• Unlimited vehicles</li>
                  <li>• Custom features</li>
                  <li>• Dedicated support</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Notifications</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="form-checkbox text-cyan-400" defaultChecked />
                    <span className="text-gray-300">Email notifications</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="form-checkbox text-cyan-400" defaultChecked />
                    <span className="text-gray-300">SMS alerts</span>
                  </label>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Privacy</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="form-checkbox text-cyan-400" defaultChecked />
                    <span className="text-gray-300">Share location data for analytics</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Profile Settings</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Full Name</label>
                  <p className="text-white text-lg font-medium">{user?.name || 'User'}</p>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Email Address</label>
                  <p className="text-white text-lg font-medium">{user?.email}</p>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Mobile Number</label>
                  <p className="text-white text-lg font-medium">{user?.phone || '--'}</p>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Aadhar Number</label>
                  <p className="text-white text-lg font-medium">
                    {user?.aadharNo ? `********${user.aadharNo.slice(-4)}` : '--'}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-6">
                <h3 className="text-xl font-bold text-white mb-4">Vehicle Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {vehicles.map((v, idx) => (
                    <div key={idx} className="bg-gray-800 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-cyan-400 font-bold">{v.vehicleNo}</p>
                          <p className="text-gray-300">{v.model || 'Unknown Model'} ({v.type})</p>
                        </div>
                        <span className="bg-green-900 text-green-300 text-xs px-2 py-1 rounded">
                          {v.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-6 py-2 rounded-lg mt-4">
                Edit Profile
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/assets/logo.png"
              alt="Jaska Technologies"
              className="h-10 w-auto"
            />
            <h1 className="text-2xl font-bold text-cyan-500">Vehicle Management</h1>
          </div>
          <button
            onClick={() => onNavigate('landing')}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 border-r border-gray-800 min-h-[calc(100vh-88px)]">
          <nav className="p-6">
            <ul className="space-y-2">
              {[
                { id: 'home', label: 'Home' },
                { id: 'security', label: 'Security' },
                { id: 'subscription', label: 'Subscription' },
                { id: 'settings', label: 'Settings' },
                { id: 'profile', label: 'Profile' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${activeTab === item.id
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-400 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>

      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => !submitting && setShowAddModal(false)}
        >
          <div
            className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-cyan-400">Add New Vehicle</h3>
              <button
                onClick={() => !submitting && setShowAddModal(false)}
                className="text-gray-400 hover:text-white text-2xl leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddVehicle} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Vehicle Number *</label>
                <input
                  type="text"
                  required
                  value={newVehicle.vehicleNo}
                  onChange={(e) => setNewVehicle({ ...newVehicle, vehicleNo: e.target.value })}
                  placeholder="e.g. TN10AB1234"
                  className="w-full bg-gray-800 border border-gray-700 focus:border-cyan-400 outline-none
                             text-white rounded-lg px-3 py-2 uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Vehicle Type *</label>
                  <select
                    value={newVehicle.type}
                    onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 focus:border-cyan-400 outline-none
                               text-white rounded-lg px-3 py-2"
                  >
                    <option>Car</option>
                    <option>Bike</option>
                    <option>Truck</option>
                    <option>Auto</option>
                    <option>Bus</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Year</label>
                  <input
                    type="number"
                    min="1950"
                    max="2099"
                    value={newVehicle.year}
                    onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                    placeholder="2024"
                    className="w-full bg-gray-800 border border-gray-700 focus:border-cyan-400 outline-none
                               text-white rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Model</label>
                  <input
                    type="text"
                    value={newVehicle.model}
                    onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                    placeholder="e.g. Swift Dzire"
                    className="w-full bg-gray-800 border border-gray-700 focus:border-cyan-400 outline-none
                               text-white rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Color</label>
                  <input
                    type="text"
                    value={newVehicle.color}
                    onChange={(e) => setNewVehicle({ ...newVehicle, color: e.target.value })}
                    placeholder="e.g. White"
                    className="w-full bg-gray-800 border border-gray-700 focus:border-cyan-400 outline-none
                               text-white rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              {submitError && (
                <div className="bg-red-900/40 border border-red-700 text-red-300 text-sm rounded-lg px-3 py-2">
                  {submitError}
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800
                             disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-400 text-white
                             font-semibold hover:from-blue-500 hover:to-cyan-300 disabled:opacity-50"
                >
                  {submitting ? 'Saving…' : 'Save Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleDashboard;