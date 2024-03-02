const usersModel = require('../models/usersModel')

const findByID = async (req, res) => {
    let { id } = req.params
    const user = await usersModel.findByID(id)
    return res.status(200).json(user)
}

const findByEmail = async (req, res) => {
    let { email } = req.body
    const user = await usersModel.findByEmail(email)
    return res.status(200).json(user)
}

const createUser = async (req, res) => {
    let { name, email, password } = req.body
    const createdUser = await usersModel.createUser(name, email, password)
    return res.status(201).json(createdUser)
}

const updateUser = async (req, res) => {
    let { id } = req.params
    let { name, email, password } = req.body
    await usersModel.updateUser(id, name, email, password)
    return res.status(204).json()
}

const deleteUser = async (req, res) => {
    let { id } = req.params
    await usersModel.deleteUser(id)
    return res.status(204).json()
}

module.exports = {
    findByID,
    findByEmail,
    createUser,
    updateUser,
    deleteUser
}