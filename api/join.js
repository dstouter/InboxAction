import { Redis } from '@upstash/redis';

// Connect to Redis using your Vercel env vars
const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = JSON.parse(req.body);

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    // Save email to Redis list "waitlist"
    await redis.lpush('waitlist', email);

    return res.status(200).json({ message: 'Success! Added to waitlist.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}
