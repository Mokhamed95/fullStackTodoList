const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    text: String,
    completed: {
type: Boolean,
default: false
    }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo;