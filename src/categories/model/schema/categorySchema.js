const { mongoose, model } = require("mongoose");

const CategorySchema = mongoose.Schema({
    // 몽고디비의 _id 사용
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: false
    }
},
{
    versionKey: false
})

const categoryModel = model('Category', CategorySchema);

module.exports = categoryModel;