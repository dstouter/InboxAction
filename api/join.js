import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: 'https://popular-griffon-23583.upstash.io', // <- copy from Upstash
  token: 'AVwfAAIncDFhYTE0NjEzZjIyYWU0NDdhODAwMGE5NDMxYjE3MjAzY3AxMjM1ODM',                   // <- copy from Upstash
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body; // Vercel already parsed JSON
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    await redis.lpush('waitlist', email);

    return res.status(200).json({ message: 'Success! Added to waitlist.' });
  } catch (err) {
    console.error('JOIN ERROR', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
