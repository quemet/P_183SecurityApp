import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: "6033",
    database: "db_securityapp"
});

const getAllUser = async (connection) => {
    try {
        const [results] = await connection.query("SELECT * FROM users;");
        return results;
    } catch (ex) {
        console.log(ex)
    }
}

const getOneUser = async (connection, userId) => {
    try {
        const [results] = await connection.query(`SELECT * FROM users WHERE id=${userId};`);
        return results;
    } catch (ex) {
        console.log(ex)
    }
}

const createUser = async (connection, data) => {
    try {
        await connection.query(`INSERT INTO users(username, password, isAdmin) VALUES('${data.username}', '${data.password}', ${data.isAdmin});`);
    } catch (ex) {
        console.log(ex);
    }
}

const updateUser = async (connection, data, userId) => {
    try {
        await connection.query(`UPDATE users SET username=${data.username}, password=${data.password}, isAdmin=${data.isAdmin} WHERE id=${userId};`);
    } catch (ex) {
        console.log(ex);
    }
};

export { getAllUser, getOneUser, createUser, updateUser, connection }