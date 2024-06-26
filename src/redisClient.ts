import { createClient } from "redis";

const client = createClient({ url: "redis://redis_container:6379" });

client.on("error", (err: any) => {
    console.error("Redis error:", err);
});

export async function connectRedis() {
    try {
        await client.connect();
        console.log("Connected to Redis");
    } catch (err) {
        console.error("Redis connection error:", err);
    }
}

export default client;
