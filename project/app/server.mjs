import express from "express"
import { userRouter } from "./routes/User.mjs";

const app = express();

app.use(express.json());

app.use('/users', userRouter);

// Démarrage du serveur
app.listen(8080, () => {
    console.log('Server running on port 8080');
});