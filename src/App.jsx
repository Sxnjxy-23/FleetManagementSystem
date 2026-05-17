import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import UserDetailsPage from './components/UserDetailsPage';
import VehicleDashboard from './components/VehicleDashboard';
import VehicleDetailPage from './components/VehicleDetailPage';
import LiveTrackingPage from './components/LiveTrackingPage';
import CustomerSupportPage from './components/CustomerSupportPage';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';



import GravityStarsBackground from './components/GravityStarsBackground';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/verify`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();

          if (data.success) {
            setUser(data.user);
            // Restore last page or default to dashboard
            // For now, default to dashboard if logged in
            if (currentPage === 'landing' || currentPage === 'auth') {
              setCurrentPage('dashboard');
            }
          } else {
            // Token invalid/expired
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error('Session verification failed:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };

    checkSession();
  }, []);

  if (isLoading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }

  const handleNavigation = (page, data = null) => {
    if (page === 'vehicle-detail') {
      setSelectedVehicle(data);
    }
    setCurrentPage(page);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    if (userData.isNewUser) {
      setCurrentPage('user-details');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleUserDetailsComplete = (userDetails) => {
    setUser(prev => ({ ...prev, ...userDetails }));
    setCurrentPage('dashboard');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigation} />;

      case 'auth':
        return <AuthPage onNavigate={handleNavigation} onLogin={handleLogin} />;

      case 'user-details':
        return (
          <UserDetailsPage
            onNavigate={handleNavigation}
            onComplete={handleUserDetailsComplete}
          />
        );

      case 'dashboard':
        return <VehicleDashboard onNavigate={handleNavigation} user={user} />;

      case 'vehicle-detail':
        return (
          <VehicleDetailPage
            onNavigate={handleNavigation}
            vehicle={selectedVehicle}
          />
        );

      case 'live-tracking':
        return <LiveTrackingPage onNavigate={handleNavigation} user={user} />;

      case 'customer-support':
        return <CustomerSupportPage onNavigate={handleNavigation} />;

      case 'contact':
        return <ContactPage onNavigate={handleNavigation} />;

      case 'about':
        return <AboutPage onNavigate={handleNavigation} />;

      // Additional pages that can be added later
      case 'order-system':
        return (
          <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-cyan-400 mb-4">Order Jaska Tracking System</h1>
              <p className="text-gray-400 mb-6">This page is under development</p>
              <button
                onClick={() => handleNavigation('dashboard')}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        );

      case 'customer-rights':
        return (
          <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-cyan-400 mb-4">Customer Rights & Regulations</h1>
              <p className="text-gray-400 mb-6">This page is under development</p>
              <button
                onClick={() => handleNavigation('dashboard')}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        );

      default:
        return <LandingPage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="App relative min-h-screen bg-black text-cyan-400">
      <div className="fixed inset-0 z-0">
        <GravityStarsBackground
          starsCount={100}
          starsSize={3}
          starsOpacity={0.8}
          glowIntensity={20}
          movementSpeed={0.5}
          mouseInfluence={150}
          mouseGravity="attract"
          gravityStrength={100}
          starsInteraction={true}
          starsInteractionType="bounce"
          className="w-full h-full"
        />
      </div>
      <div className="relative z-10">
        {renderCurrentPage()}
      </div>
    </div>
  );
}

export default App;