const express = require('express')
const app = express()
const port = 3003



//DB Connection
const db = require('./model/index')
db.sequelize.sync({force: false})


//Seting up View Engine
app.set('view engine', 'ejs')
app.set('views', 'view')


//Parsing Data to backend
app.use(express.urlencoded())
app.use(express.json())


//Calling the routers
const indexRouter = require('./routes/index')
const studentRouter = require('./routes/student')


app.use(indexRouter)
app.use(studentRouter)

app.listen(port, () => {
console.log(`Example app listening on port http://localhost:${port}`)
})