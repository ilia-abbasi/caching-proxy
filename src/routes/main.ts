import express from "express";

import { requestHandler } from "../controller/request.js";

const router = express.Router();

router.all("/{*anything}", requestHandler);

export default router;
