// Use localhost for development, deployed URL for production
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? "http://3.6.93.205:3000" 
  : "http://localhost:3000";
