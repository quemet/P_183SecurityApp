import express from "express"
import { success, hashPassword } from "./helper.mjs"
import { getAllUser, getAllUserLike, getOneUser, createUser, updateUser, connection, deleteUser } from "../db/database.mjs";
import { auth } from "../auth/auth.mjs";

const userRouter = express();

userRouter.get('/', auth, async (req, res) => {
    if (req.query.username) {
        if (req.query.name.length < 2) {
          const message = `Le terme de la recherche doit contenir au moins 2 caractères`;
          return res.status(400).json({ message });
        }
        let limit = 3;
        if (req.query.limit) {
          limit = parseInt(req.query.limit, 10);
        }
        const message = "Voici la liste des utilisateurs récupéré";
        const results = await getAllUserLike(connection, req.query.username);
        res.json(success(message, results));
    }
    const message = "Voici la liste des utilisateurs récupéré";
    try {
        const results = await getAllUser(connection);
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

        result = { username: json.username, password: password, isAdmin: json.isAdmin }

        createUser(connection, result);

        const message = `Le user ${result.username} a bien été crée !`;

        res.json(success(message, result));
    } catch(error) {
        const message = "Erreur lors de la création de l'utilisateur";
        res.status(500).json({ message, data: error });
    }
});

userRouter.put("/:id", auth, async (req, res) => {
    let json = req.body;
    let userId = req.params.id;
    let result = {};
    try {
        const password = hashPassword(json);

        result = { username: json.username, password: password, isAdmin: json.isAdmin }

        updateUser(connection, result, userId);

        const message = `Le user ${result.username} a bien été modifiée`;
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
        console.log(error)
        const message = `Erreur lors de la récupération de l'utilisateur dont l'id vaut ${userId}`;
        res.status(500).json({ message });
    }

    try {

        const result = await deleteUser(connection, userId).then((error) => error.message)

        if(result != undefined) {
            throw new Error(result)
        }

        const message = `L'utilisateur ${user.username} a bien été supprimée`;
        res.json(success(message, user));
    } catch(error) {
        const message = `Erreur lors de la suppression de l'utilisateur dont l'id vaut ${userId}`;
        res.status(500).json({ message });
    }
});

export { userRouter }