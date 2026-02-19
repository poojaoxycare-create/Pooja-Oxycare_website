import express from "express"
import cors from "cors"

const app = express()

const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
app.use(cors({ origin: clientUrl }));
app.use(express.json());

export default app