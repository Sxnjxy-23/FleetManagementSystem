import React from 'react';

const ContactPage = ({ onNavigate }) => {
  const contactTeams = [
    {
      name: 'Help Team',
      email: 'help@jaskatechnologies.com',
      description: 'General assistance and support queries',
      icon: '🎧',
      color: 'from-blue-600 to-cyan-400'
    },
    {
      name: 'Tracking Team',
      email: 'tracking@jaskatechnologies.com',
      description: 'GPS tracking and technical issues',
      icon: '📍',
      color: 'from-green-600 to-teal-400'
    },
    {
      name: 'Security Team',
      email: 'security@jaskatechnologies.com',
      description: 'Security alerts and emergency response',
      icon: '🔒',
      color: 'from-red-600 to-orange-400'
    },
    {
      name: 'Sales Team',
      email: 'sales@jaskatechnologies.com',
      description: 'Product inquiries and subscriptions',
      icon: '💼',
      color: 'from-purple-600 to-pink-400'
    }
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/jaskatechnologies',
      icon: '📷',
      color: 'from-pink-600 to-purple-400'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/jaskatechnologies',
      icon: '💼',
      color: 'from-blue-600 to-blue-400'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/jaskatech',
      icon: '🐦',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/jaskatechnologies',
      icon: '📘',
      color: 'from-blue-700 to-blue-500'
    }
  ];

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
          <h1 className="text-2xl font-bold text-cyan-400">Contact Us</h1>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-cyan-400 mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We're here to help you with all your vehicle tracking needs. 
            Reach out to our specialized teams for quick and efficient support.
          </p>
        </div>

        {/* Contact Teams */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Contact Our Teams</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactTeams.map((team, index) => (
              <div
                key={index}
                className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-cyan-400 
                           transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${team.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <span className="text-2xl">{team.icon}</span>
                </div>
                <h4 className="text-xl font-bold text-cyan-400 text-center mb-2">{team.name}</h4>
                <p className="text-gray-400 text-sm text-center mb-4">{team.description}</p>
                <a
                  href={`mailto:${team.email}`}
                  className="block text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg 
                             text-center transition-colors text-sm"
                >
                  {team.email}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Main Contact Information */}
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
          <h3 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Main Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📞</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Phone Support</h4>
              <p className="text-gray-400 mb-2">24/7 Emergency Helpline</p>
              <p className="text-cyan-400 font-medium">+91-80-XXXX-XXXX</p>
              <p className="text-gray-400 text-sm mt-1">General Support: 9 AM - 6 PM</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Email Support</h4>
              <p className="text-gray-400 mb-2">General Inquiries</p>
              <a
                href="mailto:info@jaskatechnologies.com"
                className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
              >
                info@jaskatechnologies.com
              </a>
              <p className="text-gray-400 text-sm mt-1">Response within 24 hours</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Office Address</h4>
              <p className="text-gray-400 mb-2">Headquarters</p>
              <p className="text-cyan-400 font-medium">Electronic City, Bangalore</p>
              <p className="text-gray-400 text-sm mt-1">Karnataka, India - 560100</p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Follow Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-cyan-400 
                           transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25 
                           text-center block"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${social.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <span className="text-2xl">{social.icon}</span>
                </div>
                <h4 className="text-xl font-bold text-cyan-400 mb-2">{social.name}</h4>
                <p className="text-gray-400 text-sm">Follow us for updates</p>
              </a>
            ))}
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 text-center">Business Hours</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <div>
              <h4 className="text-lg font-bold text-white mb-2">🕐 General Support</h4>
              <div className="space-y-1 text-gray-300">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-2">🚨 Emergency Support</h4>
              <div className="space-y-1 text-gray-300">
                <p>Available 24/7</p>
                <p>Immediate response for:</p>
                <p className="text-sm">• Vehicle theft alerts</p>
                <p className="text-sm">• Emergency tracking</p>
                <p className="text-sm">• Critical system failures</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-cyan-400 p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-white mb-4">Need Immediate Assistance?</h3>
          <p className="text-white mb-6">
            Our support team is ready to help you with any urgent tracking or security concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+918012345678"
              className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 
                         transition-colors"
            >
              📞 Call Emergency Line
            </a>
            <button
              onClick={() => onNavigate('customer-support')}
              className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg 
                         hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              💬 Live Chat Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;