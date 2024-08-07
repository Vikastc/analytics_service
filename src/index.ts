import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import cluster from "node:cluster";
import os from "node:os";
import { createConnection } from "typeorm";

import { dbConfig } from "./dbconfig";
import { connectRedis } from "./redisClient";
import { setAndGetFromRedis } from "./controller/redis_controller";
import { manageEvent, queryMetrics } from "./controller/event_controller";

const app = express();
export const { PORT } = process.env;

app.use(bodyParser.json({ limit: "5mb" }));
app.use(express.json());

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    const redisRouter = express.Router({ mergeParams: true });

    redisRouter.get("/", async (req, res) => {
        return await setAndGetFromRedis(req, res);
    });

    const openApiDocumentation = JSON.parse(
        fs.readFileSync("./apis.json").toString()
    );

    app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
    app.use("/api/v1/redis", redisRouter);

    app.post("/api/v1/analytics/send-event", async (req, res) => {
        return await manageEvent(req, res);
    });

    app.post("/api/v1/analytics/query-metrics", async (req, res) => {
        return await queryMetrics(req, res);
    });

    // All other routes to React App
    app.get("/*", async (req, res) => {
        return res.json({
            message:
                "check https://docs.dhiway.com/api for details of the APIs",
        });
    });

    async function main() {
        try {
            // Connect the Redis client
            // await connectRedis();

            await createConnection(dbConfig);
        } catch (error) {
            console.log("error: ", error);
        }

        app.listen(PORT, () => {
            console.log(
                `Dhiway gateway is running at http://localhost:${PORT}`
            );
        });
    }

    main().catch((e) => console.log(e));
}
