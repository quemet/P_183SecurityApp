import express from "express"
import { userRouter } from "./routes/User.mjs";
import { loginRouteur } from "./routes/Login.mjs";
import fs from "node:fs"
import https from "node:https"
import cors from "cors"

const app = express();

app.use(cors({ origin: "http://localhost:3001", withCredentials: true }))

const options = { key: fs.readFileSync("cert/server.key"), cert: fs.readFileSync("cert/server.cert") };

https.createServer(options, app).listen(443)

app.use(express.json());

app.use('/users', userRouter);

app.use('/login', loginRouteur);