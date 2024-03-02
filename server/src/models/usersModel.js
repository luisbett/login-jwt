const sql = require('./connection')

const findByID = async (id) => {
    const user = await sql`SELECT name, email FROM users WHERE id = ${id}`
    return user
}

const findByEmail = async (email) => {
    const user = await sql`SELECT * FROM users WHERE email = ${email}`
    return user
}

const createUser = async (name, email, password) => {
    //user bcrypt para criar a hash da password
    const createdUser = await sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${password})`
    return createdUser
}

const updateUser = async (id, name, email, password) => {
    //user bcrypt para criar a hash da password
    const updatedUser = await sql`UPDATE users SET name = ${name}, email = ${email}, password = ${password} WHERE id = ${id}`
    return updatedUser
}

const deleteUser = async (id) => {
    const deletedUser = await sql`DELETE FROM users WHERE id = ${id}`
    return deletedUser
}

module.exports = {
    findByID,
    findByEmail,
    createUser,
    updateUser,
    deleteUser
}