const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const usersModel = require('../models/usersModel')

//Validate user login
const validateLogin = async (req, res, next) => {
    
    let { email, password } = req.body

    if(!email) {
        return res.status(422).json({ message: 'Email is required' })
    }

    if(!password) {
        return res.status(422).json({ message: 'Password is required' })
    }

    const user = await usersModel.findByEmail(email)

    if(user === undefined || user.length === 0) {
        return res.status(404).json({ message: 'User not found' })
    }

    const checkPassword = await bcrypt.compare(password, user[0].password)
    
    if (!checkPassword) {
        return res.status(422).json({ message: 'Invalid password' })
    }

    try {
        const secret = process.env.SECRET_TOKEN

        const token = jwt.sign({ id: user[0].id }, secret, { expiresIn: '3d' })

        res.status(200).json({ message: 'Succesfully authentication', token })

    } catch(error) {
        console.log(error)

        return res.status(500).json({ message: 'Error on server, please try again later' })
    }

    next()
}

//Validate user create
const validateCreate = async (req, res, next) => {
    
    let { name, email, password } = req.body

    if(!name) {
        return res.status(409).json({ message: 'Name is required' })
    }

    if(!email) {
        return res.status(409).json({ message: 'Email is required' })
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return res.status(409).json({ message: 'Email is invalid' })
    }

    if(!password) {
        return res.status(409).json({ message: 'Password is required' })
    }

    const user = await usersModel.findByEmail(email)

    if(user.length > 0) {
        return res.status(409).json({ message: 'User already exists' })
    }

    next()
}

//Validate user update
const validateUpdate = async (req, res, next) => {
    
    let { name, email, password } = req.body

    if(!name) {
        return res.status(409).json({ message: 'Name is required' })
    }

    if(!email) {
        return res.status(409).json({ message: 'Email is required' })
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return res.status(409).json({ message: 'Email is invalid' })
    }

    if(!password) {
        return res.status(409).json({ message: 'Password is required' })
    }

    next()
}

//Validate token
const verifyToken = (req, res, next) => {

    const header = req.headers['authorization']

    const token = header && header.split(" ")[1]

    if(!token) {
        return res.status(401).json({ message: 'Access denied' })
    }

    try {
        const secret = process.env.SECRET_TOKEN

        jwt.verify(token, secret)

        //If the route is just for verifying the token, return success
        if(req.path === '/auth/token') {
            return res.status(200).json({ message: 'Valid token' })
        }

        next()
    } catch(error) {
        return res.status(400).json({ message: 'Invalid token' })
    }
}

module.exports = {
    validateLogin,
    validateCreate,
    validateUpdate,
    verifyToken
}