const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { jwtDecode } = require('jwt-decode')

const usersModel = require('../models/usersModel')

//Validate user login
const validateLogin = async (req, res) => {
    
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
        const { SECRET_TOKEN, SECRET_REFRESH_TOKEN } = process.env

        const refreshToken = jwt.sign({ id: user[0].id }, SECRET_REFRESH_TOKEN, { expiresIn: '300s' })
        const token = jwt.sign({ refreshToken }, SECRET_TOKEN, { expiresIn: '30s' })

        return res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: true, maxAge: 5 * 60 * 1000 }).status(200).json({ message: 'Succesfully authentication', token })

    } catch(error) {
        console.log(error)

        return res.status(500).json({ message: 'Error on server, please try again later' })
    }
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

//Validate id in params
const verifyId = (req, res, next) => {

    const { id } = req.params

    if(id === 'undefined' || id === 'null') {
        return res.status(422).json({ message: 'Param id is required' })
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
        const { SECRET_TOKEN } = process.env

        jwt.verify(token, SECRET_TOKEN)

        //If the route is just for verifying the token, return success
        if(req.path === '/auth/token') {
            return res.status(200).json({ message: 'Valid token' })
        }

        next()
    } catch(error) {
        return res.status(400).json({ message: 'Invalid token' })
    }
}

//Refresh token
const refreshToken = (req, res) => {

    const { SECRET_TOKEN, SECRET_REFRESH_TOKEN } = process.env

    const { refresh_token } = req.cookies

    const decodedToken = jwtDecode(refresh_token)
    
    const userId = decodedToken.id

    const refreshToken = jwt.sign({ id: userId }, SECRET_REFRESH_TOKEN, { expiresIn: '300s' })
    const token = jwt.sign({ refreshToken }, SECRET_TOKEN, { expiresIn: '30s' })

    return res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: true, maxAge: 5 * 60 * 1000 }).status(200).json({ message: 'Succesfully new token', token })
}

//Verify refresh token
const verifyRefreshToken = (req, res, next) => {

    const { refresh_token } = req.cookies

    if(!refresh_token) {
        return res.status(401).json({ message: 'Refresh token not provided' })
    }

    try {
        const { SECRET_REFRESH_TOKEN } = process.env

        jwt.verify(refresh_token, SECRET_REFRESH_TOKEN)

        next()
    } catch(error) {
        return res.status(400).json({ message: 'Invalid refresh token' })
    }
}

//Delete refresh token
const deleteRefreshToken = (_req, res) => {

    return res.clearCookie('refresh_token', { httpOnly: true, secure: true }).status(200).json({ message: 'Cookie deleted successfully' })

}

module.exports = {
    validateLogin,
    validateCreate,
    validateUpdate,
    verifyId,
    verifyToken,
    refreshToken,
    verifyRefreshToken,
    deleteRefreshToken
}