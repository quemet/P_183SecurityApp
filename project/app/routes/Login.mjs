import express from "express";
import jwt from "jsonwebtoken";

import { hashPassword } from "./helper.mjs"

import { connection, getOneUserWithName } from "../db/database.mjs";

import { privateKey } from "../auth/private_key.mjs";

const loginRouteur = express();

loginRouteur.post("/", async (req, res) => {
    let json = req.body;
    let password = hashPassword(json);
    try {
        const user = await getOneUserWithName(connection, json.username);
        if(user.length == 0) {
            const message = `L'utilisateur demandé n'existe pas`;
            return res.status(404).json({ message });
        }

        if(password == user[0].password) {
            const token = jwt.sign({ userId: user[0].id, admin: user[0].isAdmin }, privateKey, {
                expiresIn: "1y",
            });
            const message = `L'utilisateur a été connecté avec succès`;
            return res.json({ message, data: user[0], token });
        } else {
            const message = `L'utilisateur demandé n'existe pas`;
            return res.status(404).json({ message });
        }
    } catch(ex) {
        console.log(ex)
    }
});

export { loginRouteur };