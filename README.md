# LiveIn — Jaska Technologies

**Advanced Fleet Management and Real-time Vehicle Monitoring**

LiveIn is a full-stack vehicle tracking and fleet management platform. It provides live GPS tracking via WebSockets, a vehicle dashboard with battery / location / status indicators, user authentication with JWT, and management features for registering and monitoring multiple vehicles.

---

## Features

- **User authentication** — register and login with JWT-based session management
- **Vehicle management** — add, view, and manage multiple vehicles per user
- **Live GPS tracking** — real-time vehicle position updates over Socket.IO
- **Interactive map view** — vehicle positions rendered on Leaflet maps
- **Dashboard** — at-a-glance vehicle status, battery level, last-seen, and location
- **Profile management** — personal details, Aadhar masking, mobile, and linked vehicles
- **Customer support & contact** — built-in support and contact pages
- **Animated UI** — gravity-stars background, Framer Motion transitions, Tailwind styling

---

## Tech Stack

**Frontend**
- React 18 + Vite
- Tailwind CSS, MUI, Emotion
- Framer Motion (animations)
- Leaflet + react-leaflet (maps)
- Recharts (analytics charts)
- Socket.IO client (real-time updates)

**Backend**
- Node.js + Express
- Socket.IO (real-time vehicle position broadcasting)
- JSON Web Tokens (jsonwebtoken) for auth
- CORS, dotenv

**Deployment**
- Render (see [render.yaml](render.yaml))

---

## Project Structure

```
LiveIn/
├── src/                    # React frontend
│   ├── components/         # Pages and UI components
│   ├── hooks/              # Custom React hooks (useFetch, etc.)
│   ├── lib/                # Shared utilities
│   ├── data/               # Static / mock data
│   ├── App.jsx             # App router (page state)
│   └── main.jsx            # React entry point
├── server/                 # Express backend
│   ├── routes/api.js       # REST API endpoints
│   ├── index.js            # Server + Socket.IO bootstrap
│   └── package.json
├── public/                 # Static assets
├── simulate_gps.js         # GPS simulator for testing the /api/track endpoint
├── render.yaml             # Render deployment config
├── vite.config.js
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### 1. Clone the repo

```bash
git clone https://github.com/Sxnjxy-23/FleetManagementSystem.git
cd FleetManagementSystem
```

### 2. Install frontend dependencies

```bash
pnpm install
```

### 3. Install backend dependencies

```bash
cd server
npm install
cd ..
```

### 4. Configure environment

Create a `.env` file in the project root for the frontend:

```env
VITE_API_URL=http://localhost:5000
```

And a `.env` file inside `server/` for the backend:

```env
PORT=5000
JWT_SECRET=your-secret-key
```

### 5. Run the backend

```bash
cd server
npm run dev
```

The API will be available at `http://localhost:5000`.

### 6. Run the frontend (in a separate terminal)

```bash
pnpm run dev
```

The frontend will open at `http://localhost:5173`.

---

## Available Scripts

### Frontend (root)
| Command | Description |
| ------- | ----------- |
| `pnpm run dev` | Start the Vite development server |
| `pnpm run build` | Build the production bundle into `dist/` |
| `pnpm run preview` | Preview the production build locally |
| `pnpm run lint` | Run ESLint over `src/` |

### Backend (`server/`)
| Command | Description |
| ------- | ----------- |
| `npm start` | Start the Express server |
| `npm run dev` | Start the server with `--watch` for auto-reload |

---

## API Reference

Base URL: `http://localhost:5000/api`

### Authentication
- `POST /register` — register a new user (`email`, `password`, `phone`, optional vehicle fields)
- `POST /login` — login and receive a JWT
- `GET /verify` — verify a JWT (Bearer token)
- `POST /update-profile` — update user profile fields

### Vehicles
- `GET /vehicles?email=<email>` — list all vehicles for the user
- `POST /vehicles` — add a new vehicle (`{ email, vehicle: { vehicleNo, type, model, color, year } }`)

### Tracking
- `POST /track` — push a GPS position (`{ device_id, lat, lng, speed_kmph, timestamp }`). The server stores the last position and broadcasts a `position` event over Socket.IO to all connected clients.

### Misc
- `GET /charts/{area|bar|pie|line|radar}` — sample chart data
- `GET /stats` — sample dashboard stats

---

## Real-time Tracking

The server emits a `position` event whenever a `POST /api/track` request arrives. The frontend's dashboard and live-tracking pages listen on the Socket.IO connection and update vehicle markers / cards in real time.

### Simulating GPS

A simulator script is included for testing:

```bash
node simulate_gps.js
```

It sends synthetic positions to `/api/track` so you can see live updates without real GPS hardware.

---

## Deployment

The repository includes a [render.yaml](render.yaml) blueprint for deploying to [Render](https://render.com/):

- **livein-backend** — Node web service running `server/`
- **livein-frontend** — static site built from the Vite output in `dist/`, with `VITE_API_URL` wired to the backend service URL

Push to a Render-connected GitHub repository and the blueprint will provision both services automatically.

---

## Notes & Limitations

- The user and vehicle stores are currently **in-memory** in [server/routes/api.js](server/routes/api.js). Data resets when the server restarts. For production, swap this for Supabase (already a frontend dependency) or any persistent database.
- JWTs expire after **5 minutes** by default — adjust `expiresIn` in [server/routes/api.js](server/routes/api.js) for longer sessions.
- The default `JWT_SECRET` in code is a placeholder. **Always** override it via the environment in production.

---

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

This project is provided as-is for educational and demonstration purposes. Add an appropriate license (MIT, Apache-2.0, etc.) before public release.

---

## Acknowledgements

- Built with React, Vite, Express, Socket.IO, and Leaflet
- UI inspired by Jaska Technologies' fleet-management product concept
