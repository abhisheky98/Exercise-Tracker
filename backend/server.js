require('dotenv').config()


const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

mongoose.set('strictQuery', false)

//express app
const app = express()

//middlewear
app.use(express.json())
 
app.use((req,res,next) => {
  console.log(req.path,req.method)
  next()
})

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>{
    app.listen(process.env.PORT,()=>{
        console.log('connected to listening on port',process.env.PORT)
    })
    
  })
  .catch((err) => {
    console.log(err)
  })

//routes
app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes)





