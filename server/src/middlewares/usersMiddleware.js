const jwt = require('jsonwebtoken')

const usersModel = require('../models/usersModel')

const validateLogin = async (req, res, next) => {
    let { email, password } = req.body

    if(!email) {
        return res.status(422).json({ message: 'Email is required' })
    }

    if(!password) {
        return res.status(422).json({ message: 'Password is required' })
    }

    const user = await usersModel.findByEmail(email)

    if(user === undefined || user.length == 0) {
        return res.status(422).json({ message: 'User not found' })
    }

    if (password !== user[0].password) {
        return res.status(422).json({ message: 'Invalid password' })
    }

    try {
        const secret = process.env.SECRET

        const token = jwt.sign(
            {
                id: user[0].id
            },
            secret
        )

        res.status(200).json({ message: 'Succesfully authentication', token})

    } catch(error) {
        console.log(error)

        return res.status(500).json({ message: 'Error on server, please try again later' })
    }

    next()
}

const validateUser = (req, res, next) => {
    let { name, email, password } = req.body

    if(!name) {
        return res.status(422).json({ message: 'Name is required' })
    }

    if(!email) {
        return res.status(422).json({ message: 'Email is required' })
    }

    if(!password) {
        return res.status(422).json({ message: 'Password is required' })
    }

    next()
}

const checkToken = (req, res, next) => {
    const header = req.headers['authorization']

    const token = header && header.split(" ")[1]

    if(!token) {
        return res.status(401).json({ message: 'Access denied' })
    }

    try {
        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()
    } catch(error) {
        return res.status(400).json({ message: 'Invalid token' })
    }
}

module.exports = {
    validateLogin,
    validateUser,
    checkToken
}