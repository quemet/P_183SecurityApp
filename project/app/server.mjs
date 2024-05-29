import express from "express"
import { userRouter } from "./routes/User.mjs";
import { loginRouteur } from "./routes/Login.mjs";
import fs from "node:fs"
import https from "node:https"
import cors from "cors"

const app = express();

app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

/*const options = { 
    key: fs.readFileSync("cert/server.key"), 
    cert: fs.readFileSync("cert/server.cert") 
};*/

// https.createServer(options, app).listen(443)

app.use(express.json());

app.use('/users', userRouter);

app.use('/login', loginRouteur);

// Utile pour le test avec la recherhce
app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`);
});
  
app.use(({ res }) => {
    const message = "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
    res.status(404).json(message);
});