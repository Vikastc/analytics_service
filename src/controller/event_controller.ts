// import * as Cord from "@cord.network/sdk";
import express from "express";
import axios from "axios";
import client from "./redisClient";

export async function getOrSetCache(key: string, cb: any) {
    const dataObj = await client.get(key);

    if (dataObj) {
        console.log("used cache");
        const parsedData = JSON.parse(dataObj);

        return parsedData;
    }

    const freshData = await cb();

    // Sets a key value pair as photos: "{}" with expiration of 5 seconds
    await client.setEx(key, 5, JSON.stringify(freshData));
    console.log("set cache");
    return freshData;
}

export async function setAndGetFromRedis(
    req: express.Request,
    res: express.Response
) {
    try {
        // Checks if there is a key "photos" in redis
        const photos = await getOrSetCache("photos", async () => {
            const response = await axios.get("https://picsum.photos/v2/list");
            return response.data;
        });

        return res.json(photos);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
}
