import express, { json, urlencoded } from "express";
// @ts-ignore
import { connect } from "mongoose";
import { api } from "./routes";
import "dotenv/config";

(async () => {
  await connect(process.env.MONGODB_URI as string);
  const app = express();
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use("/api", api);
  app.listen(/*APP_ROUTE||*/ 3000, () => {
    console.log("listening");
  });
})();
