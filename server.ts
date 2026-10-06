import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateTripPlan, generateChatReply } from './api/_core';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// 1. TRIP PLANNER ENDPOINT
app.post('/api/plan-trip', async (req, res) => {
  try {
    const plan = await generateTripPlan(req.body);
    return res.json(plan);
  } catch (err: any) {
    console.error('Trip plan error:', err);
    return res.status(500).json({
      error: 'Failed to generate itinerary. ' + (err.message || 'Please try again.'),
    });
  }
});

// 2. CHATBOT ENDPOINT ("Ask Bilaspur AI")
app.post('/api/chat', async (req, res) => {
  try {
    const reply = await generateChatReply(req.body);
    return res.json({ reply });
  } catch (err: any) {
    console.error('Chat error:', err);
    return res.status(500).json({
      error: 'Guide assistant encountered an error. ' + (err.message || 'Please try again.'),
    });
  }
});

// Mount static assets from public and dist
app.use(express.static(path.join(__dirname, 'public')));

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bilaspur AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
