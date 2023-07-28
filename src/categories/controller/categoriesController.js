const express = require("express");
const categoriesRouter = express();
const categoryService = require("../service/categoryService");
const adminOnly = require("../../middlewares/admin-only");

// 카테고리 추가
categoriesRouter.post('/admin', adminOnly, async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newCategory = await categoryService.addCategory({ name, description });

    res.status(200).json(newCategory);
  } catch(err) {
    next(err);
  }
});

// 카테고리 리스트 불러오기
categoriesRouter.get('/', async (req, res, next) => {
    try {
      const categoryList = await categoryService.getCategoryList();

      res.status(200).json(categoryList);
    } catch(err) {
      next(err);
    }
});

// 카테고리 하나 정보 가져오기
categoriesRouter.get('/:id', async (req, res, next) => {
    try {
      
      const categoryId = req.params.id;
      const category = await categoryService.getCategory({ id: categoryId });

      res.status(200).send(category);
    } catch(err) {
      next(err);
    }
});

// soft삭제 vs 완전삭제
// 우선 완전삭제 쪽으로
categoriesRouter.delete('/admin/:id', adminOnly, async (req, res, next) => {
    try {
      const categoryId = req.params.id;
      const deleteCategory = await categoryService.deleteCategory({ id: categoryId });

      res.status(200).send(deleteCategory);
    } catch(err) {
      next(err);
    }
});

// 수정
categoriesRouter.put('/admin/:id', adminOnly, async (req, res, next) => {
    try {
      const categoryId = req.params.id;
      const name = req.body.name;
      const description = req.body.description;
      const newCategoryValue = { name, description };
      
      const putCategory = await categoryService.putCategory({ categoryId, newCategoryValue });

      res.status(200).send(putCategory);
    } catch(err) {
      next(err);
    }
});


module.exports = categoriesRouter;