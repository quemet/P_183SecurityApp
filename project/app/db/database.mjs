import mysql from "mysql2/promise";

let connection;

try {
    connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        port: "3306",
        database: "db_securityapp" 
    });
    /*connection = await mysql.createConnection({
        host: "172.24.0.3",
        user: "root",
        password: "root",
        port: "3306",
        database: "db_securityapp"
    });*/
} catch(ex) {
    console.log(ex)
    throw new Error("Cannot connect to the database. Please try again later")
}

const getAllUser = async (connection) => {
    try {
        const [results] = await connection.query("SELECT * FROM users;");
        return results;
    } catch (ex) {
        console.log(ex)
        throw new Error("Cannot get all the users please try again later")
    }
}

const getAllUserLike = async (connection, username) => {
    try {
        const [results] = await connection.query("SELECT * FROM users WHERE username LIKE ?;", [username]);
        return results;
    } catch(ex) {
        console.log(ex)
        throw new Error("Cannot get all the users with username " + username + ". Please try again later.")
    }
}

const getOneUser = async (connection, userId) => {
    try {
        const [results] = await connection.query(`SELECT * FROM users WHERE id=?;`, [userId]);
        return results;
    } catch (ex) {
        console.log(ex)
        throw new Error("Cannot get the user asked please try again later")
    }
}

const getOneUserWithName = async (connection, username) => {
    try {
        const [results] = await connection.query(`SELECT * FROM users WHERE username=?`, [username]);
        return results;
    } catch (ex) {
        console.log(ex)
        throw new Error("Cannot find the user where the name is " + username + ". Please try again later")
    }
}

const createUser = async (connection, data) => {
    try {
        await connection.query(`INSERT INTO users(username, password, isAdmin) VALUES(?, ?, ?);`, [data.username, data.password, data.isAdmin]);
    } catch (ex) {
        console.log(ex);
        throw new Error("Cannot create the user asked please try again later")
    }
}

const updateUser = async (connection, data, userId) => {
    try {
        await connection.query('UPDATE users SET username=?, password=?, isAdmin=? WHERE id=?', [data.username, data.password, data.isAdmin, userId]);
    } catch (ex) {
        console.log(ex)
        throw new Error("Cannot update the user asked please try again later")
    }
};

const deleteUser = async (connection, userId) => {
    try {
        return await connection.query(`DELETE FROM users WHERE id=?;`, [userId]);
    } catch (ex) {
        console.log(ex)
        return new Error("Cannot delete the user asked please try again later")
    }
}

export { getAllUser, getAllUserLike, getOneUser, getOneUserWithName, createUser, updateUser, deleteUser, connection }