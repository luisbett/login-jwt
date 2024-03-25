const express = require('express')

const router = express.Router()

const cors = require('cors')

const usersController = require('./controllers/usersController')
const usersMiddleware = require('./middlewares/usersMiddleware')

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.post('/auth/token', usersMiddleware.verifyToken)
router.post('/auth/user', usersMiddleware.validateLogin)
router.get('/users/:id', usersMiddleware.verifyToken, usersController.findByID)
router.post('/users', usersMiddleware.validateCreate, usersController.createUser)
router.put('/users/:id', usersMiddleware.verifyToken, usersMiddleware.validateUpdate, usersController.updateUser)
router.delete('/users/:id', usersMiddleware.verifyToken, usersController.deleteUser)

module.exports = router