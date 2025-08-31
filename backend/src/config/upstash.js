import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis"

import dotenv from "dotenv";

dotenv.config();

const redis = Redis.fromEnv();

const pong = await redis.ping();
console.log("Redis ping:", pong);

//ratelimiter that allows 100 requests per minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "20 s"),
});

export default ratelimit;