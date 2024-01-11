const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://abhinilnath10:kuttapanu69@cluster0.nai1wln.mongodb.net/todo")

const todoSchema = mongoose.Schema({
    title : String,
    description : String,
    completed : Boolean
})

const todo = mongoose.model('todo', todoSchema)
module.exports ={
    todo
}