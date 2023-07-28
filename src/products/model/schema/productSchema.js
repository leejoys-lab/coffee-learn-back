const { mongoose, model } = require("mongoose");

const ProductSchema = mongoose.Schema({
    // 몽고디비의 _id 사용
    category: {
        type: String,
        require: false
    },
    taste: {
        type: String,
        require: false
    },
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    mainImg: {
        type: String,
        require: false
    },
    subImg: {
        type: String,
        require: false
    },
    description: {
        type: String,
        require: true
    },
    show: {
        type: Boolean,
        require: true,
        default: true
    },
    reg_date: {
        type: Date,
        require: true
    },
    origin: {
        type: String,
        require: false
    },
    option: {
        type: String,
        require: false
    }
},
{
    versionKey: false
});

const ProductModel = model('Product', ProductSchema);

module.exports = ProductModel;