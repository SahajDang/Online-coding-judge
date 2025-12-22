import mongoose from "mongoose";

const nameRegExpression = /^[A-Za-z]{2,25}$/

const userSchema = new mongoose.Schema({
    name : {
        type : String, required : [true, 'Name is Required'],
        validate : {
            validator : value => nameRegExpression.test(value),
            message : 'Name must be a character between 2 and 25 characters'
        }
    },

    email : {
        type: String,
        required: [true, 'Email is Required'],
        unique: true, 
        lowercase: true,
        trim: true,
    },

    password : {
        type: String,
        required : [true, 'Password is Required'],
        minLength : [8, 'Password Min length is 8 characters'],
        maxLength : [100, 'Password Max length is 25 characters']
    },

    role: {
        type: String,
        enum : ["student", "teacher"],
        default : "student",
        required : true
    },

    rating : {type : Number, default : 0},
    solvedCount : {type : Number, default : 0}
}, {timestamps : true})

export const userModel = mongoose.model('users', userSchema);