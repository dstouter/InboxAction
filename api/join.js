import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  try {
    const values = await redis.lrange('waitlist', 0, -1);

    return res.status(200).json({
      ok: true,
      values,
    });
  } catch (err) {
    console.error('JOIN READ ERROR:', err);
    return res.status(500).json({
      ok: false,
      error: String(err),
    });
  }
}
