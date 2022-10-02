const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title:{
        type:String,
        required : true
    },
    weight:{
        type: Number,
        required: true
    },
    reps : {
        type:Number,
        required:true

    },
    user_id:{
        type: String,
        require: true
    }
},{timestamps:true})

module.exports = mongoose.model('workout',workoutSchema)

