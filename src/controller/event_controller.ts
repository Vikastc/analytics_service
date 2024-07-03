import express from "express";
import { getConnection } from "typeorm";

export async function manageEvent(req: express.Request, res: express.Response) {
    try {
        console.log("In manageEvent");
        const data = req.body;

        const savedData = await getConnection().manager.query(
            data.query,
            data.params
        );
        if (savedData) {
            res.status(200).json({ result: "Event created" });
            return true;
        }
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({ error: "Failed to create Event" });
        return false;
    }
}

export async function queryMetrics(
    req: express.Request,
    res: express.Response
) {
    try {
        console.log("In queryMetrics");
        const data = req.body;

        const savedData = await getConnection().manager.query(data.query);
        if (savedData) {
            return res.status(200).json(savedData);
        }
    } catch (error) {
        console.log("error: ", error);
        return res.status(500).json({ error: "Failed to query metrics" });
    }
}
