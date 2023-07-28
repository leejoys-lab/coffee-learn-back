const { object } = require("joi");
const { mongoose, model } = require("mongoose");

const OrderSchema = mongoose.Schema({
    products: {
        type: Array,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    reg_date: {
        type: Date,
        require: true
    },
    userId: { 
        type: String,
        require:true
    },
    receiver: {
        type: String,
        require: true
    },
    receiverPhone: {
        type: String,
        require: true
    },
    receiverAddr: {
        type: String,
        requrie: true
    }
},
{
    versionKey: false
});


const orderModel = model('Order', OrderSchema);

module.exports = orderModel;