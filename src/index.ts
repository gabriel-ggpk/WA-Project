import express, { json, urlencoded } from "express";
// @ts-ignore
import { connect } from "mongoose";
import { api } from "./routes";
import "dotenv/config";
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
(async () => {
  const opt = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "WA-Project",
        version: "1.0.0",
        description:
          "RESTful API to manage a system of laboratories and exams based on a MongoDB database",
      },
      servers: [
        { url: "http://localhost:3000" },
        { url: "https://whispering-crag-02827.herokuapp.com" },
      ],
    },
    apis: ["./src/routes/*.ts"],
  };
  const specs = swaggerJsDoc(opt);
  await connect(process.env.MONGODB_URI as string);
  const app = express();

  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
  app.use("/api", api);
  app.get("/", async (req, res) => {
    res.send("Check the /api-docs route to see the API's documentation");
  });

  app.listen(process.env.PORT || 3000, () => {
    console.log("listening");
  });
})();
