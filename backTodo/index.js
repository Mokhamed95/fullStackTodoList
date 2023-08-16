const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')


const app = express()

const port = 3001

mongoose.connect(
    "mongodb+srv://maga33086:Batopro95@cluster0.go14rxq.mongodb.net/TodoList"
)

.then(() => console.log("Успешно соединились с сервером MongoDB"))
.catch(() => console.log("Ошибка при соединении с сервером MongoDB"))

app.use(cors())
app.use(express.json())
app.use(require("./routes/todo.route"))

app.listen(port, () => {
    console.log(`Server: http://localhost:${port}`);
  });