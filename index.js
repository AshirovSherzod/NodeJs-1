const express = require("express")
const app = express()

app.use(express.json())

const Users = require("./router/users")
app.use("/", Users)

const Products = require("./router/products")
app.use("/", Products)

const PORT = 8000
app.listen(PORT, () => console.log(`${PORT} is listening`))