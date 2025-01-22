const express = require('express')
const app = express()
const path = require('path')
const multer = require('multer')
const port = 3001



//DB Connection
const db = require('./model/index')
db.sequelize.sync({force: false})


//Seting up View Engine
app.set('view engine', 'ejs')
app.set('views', 'view')


//Parsing Data to backend
app.use(express.urlencoded())
app.use(express.json())
app.use("/uploads",express.static(path.join(__dirname,"uploads")))

//Calling the routers
const indexRouter = require('./routes/index')
const studentRouter = require('./routes/student')
const authRouter = require('./routes/auth')


app.use(indexRouter)
app.use(studentRouter)
app.use(authRouter)

app.listen(port, () => {
console.log(`Example app listening on port http://localhost:${port}`)
})