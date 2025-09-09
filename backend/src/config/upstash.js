import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis"

import dotenv from "dotenv";

dotenv.config();

const redis = Redis.fromEnv();

const pong = await redis.ping();
console.log("Redis ping:", pong);


const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, "60 s"),
});

export default ratelimit;