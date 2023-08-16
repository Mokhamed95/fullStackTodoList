const Todo = require("../models/todo.model")

module.exports.todoController = {
   getTodo: async (req, res) => {
    try{
        const todos = await Todo.find({})
        res.json(todos)
    }catch (error) {
        res.json(error)
    }
   },
    addTodo: async(req, res) => {
        try{
            const todos = await Todo.create({
                text: req.body.text,
                completed: req.body.completed
            })
            res.json(todos)
        } catch (error) {
            res.json(error)
        }
    },
    deleteTodo: async (req, res) => {
        try{
            const deleteTodo = await Todo.findByIdAndRemove(req.params.id)
            res.json(deleteTodo)
        } catch (error) {
            res.json(error)
        }
    },
    changeTodos: async (req, res) => {
        try{
            // console.log(req.body)
            const changeTodo = await Todo.findByIdAndUpdate(req.params.id, { completed: req.body.completed}, {new: true})
            // console.log(changeTodo)
            res.json(changeTodo)
        }catch (error) {
            res.json(error)
        }
    }
} 