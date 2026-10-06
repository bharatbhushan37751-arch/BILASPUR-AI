import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateSceneImage } from './_core';

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
    const result = await generateSceneImage(body);
    return res.status(200).json(result);
  } catch (err: any) {
    console.error('Image generator serverless error:', err);

    if (err.status === 429 || err.code === 'IMAGE_GENERATION_QUOTA_EXCEEDED') {
      return res.status(429).json({
        error: 'IMAGE_GENERATION_QUOTA_EXCEEDED',
        message: 'Image generation quota has been exceeded. Please try again later.',
        fallbackImageUrl: err.fallbackImageUrl,
        fallbackTitle: err.fallbackTitle,
        aspectRatio: err.aspectRatio,
      });
    }

    return res.status(400).json({
      error: 'IMAGE_GENERATION_FAILED',
      message: err.message || 'Image generation failed. Please try again.',
    });
  }
}
