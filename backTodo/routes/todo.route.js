const Router = require('express')
const router = Router()
const { todoController } = require('../controllers/todo.controller')

router.get('/getTodo', todoController.getTodo)
router.post ('/addTodo', todoController.addTodo)
router.patch('/changeTodo/:id', todoController.changeTodos)
router.delete('/deleteTodo/:id', todoController.deleteTodo)

module.exports = router