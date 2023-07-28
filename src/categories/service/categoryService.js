const Category = require("../model/categoryModel");

class CategoryService {
    
    static async addCategory({ name, description }) {
        const category = await Category.findByName({ name });

        if(category) {
            throw new Error("이 카테고리는 이미 존재합니다. 다른 카테고리 이름을 입력해주세요.");
        }

        const newCategory = { name, description };
        const createCategory = await Category.create({ newCategory });

        return createCategory;
    }

    static async getCategoryList() {
        const categoryList = await Category.findAll();

        return categoryList;
    }

    static async getCategory({ id }) {
        const category = await Category.findById({ id });

        if(!category) {
            throw new Error("해당하는 카테고리가 없습니다. 존재하는 카테고리 이름을 입력해주세요.");
        }

        return category;
    }


    static async deleteCategory({ id }) {
        const category = await Category.findById({ id });

        if(!category) {
            throw new Error("해당하는 카테고리가 없습니다. 존재하는 카테고리 이름을 입력해주세요.");
        }

        const categoryObjectid = category._id;
        const result = await Category.delete({ categoryObjectid });

        return result;
    }

    static async putCategory({ categoryId, newCategoryValue }) {
        let category = await Category.findById({ categoryId });
    
        if(!category) {
            throw new Error("해당하는 카테고리가 없습니다. 존재하는 카테고리 이름을 입력해주세요.");
        }
        category = await Category.update({ categoryId, newCategoryValue });

        return category;
    }

}

module.exports = CategoryService;