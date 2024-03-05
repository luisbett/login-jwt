const sql = require('./connection')

const bcrypt = require('bcrypt')

const findByID = async (id) => {
    const user = await sql`SELECT * FROM users WHERE id = ${id}`
    return user
}

const findByEmail = async (email) => {
    const user = await sql`SELECT * FROM users WHERE email = ${email}`
    return user
}

const createUser = async (name, email, password) => {
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
    const createdUser = await sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${passwordHash})`
    return createdUser
}

const updateUser = async (id, name, email, password) => {
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
    const updatedUser = await sql`UPDATE users SET name = ${name}, email = ${email}, password = ${passwordHash} WHERE id = ${id}`
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