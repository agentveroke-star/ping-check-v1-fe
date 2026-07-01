# Ping Check v1 - Frontend

React frontend for the Ping Check v1 service status dashboard.

## Overview

This frontend application displays real-time status information from the backend API, including:
- Ping endpoint response (`/api/ping`)
- Health endpoint status (`/api/health`)
- Auto-refresh functionality
- Connection error handling
- Responsive design

## Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher
- Backend server running on port 3001

## Installation

1. Clone the repository:
```bash
git clone git@github.com:agentveroke-star/ping-check-v1-fe.git
cd ping-check-v1-fe
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode
```bash
npm run dev
```
The application will start on `http://localhost:5173/`

### Production Build
```bash
npm run build
npm run preview
```

## API Integration

The frontend expects the backend to be running on `http://localhost:3001` with the following endpoints:

- `GET /api/ping` - Returns service ping response
- `GET /api/health` - Returns service health status

### Backend Contract
```json
// GET /api/ping response
{
  "message": "pong",
  "service": "ping-check-v1",
  "timestamp": "2026-07-01T19:03:00.000Z"
}

// GET /api/health response
{
  "status": "ok"
}
```

## Project Structure

```
web/
├── src/
│   ├── components/     # React components
│   │   └── StatusDisplay.tsx  # Main status dashboard
│   ├── services/       # API service layer
│   │   └── api.ts      # Axios API client
│   ├── types/          # TypeScript interfaces
│   │   └── api.ts      # API response types
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── public/             # Static assets
├── package.json        # Dependencies and scripts
└── vite.config.ts      # Vite configuration
```

## Features

### 1. Real-time Status Monitoring
- Fetches ping and health status from backend
- Auto-refresh every 5 seconds (configurable)
- Manual refresh button

### 2. Error Handling
- Connection failure detection
- User-friendly error messages
- Retry functionality

### 3. Responsive Design
- Works on desktop and mobile browsers
- Adaptive layout for different screen sizes

### 4. User Interface
- Clean, modern design with gradient background
- Status indicators with color coding
- Timestamp formatting
- Service identification

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking

### Environment Variables

No environment variables are required for local development. The backend URL is hardcoded to `http://localhost:3001/api` in `src/services/api.ts`.

### Modifying the Backend URL

To change the backend URL, update the `baseURL` in `src/services/api.ts`:

```typescript
const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api', // Change this to your backend URL
  // ...
});
```

## Testing

### Manual Testing Checklist

1. **Backend Connection**
   - Start backend server on port 3001
   - Start frontend with `npm run dev`
   - Verify connection to backend
   - Check that ping and health data displays correctly

2. **Auto-refresh Functionality**
   - Enable auto-refresh
   - Verify data updates every 5 seconds
   - Disable auto-refresh and verify manual refresh works

3. **Error Handling**
   - Stop backend server
   - Verify error message displays
   - Restart backend and verify recovery

4. **Responsive Design**
   - Test on different screen sizes
   - Verify layout adapts correctly

## Dependencies

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS3** - Styling

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Notes

- The frontend runs on port 5173 by default
- CORS is configured on the backend for `http://localhost:5173`
- No authentication required for this demonstration project
- All data is fetched in real-time; no persistent storage

## Troubleshooting

### Common Issues

1. **"Failed to connect to backend service"**
   - Ensure backend server is running on port 3001
   - Check network connectivity
   - Verify CORS configuration on backend

2. **"Invalid timestamp format"**
   - Backend should return ISO 8601 timestamp format
   - Check backend API response format

3. **Build errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check TypeScript version compatibility

## License

This project is part of the Ping Check v1 demonstration system.
