import redis from "redis";

const config = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};
