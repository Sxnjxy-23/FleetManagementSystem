import React from 'react';

const AboutPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 p-6">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('landing')}
            className="text-gray-400 hover:text-cyan-400 transition-colors"
          >
            ← Back
          </button>
          <img 
            src="/assets/logo.png" 
            alt="Jaska Technologies" 
            className="h-10 w-auto"
          />
          <h1 className="text-2xl font-bold text-cyan-400">About Us</h1>
        </div>
      </div>

      <div className="p-6 space-y-12">
        {/* Hero Section */}
        <div className="text-center">
          <h2 className="text-5xl font-bold text-cyan-400 mb-6">
            JASKA TECHNOLOGIES
          </h2>
          <p className="text-2xl text-gray-300 mb-8">
            Leading the Future of Vehicle Tracking & Fleet Management
          </p>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-400 leading-relaxed">
              Founded with a vision to revolutionize vehicle security and fleet management, 
              Jaska Technologies has been at the forefront of GPS tracking innovation for over a decade. 
              We combine cutting-edge technology with exceptional service to provide comprehensive 
              solutions for individuals and businesses alike.
            </p>
          </div>
        </div>

        {/* Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-cyan-400 mb-6">Our Story</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                Established in 2012 in the tech hub of Bangalore, Jaska Technologies began as a 
                small startup with a big dream: to make vehicle tracking accessible, reliable, 
                and intelligent for everyone.
              </p>
              <p>
                What started as a team of five passionate engineers has grown into a leading 
                technology company serving thousands of customers across India. Our journey 
                has been marked by continuous innovation, customer-centric solutions, and 
                unwavering commitment to security.
              </p>
              <p>
                Today, we're proud to be trusted by individuals, small businesses, and large 
                enterprises for their most critical vehicle tracking and fleet management needs.
              </p>
            </div>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
            <div className="text-center">
              <div className="text-6xl mb-4">🚗</div>
              <h4 className="text-2xl font-bold text-cyan-400 mb-4">By the Numbers</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-white">10,000+</p>
                  <p className="text-gray-400">Vehicles Tracked</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">99.9%</p>
                  <p className="text-gray-400">Uptime</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">24/7</p>
                  <p className="text-gray-400">Support</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">50+</p>
                  <p className="text-gray-400">Cities Covered</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 p-8 rounded-lg border border-gray-800">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-cyan-400">Our Mission</h3>
            </div>
            <p className="text-gray-300 text-center leading-relaxed">
              To provide world-class vehicle tracking solutions that enhance security, 
              improve efficiency, and give peace of mind to our customers through 
              innovative technology and exceptional service.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-8 rounded-lg border border-gray-800">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔮</span>
              </div>
              <h3 className="text-2xl font-bold text-cyan-400">Our Vision</h3>
            </div>
            <p className="text-gray-300 text-center leading-relaxed">
              To be the global leader in intelligent vehicle tracking and IoT solutions, 
              creating a safer and more connected world where every vehicle is secure, 
              monitored, and optimally managed.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div>
          <h3 className="text-3xl font-bold text-cyan-400 mb-8 text-center">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🛡️</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Security First</h4>
              <p className="text-gray-400">
                Every solution we build prioritizes the security and privacy of our customers' 
                data and assets.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Innovation</h4>
              <p className="text-gray-400">
                We continuously push the boundaries of technology to deliver cutting-edge 
                solutions that exceed expectations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Customer Success</h4>
              <p className="text-gray-400">
                Our customers' success is our success. We go above and beyond to ensure 
                satisfaction and long-term partnerships.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
          <h3 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Our Technology</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🛰️</div>
              <h4 className="text-lg font-bold text-white mb-2">GPS Tracking</h4>
              <p className="text-gray-400 text-sm">Real-time location with sub-meter accuracy</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📡</div>
              <h4 className="text-lg font-bold text-white mb-2">IoT Integration</h4>
              <p className="text-gray-400 text-sm">Connected devices and smart sensors</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">☁️</div>
              <h4 className="text-lg font-bold text-white mb-2">Cloud Platform</h4>
              <p className="text-gray-400 text-sm">Scalable and secure cloud infrastructure</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🤖</div>
              <h4 className="text-lg font-bold text-white mb-2">AI Analytics</h4>
              <p className="text-gray-400 text-sm">Machine learning for predictive insights</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h3 className="text-3xl font-bold text-cyan-400 mb-8 text-center">Leadership Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍💼</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Rajesh Kumar</h4>
              <p className="text-cyan-400 mb-3">CEO & Founder</p>
              <p className="text-gray-400 text-sm">
                20+ years in automotive technology and IoT solutions. 
                Visionary leader driving innovation in vehicle tracking.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👩‍💻</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Priya Sharma</h4>
              <p className="text-cyan-400 mb-3">CTO</p>
              <p className="text-gray-400 text-sm">
                Expert in GPS technology and embedded systems. 
                Leading our technical innovation and product development.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍🔧</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Amit Patel</h4>
              <p className="text-cyan-400 mb-3">Head of Operations</p>
              <p className="text-gray-400 text-sm">
                Ensures seamless operations and customer satisfaction. 
                Expert in scaling technology solutions for enterprise clients.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-cyan-400 p-8 rounded-lg">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Secure Your Fleet?</h3>
          <p className="text-white mb-6 text-lg">
            Join thousands of satisfied customers who trust Jaska Technologies 
            for their vehicle tracking and security needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('auth')}
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 
                         transition-colors text-lg"
            >
              Get Started Today
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg 
                         hover:bg-white hover:text-blue-600 transition-all duration-300 text-lg"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;