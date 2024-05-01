import crypto from "crypto";

const success = (message, data) => {
    return {
        message: message,
        data: data
    }
}

function hashPassword(json) {
    const hash = crypto.createHash('sha512')
    hash.update(json.password)
    const password = hash.digest('hex')
    return password
}

function checkPermission(token, method) {
    if(method.trim().length == method.length) {
        if(method == "GET") {
            
        } else if(method == "POST") {

        } else if(method == "PUT") {

        } else if(method == "DELETE") {

        }
    }
}

export { success, hashPassword }