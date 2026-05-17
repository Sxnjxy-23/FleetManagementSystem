# Jaska Technologies - Vehicle Tracking System

A comprehensive vehicle tracking and fleet management system built with React and PHP.

## Features

### Frontend (React)
- **Landing Page**: Modern, responsive design with company branding
- **Authentication**: Combined login/register page with form validation
- **User Details**: Complete profile setup for new users
- **Dashboard**: Main vehicle management interface with:
  - Vehicle listing and status
  - Live tracking controls
  - Quick access to all features
  - Sidebar navigation (Home, Security, Subscription, Settings, Profile)
- **Vehicle Details**: Comprehensive vehicle information page with:
  - Google Maps integration (API key required)
  - Real-time vehicle data
  - Driver information
  - Battery status and system metrics
- **Live Tracking**: Full-screen map view with:
  - Real-time location updates
  - Route planning
  - Emergency controls
- **Customer Support**: 
  - Support ticket system
  - Live chatbot
  - FAQ section
- **Contact Page**: Multiple contact options and team information
- **About Page**: Company information and team details

### Backend (PHP)
- **Database Setup**: Automatic table creation
- **User Authentication**: Secure login/registration
- **User Details Management**: Profile completion system
- **Support System**: Ticket creation and management

## File Structure

```
/workspace/dashboard/
├── public/
│   ├── assets/
│   │   └── /images/Logo.jpg (Jaska Technologies logo)
│   ├── php/
│   │   ├── db.php (Database configuration and setup)
│   │   ├── login.php (Authentication handler)
│   │   ├── details.php (User details handler)
│   │   └── support.php (Support ticket handler)
│   ├── landingpage.html (Static HTML version)
│   └── index.html
├── src/
│   ├── components/
│   │   ├── LandingPage.jsx
│   │   ├── AuthPage.jsx
│   │   ├── UserDetailsPage.jsx
│   │   ├── VehicleDashboard.jsx
│   │   ├── VehicleDetailPage.jsx
│   │   ├── LiveTrackingPage.jsx
│   │   ├── CustomerSupportPage.jsx
│   │   ├── ContactPage.jsx
│   │   └── AboutPage.jsx
│   ├── App.jsx (Main routing component)
│   └── main.jsx
└── package.json
```

## Color Theme
- **Background**: Black (#000000)
- **Primary**: Light Neon Blue (#00bcd4)
- **Secondary**: Dark Blue (#2196f3)
- **Accent**: Cyan (#00ffff)
- **Text**: White (#ffffff)
- **Muted**: Gray (#666666)

## Database Schema

### Users Table
- id (INT, PRIMARY KEY)
- email (VARCHAR, UNIQUE)
- phone (VARCHAR)
- password (VARCHAR, hashed)
- created_at (TIMESTAMP)

### User Details Table
- id (INT, PRIMARY KEY)
- user_id (INT, FOREIGN KEY)
- aadhar_no (VARCHAR)
- age (INT)
- gender (VARCHAR)
- father_name (VARCHAR)
- address (TEXT)
- vehicle_no (VARCHAR)
- chassis_no (VARCHAR)
- created_at (TIMESTAMP)

### Support Tickets Table
- id (INT, PRIMARY KEY)
- user_id (INT, FOREIGN KEY)
- subject (VARCHAR)
- priority (ENUM)
- category (VARCHAR)
- description (TEXT)
- status (ENUM)
- created_at (TIMESTAMP)

## Setup Instructions

1. **Database Setup**:
   - Create MySQL database named `jaska_tracking`
   - Update database credentials in `public/php/db.php`
   - Tables will be created automatically on first run

2. **Google Maps Integration**:
   - Get Google Maps API key
   - Replace "API Key Required" placeholders in:
     - VehicleDetailPage.jsx
     - LiveTrackingPage.jsx

3. **Development**:
   ```bash
   cd /workspace/dashboard
   pnpm install
   pnpm run dev
   ```

4. **Production Build**:
   ```bash
   pnpm run build
   ```

## API Endpoints

- `POST /php/login.php` - User authentication
- `POST /php/details.php` - Save user details  
- `POST /php/support.php` - Create support ticket

## Features to Implement (Future)

1. Real GPS tracking integration
2. Vehicle immobilization system
3. Geofencing and alerts
4. Mobile app companion
5. Advanced analytics dashboard
6. Multi-language support
7. Payment gateway integration
8. SMS/Email notifications

## Security Features

- Password hashing with PHP's password_hash()
- SQL injection prevention with prepared statements
- Input validation and sanitization
- CORS headers for API security
- Form validation on both frontend and backend

## Contact Information

For development queries or customization requests, contact the development team.

---

Built with ❤️ by MGX Team for Jaska Technologies