const Product = require("../model/productModel");
const dayjs = require("dayjs");

class productService {
    static async getProductList() {
        const productList = await Product.findAll();

        return productList;
    }

    static async getProduct({ id }) {
        const product = await Product.findById({ id });

        if(!product) {
            throw new Error("해당하는 상품이 없습니다.");
        }

        return product;
    }

    static async addProduct({ category, taste, name, price, amount, mainImg, subImg, description, show, origin}) {
        const product = await Product.findByName({ name });

        if(product) {
            throw new Error("이 상품은 이미 존재합니다. 다른 상품 이름을 입력해주세요.");
        }

        const days = dayjs().format("YYYY-MM-DD HH:mm:ss");
        
        const newProduct = { category, taste, name, price, amount, mainImg, subImg, description, show, reg_date: days, origin};
        const createProduct = await Product.create({ newProduct });

        return createProduct;
    }

    static async putProduct({ id, newProductValue }) {
        let product = await Product.findById({ id });

        if(!product) {
           throw new Error("해당하는 상품이 없습니다. 상품 아이디를 다시 확인해주세요.");
        }

        const productObjectId = product._id;
        
        product = await Product.update({ productObjectId, newProductValue });

        return product;
    }

    static async deleteProduct({ id }) {
        const product = await Product.findById({ id });

        if(!product) {
            throw new Error("해당하는 상품이 없습니다. 상품 아이디를 다시 확인해주세요.");
        }

        const productObjectId = product._id;
        const result = await Product.delete({ productObjectId });

        return result;
    }
}

module.exports = productService;