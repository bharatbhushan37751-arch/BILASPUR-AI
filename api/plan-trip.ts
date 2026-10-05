import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateTripPlan } from './_core';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Content-Type'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const plan = await generateTripPlan(body);
    return res.status(200).json(plan);
  } catch (err: any) {
    console.error('Plan trip serverless error:', err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}
