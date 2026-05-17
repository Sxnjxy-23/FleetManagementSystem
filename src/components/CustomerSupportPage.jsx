import React, { useState } from 'react';

const CustomerSupportPage = ({ onNavigate }) => {
  const [ticket, setTicket] = useState({
    subject: '',
    priority: 'medium',
    category: 'general',
    description: ''
  });
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      message: 'Hello! I\'m Jaska Support Bot. How can I help you today?',
      timestamp: new Date(Date.now() - 5000)
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    console.log('Ticket submitted:', ticket);
    // Here you would normally send to PHP backend
    alert('Support ticket submitted successfully! We\'ll get back to you within 24 hours.');
    setTicket({ subject: '', priority: 'medium', category: 'general', description: '' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      message: newMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        sender: 'bot',
        message: getBotResponse(newMessage),
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('tracking') || lowerMessage.includes('location')) {
      return 'For tracking issues, please check if your device is powered on and has GPS signal. You can also restart the tracking from your dashboard.';
    } else if (lowerMessage.includes('battery') || lowerMessage.includes('power')) {
      return 'Battery issues are common. Please ensure your tracking device is properly charged. The battery should last 5-7 days on normal usage.';
    } else if (lowerMessage.includes('login') || lowerMessage.includes('password')) {
      return 'For login issues, please try resetting your password or contact our technical team at tech@jaskatechnologies.com';
    } else {
      return 'Thank you for your message. Our support team will assist you shortly. For urgent matters, please call our helpline: +91-80-XXXX-XXXX';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 p-6">
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
          <h1 className="text-2xl font-bold text-cyan-400">Customer Support</h1>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Support Ticket Form */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Submit Support Ticket</h2>
            <form onSubmit={handleTicketSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Subject</label>
                <input
                  type="text"
                  value={ticket.subject}
                  onChange={(e) => setTicket(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white 
                             focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  placeholder="Brief description of your issue"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Priority</label>
                  <select
                    value={ticket.priority}
                    onChange={(e) => setTicket(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white 
                               focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Category</label>
                  <select
                    value={ticket.category}
                    onChange={(e) => setTicket(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white 
                               focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  >
                    <option value="general">General Support</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing</option>
                    <option value="tracking">Tracking Problem</option>
                    <option value="device">Device Issue</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  value={ticket.description}
                  onChange={(e) => setTicket(prev => ({ ...prev, description: e.target.value }))}
                  rows="6"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white 
                             focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  placeholder="Please provide detailed information about your issue..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 
                           text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 
                           transform hover:scale-105 shadow-lg hover:shadow-cyan-400/25"
              >
                Submit Ticket
              </button>
            </form>
          </div>

          {/* Quick Help & FAQ */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h2 className="text-xl font-bold text-cyan-400 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="text-white font-medium">Support Helpline</p>
                    <p className="text-gray-400">+91-80-XXXX-XXXX</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="text-white font-medium">Email Support</p>
                    <p className="text-gray-400">support@jaskatechnologies.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🕐</span>
                  <div>
                    <p className="text-white font-medium">Support Hours</p>
                    <p className="text-gray-400">24/7 Emergency | 9 AM - 6 PM General</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h2 className="text-xl font-bold text-cyan-400 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="border-b border-gray-700 pb-3">
                  <h3 className="text-white font-medium mb-2">How do I reset my tracking device?</h3>
                  <p className="text-gray-400 text-sm">Hold the reset button for 10 seconds until the LED blinks red, then release.</p>
                </div>
                <div className="border-b border-gray-700 pb-3">
                  <h3 className="text-white font-medium mb-2">Why is my vehicle not showing on the map?</h3>
                  <p className="text-gray-400 text-sm">Check if the device has power and GPS signal. Try refreshing the page or restarting live tracking.</p>
                </div>
                <div className="border-b border-gray-700 pb-3">
                  <h3 className="text-white font-medium mb-2">How long does the battery last?</h3>
                  <p className="text-gray-400 text-sm">The device battery typically lasts 5-7 days with normal usage and GPS tracking enabled.</p>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-2">Can I track multiple vehicles?</h3>
                  <p className="text-gray-400 text-sm">Yes, you can add multiple vehicles to your account. Check your subscription plan for limits.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chatbot Section */}
        <div className="fixed bottom-6 right-6">
          <div className={`bg-gray-900 border border-gray-800 rounded-lg shadow-2xl transition-all duration-300 ${
            showChat ? 'w-96 h-96' : 'w-16 h-16'
          }`}>
            {showChat ? (
              <div className="flex flex-col h-full">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-400 p-4 rounded-t-lg flex items-center justify-between">
                  <h3 className="text-white font-bold">Jaska Support Bot</h3>
                  <button
                    onClick={() => setShowChat(false)}
                    className="text-white hover:text-gray-200"
                  >
                    ✕
                  </button>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs p-3 rounded-lg ${
                          msg.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-300'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white 
                                 focus:outline-none focus:border-cyan-400 text-sm"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <button
                onClick={() => setShowChat(true)}
                className="w-full h-full bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 
                           rounded-lg flex items-center justify-center text-2xl text-white transition-all duration-300 
                           transform hover:scale-110 shadow-lg hover:shadow-cyan-400/25"
              >
                💬
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupportPage;