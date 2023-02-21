const express = require('express')
const { addfavorite, getfavorite, deleteFavorite } = require('../controllers/favorite')

const favoriteRouter = express.Router()

favoriteRouter.post('/' ,addfavorite)
favoriteRouter.get('/:id' ,getfavorite)
favoriteRouter.delete("/:id" , deleteFavorite)


module.exports=favoriteRouter