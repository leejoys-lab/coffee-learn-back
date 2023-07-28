const express = require("express");
const productsRouter = express();
const productsService = require("../service/productService");
const upload = require("../../middlewares/multer");
const adminOnly = require("../../middlewares/admin-only");

productsRouter.get('/', async (req, res, next) => {
    try {
      const productList = await productsService.getProductList();

      res.status(200).json(productList);
    } catch(err) {
      next(err);
    }
});


productsRouter.get('/:id', async (req, res, next) => {
    try {
      const productId = req.params.id;

      const product = await productsService.getProduct({ id: productId });

      res.status(200).send(product);
    } catch(err) {
      next(err);
    }
});


// admin이 상품 추가
productsRouter.post('/admin', adminOnly, upload.fields([ { name: 'main', maxCount: 1 }, { name: 'sub', maxCount: 1}]), async (req, res, next) => {
    try {
      const mImg = req.files.main[0].location;
      const sImg = req.files.sub[0].location;

      const { category, taste, name, price, amount, description, show, origin } = JSON.parse(req.body.data);
      const newProduct = await productsService.addProduct({ category, taste, name, price, amount, mainImg: mImg, subImg: sImg, description, show, origin });

      res.status(200).json(newProduct);
    } catch(err) {
      next(err);
    }
});

// admin이 상품 수정
productsRouter.put('/admin/:id', adminOnly, async (req, res, next) => {
  try {
    const productId = req.params.id;

    const category = req.body.category;
    const taste = req.body.taste;
    const name = req.body.name;
    const price = req.body.price;
    const amount = req.body.amount;
    const mainImage = req.body.mainImage;
    const subImage = req.body.subImage;
    const description = req.body.description;
    const show = req.body.show;
    const reg_date = req.body.reg_date;
    const origin = req.body.origin;

    const newProductValue = { category, taste, name, price, amount, mainImage, subImage, description, show, reg_date, origin };
      
    const putProduct = await productsService.putProduct({ id: productId, newProductValue });

      res.status(200).send(putProduct);
  } catch(err) {
    next(err);
  }
});

// admin이 삭제
productsRouter.delete('/admin/:id', adminOnly, async (req, res, next) => {
  try {
    const productId = req.params.id;
    const deleteProduct = await productsService.deleteProduct({ id: productId });

      res.status(200).send(deleteProduct);
  } catch(err) {
    next(err);
  }
});


module.exports = productsRouter;