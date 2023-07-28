const Category = require("./schema/categorySchema");

class CategoryModel {

    static async create({ newCategory }) {
        const createdCategory = await Category.create(newCategory);
        return createdCategory;
    }

    static async findByName({ name }) {
        const category = await Category.findOne({ name });
        return category;
    }

    static async findAll() {
        const categoryList = await Category.find({});
        return categoryList;
    }

    static async findById({ id }) {
        const category = await Category.findById(id);
        return category;
    }


    static async delete({ categoryObjectid }) {
        await Category.deleteOne({ _id: categoryObjectid });

        return '카테고리 삭제 완료';
    }

    static async update({ categoryId, newCategoryValue }) {
        // findOneAndUpdate vs updateOne
        // 수정이 되었는지 확인하기 위해 반환시켜주는 findOneAndUpdate 사용

        const updateCategory = await Category.findOneAndUpdate( { _id: categoryName }, { $set: newCategoryValue }, { returnNewDocument: true });

        return updateCategory;
    }
}

module.exports = CategoryModel;