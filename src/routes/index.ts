import { Router } from "express";
import { association } from "./association";
import { exam } from "./exam";
import { laboratory } from "./laboratory";

export const api = Router()
  .use("/laboratory", laboratory)
  .use("/exam", exam)
  .use("/association", association);
