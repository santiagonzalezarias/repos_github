'use strict'

const express = require('express')
const controller = require('./controller')
const router = express.Router()

router.get('/token', controller.getToken)
router.get('/repositories/:token', controller.getRepositories)
router.get('/favorite/:token/:autor/:repository', controller.deleteFavorite)
router.put('/favorite/:token/:autor/:repository', controller.addFavorite)
router.get('/favorite/:token/:user', controller.getRepositoiresFav)

module.exports = router;