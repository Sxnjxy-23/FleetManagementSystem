import React from 'react';

const LandingPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <img
            src="/assets/logo.png"
            alt="Jaska Technologies"
            className="h-12 w-auto"
          />
        </div>
        <div className="flex space-x-6">
          <button
            onClick={() => onNavigate('about')}
            className="text-gray-300 hover:text-cyan-400 transition-colors"
          >
            About Us
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="text-gray-300 hover:text-cyan-400 transition-colors"
          >
            Contact
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-cyan-400">JASKA</span>
            <br />
            <span className="text-blue-600">TECHNOLOGIES</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl">
            Advanced Fleet Management and Real-time Vehicle Monitoring Solutions
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl">
            Experience cutting-edge vehicle tracking technology with real-time GPS monitoring,
            comprehensive fleet analytics, and intelligent security features designed to keep
            your vehicles safe and your operations efficient.
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onNavigate('auth')}
          className="bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 
                     text-white font-bold py-4 px-12 rounded-lg text-xl transition-all duration-300 
                     transform hover:scale-105 shadow-lg hover:shadow-cyan-400/25"
        >
          Get Started - Register / Login
        </button>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl">
          <div className="text-center p-6 border border-gray-800 rounded-lg bg-gray-900/50">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-400/25">
              <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-cyan-400 mb-2">Real-time Tracking</h3>
            <p className="text-gray-400">Monitor your vehicles in real-time with precise GPS coordinates and live updates</p>
          </div>

          <div className="text-center p-6 border border-gray-800 rounded-lg bg-gray-900/50">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-400/25">
              <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-cyan-400 mb-2">Advanced Security</h3>
            <p className="text-gray-400">Comprehensive security features with instant alerts and theft prevention</p>
          </div>

          <div className="text-center p-6 border border-gray-800 rounded-lg bg-gray-900/50">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-400/25">
              <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-cyan-400 mb-2">Fleet Analytics</h3>
            <p className="text-gray-400">Detailed analytics and reporting for optimal fleet management</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;