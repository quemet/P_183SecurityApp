import express from "express"
import { success } from "./helper.mjs"
import { getAllUser, getOneUser, createUser, updateUser, connection } from "../db/database.mjs";

const userRouter = express();

userRouter.get('/', async (req, res) => {
    const message = "Voici la liste des utilisateurs récupéré";
    try {
        const results = await getAllUser(connection);
        res.json(success(message, results));
    } catch (error) {
        const message = "Erreur lors de la récupération des utilisateurs";
        res.status(500).json({ message });
    }
});

userRouter.get("/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await getOneUser(connection, userId);
        if(user == undefined) {
            const message = `L'utilisateur dont l'id vaut ${userId} n'existe pas`;
            res.status(404).json({ message });
        }
        const message = `L'utilisateur dont l'id vaut ${userId} a bien été recupérée`;
        console.log(user);
        res.json(success(message, user));
    } catch(error) {
        const message = `Erreur lors de la récupération de l'utilisateur dont l'id vaut ${userId}`;
        res.status(500).json({ message });
    } 
});

userRouter.post("/", (req, res) => {
    let json = req.body;
    try {
        createUser(connection, json);
        const message = `Le user ${json.username} a bien été crée !`;
        res.json(success(message, json));
    } catch(error) {
        const message = "Erreur lors de la création de l'utilisateur";
        res.status(500).json({ message, data: error });
    }
});

userRouter.put("/:id", (req, res) => {
    let json = req.body;
    let userId = req.params.id;
    try {
        updateUser(connection, json);
        const message = `Le user dont l'id vaut ${userId} a bien été modifiée`;
        res.json(success(message, json));
    } catch (error) {
        const message = "Erreur lors de la modification de l'utilisateur";
        res.status(500).json({ message, data: error });
    }
});

export { userRouter }