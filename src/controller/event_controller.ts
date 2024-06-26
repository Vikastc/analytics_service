// import * as Cord from "@cord.network/sdk";
import express from "express";
import axios from "axios";
import client from "./redisClient";

export async function setAndGetFromRedis(
    req: express.Request,
    res: express.Response
) {
    try {
        // Checks if there is a key "photos" in redis
        const photos = await client.get("photos");

        if (photos) {
            console.log("used cache");
            const parsedData = JSON.parse(photos);
            return res.json(parsedData);
        }

        const { data } = await axios.get("https://picsum.photos/v2/list");

        // Sets a key value pair as photos: "{}" with expiration of 5 seconds
        await client.setEx("photos", 5, JSON.stringify(data));
        console.log("set cache");

        return res.json(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
}
