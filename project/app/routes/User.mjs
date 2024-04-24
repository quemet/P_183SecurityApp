import express from "express"
import { success, encryptUsername, decryptUsername, hashPassword } from "./helper.mjs"
import { getAllUser, getOneUser, createUser, updateUser, connection, deleteUser } from "../db/database.mjs";
import { auth } from "../auth/auth.mjs";

const userRouter = express();

userRouter.get('/', auth, async (req, res) => {
    const message = "Voici la liste des utilisateurs récupéré";
    try {
        const results = await getAllUser(connection);
        for(let i=0; i < results.length;i++) {
            decryptUsername(results[i].username, results[i].password)
        }
        res.json(success(message, results));
    } catch (error) {
        const message = "Erreur lors de la récupération des utilisateurs" + error;
        res.status(500).json({ message });
    }
});

userRouter.get("/:id", auth, async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await getOneUser(connection, userId);
        if(user.length == 0) {
            const message = `L'utilisateur dont l'id vaut ${userId} n'existe pas`;
            return res.status(404).json({ message });
        }
        user[0].username = decryptUsername(user[0].username, user[0].password)
        const message = `L'utilisateur dont l'id vaut ${userId} a bien été recupérée`;
        res.json(success(message, user));
    } catch(error) {
        const message = `Erreur lors de la récupération de l'utilisateur dont l'id vaut ${userId}`;
        console.log(error)
        res.status(500).json({ message });
    } 
});

userRouter.post("/", auth, async (req, res) => {
    let json = req.body;
    let result = {};
    try {
        const password = hashPassword(json);
        const username = encryptUsername(json, password);

        result = { username: username, password: password, isAdmin: json.isAdmin }

        createUser(connection, result);

        const message = `Le user ${json.username} a bien été crée !`;

        result = { username: json.username, password: password, isAdmin: json.isAdmin }

        res.json(success(message, result));
    } catch(error) {
        const message = "Erreur lors de la création de l'utilisateur";
        console.log(error)
        res.status(500).json({ message, data: error });
    }
});

userRouter.put("/:id", auth, async (req, res) => {
    let json = req.body;
    let userId = req.params.id;
    let result = {};
    try {
        const password = hashPassword(json);
        const username = encryptUsername(json, password);

        result = { username: username, password: password, isAdmin: json.isAdmin }

        updateUser(connection, result, userId);

        const message = `Le user ${json.username} a bien été modifiée`;

        result = { username: json.username, password: password, isAdmin: json.isAdmin }

        res.json(success(message, result));
    } catch (error) {
        const message = "Erreur lors de la modification de l'utilisateur";
        res.status(500).json({ message, data: error });
    }
});

userRouter.delete("/:id", auth, async (req, res) => {
    const userId = req.params.id;
    let user;
    try {
        user = await getOneUser(connection, userId);
        if(user.length == 0) {
            const message = `L'utilisateur dont l'id vaut ${userId} n'existe pas`;
            return res.status(404).json({ message });
        }
    } catch(error) {
        const message = `Erreur lors de la récupération de l'utilisateur dont l'id vaut ${userId}`;
        res.status(500).json({ message });
    }

    try {

        deleteUser(userId);

        const message = `L'utilisateur ${user.username} a bien été supprimée`;
        res.json(success(message, user));
    } catch(error) {
        const message = `Erreur lors de la récupération de l'utilisateur dont l'id vaut ${userId}`;
        res.status(500).json({ message });
    }
});

export { userRouter }