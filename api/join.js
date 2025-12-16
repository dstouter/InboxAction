import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  try {
    const value = `TEST-${Date.now()}`;

    // Try to write a simple test value
    await redis.lpush('waitlist', value);

    return res.status(200).json({ ok: true, pushed: value });
  } catch (err) {
    console.error('TEST JOIN ERROR:', err);
    return res
      .status(500)
      .json({ ok: false, error: String(err) });
  }
}
