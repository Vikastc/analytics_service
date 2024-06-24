import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import swaggerUi from "swagger-ui-express";

import { createConnection } from "typeorm";
import { dbConfig } from "./dbconfig";

const app = express();
export const { PORT } = process.env;

app.use(bodyParser.json({ limit: "5mb" }));
app.use(express.json());

// const schemaRouter = express.Router({ mergeParams: true });

// schemaRouter.post("/", async (req, res) => {
//   return await createSchema(req, res);
// });

const openApiDocumentation = JSON.parse(
    fs.readFileSync("./apis.json").toString()
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
// app.use("/api/v1/schema", schemaRouter);

async function main() {
    try {
        await createConnection(dbConfig);
    } catch (error) {
        console.log("error: ", error);
    }

    app.listen(PORT, () => {
        console.log(`Dhiway gateway is running at http://localhost:${PORT}`);
    });
}

main().catch((e) => console.log(e));
