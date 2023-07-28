const { mongoose, model } = require("mongoose");


const UserSchema = mongoose.Schema({
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    authority: {
        type: Boolean,
        require: true,
        default: 0,
    },
    addr: {
        type: String,
        require: true
    },
    reg_date: {
        type: Date,
        require: true
    },
},
{
    versionKey: false
});

const userModel = model('User', UserSchema);

module.exports =  userModel;