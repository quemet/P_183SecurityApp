import crypto, { scryptSync } from "crypto";

const success = (message, data) => {
    return {
        message: message,
        data: data
    }
}

function encryptUsername(json, password) {
    let key = crypto.createCipheriv('aes-256-ccm', password.substring(0, 32), "etmletmletml", {authTagLength: 16});
    let username = key.update(json.username, 'utf8', 'hex') + key.final('hex');
    return username;
}

function decryptUsername(user, password) {
    let key = scryptSync(password.substring(0, 32), 'salt', 32)
    let decipher = crypto.createDecipheriv('aes-256-ccm', key, "etmletmletml", {authTagLength: 16});
    let username = decipher.update(user, 'hex', 'utf8');
    username += decipher.final('utf8');
    return username;  
}

function hashPassword(json) {
    const hash = crypto.createHash('sha512')
    hash.update(json.password)
    const password = hash.digest('hex')
    return password
}

export { success, encryptUsername, decryptUsername, hashPassword }