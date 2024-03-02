const express = require('express')

const router = express.Router()

const usersController = require('./controllers/usersController')
const usersMiddleware = require('./middlewares/usersMiddleware')

router.post('/auth/user', usersMiddleware.validateLogin)
router.get('/users/:id', usersMiddleware.checkToken, usersController.findByID)
router.post('/users', usersMiddleware.validateUser, usersController.createUser)
router.put('/users/:id', usersMiddleware.checkToken, usersMiddleware.validateUser, usersController.updateUser)
router.delete('/users/:id', usersMiddleware.checkToken, usersController.deleteUser)

module.exports = router