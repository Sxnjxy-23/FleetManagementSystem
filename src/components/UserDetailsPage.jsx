import React, { useState } from 'react';

const UserDetailsPage = ({ onNavigate, onComplete }) => {
  const [formData, setFormData] = useState({
    aadharNo: '',
    age: '',
    gender: '',
    fatherName: '',
    address: '',
    vehicleNo: '',
    chassisNo: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.aadharNo) {
      newErrors.aadharNo = 'Aadhar number is required';
    } else if (!/^\d{12}$/.test(formData.aadharNo)) {
      newErrors.aadharNo = 'Aadhar number must be 12 digits';
    }

    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age < 18 || formData.age > 100) {
      newErrors.age = 'Age must be between 18 and 100';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.fatherName) {
      newErrors.fatherName = 'Father\'s name is required';
    }

    if (!formData.address) {
      newErrors.address = 'Address is required';
    }

    if (!formData.vehicleNo) {
      newErrors.vehicleNo = 'Vehicle number is required';
    }

    if (!formData.chassisNo) {
      newErrors.chassisNo = 'Chassis number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;

      if (!user || !user.email) {
        setErrors({ general: 'User session not found. Please login again.' });
        return;
      }

      const response = await fetch('/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          ...formData
        }),
      });

      const data = await response.json();

      if (data.success) {
        onComplete(formData);
      } else {
        setErrors({ general: data.message || 'Failed to save details.' });
      }
    } catch (error) {
      console.error('Details submission error:', error);
      setErrors({ general: 'Failed to save details. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 p-6">
        <div className="flex items-center space-x-3">
          <img
            src="/assets/logo.png"
            alt="Jaska Technologies"
            className="h-10 w-auto"
          />
          <h1 className="text-2xl font-bold text-cyan-400">Jaska Technologies</h1>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-[calc(100vh-88px)] px-6 py-12">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-cyan-400 mb-2">Complete Your Profile</h2>
            <p className="text-gray-400">Please provide additional details to set up your account</p>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded">
                  {errors.general}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="aadharNo" className="block text-sm font-medium text-gray-300 mb-2">
                    Aadhar Number
                  </label>
                  <input
                    type="text"
                    id="aadharNo"
                    name="aadharNo"
                    value={formData.aadharNo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white 
                               focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    placeholder="Enter 12-digit Aadhar number"
                    maxLength="12"
                  />
                  {errors.aadharNo && <p className="text-red-400 text-sm mt-1">{errors.aadharNo}</p>}
                </div>

                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white 
                               focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    placeholder="Enter your age"
                    min="18"
                    max="100"
                  />
                  {errors.age && <p className="text-red-400 text-sm mt-1">{errors.age}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-2">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white 
                               focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <p className="text-red-400 text-sm mt-1">{errors.gender}</p>}
                </div>

                <div>
                  <label htmlFor="fatherName" className="block text-sm font-medium text-gray-300 mb-2">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    id="fatherName"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white 
                               focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    placeholder="Enter father's name"
                  />
                  {errors.fatherName && <p className="text-red-400 text-sm mt-1">{errors.fatherName}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white 
                             focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  placeholder="Enter your complete address"
                />
                {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-300 mb-2">
                    Vehicle Number
                  </label>
                  <input
                    type="text"
                    id="vehicleNo"
                    name="vehicleNo"
                    value={formData.vehicleNo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white 
                               focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    placeholder="e.g., KA01AB1234"
                  />
                  {errors.vehicleNo && <p className="text-red-400 text-sm mt-1">{errors.vehicleNo}</p>}
                </div>

                <div>
                  <label htmlFor="chassisNo" className="block text-sm font-medium text-gray-300 mb-2">
                    Chassis Number
                  </label>
                  <input
                    type="text"
                    id="chassisNo"
                    name="chassisNo"
                    value={formData.chassisNo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white 
                               focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    placeholder="Enter chassis number"
                  />
                  {errors.chassisNo && <p className="text-red-400 text-sm mt-1">{errors.chassisNo}</p>}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => onNavigate('auth')}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 
                             rounded-lg transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 
                             text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 
                             transform hover:scale-105 shadow-lg hover:shadow-cyan-400/25"
                >
                  Complete Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;