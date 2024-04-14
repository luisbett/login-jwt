const express = require('express')

const router = express.Router()

const usersController = require('./controllers/usersController')
const usersMiddleware = require('./middlewares/usersMiddleware')

router.post('/auth/token', usersMiddleware.verifyToken)
router.get('/auth/refresh', usersMiddleware.verifyRefreshToken, usersMiddleware.refreshToken)
router.post('/auth/delete', usersMiddleware.deleteRefreshToken)
router.post('/auth/user', usersMiddleware.validateLogin)
router.get('/users/:id', usersMiddleware.verifyId, usersMiddleware.verifyToken, usersController.findByID)
router.post('/users', usersMiddleware.validateCreate, usersController.createUser)
router.put('/users/:id', usersMiddleware.verifyId, usersMiddleware.verifyToken, usersMiddleware.validateUpdate, usersController.updateUser)
router.delete('/users/:id', usersMiddleware.verifyId, usersMiddleware.verifyToken, usersController.deleteUser)

module.exports = router