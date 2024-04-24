import express from "express"
import { userRouter } from "./routes/User.mjs";
import { loginRouteur } from "./routes/Login.mjs";

const app = express();

app.use(express.json());

app.use('/users', userRouter);

app.use('/login', loginRouteur);

// Démarrage du serveur
app.listen(8080, () => {
    console.log('Server running on port 8080');
});