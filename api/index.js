import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.js';

const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Hatt API is running' });
});

// API routes
app.use('/api', apiRoutes);

// For Vercel serverless
export default app;
