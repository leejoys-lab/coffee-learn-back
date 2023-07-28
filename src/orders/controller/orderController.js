const express = require("express");
const orderRouter = express();
const orderService = require("../service/orderService");
const login_required = require("../../middlewares/login-required");
const adminOnly = require("../../middlewares/admin-only");
const jwt = require("jsonwebtoken");
require('dotenv').config();

// 주문할때 필요한 유저 정보 갖다주는거
orderRouter.get('/orders', login_required, async (req, res, next) => {
    try {
        const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

        const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
        const jwtDecoded = jwt.verify(userToken, secretKey);
        const user_id = jwtDecoded.id;

        const user = await orderService.getUser({ id: user_id });

        res.status(200).send(user);
    } catch(err) {
        next(err);
    } 
});

// 주문
orderRouter.post('/users/orders', login_required, async (req, res, next) => {
    try {
        const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

        const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
        const jwtDecoded = jwt.verify(userToken, secretKey);
        const user_id = jwtDecoded.id;

        const products = req.body.products;
        const receiver = req.body.receiver;
        const receiverPhone = req.body.receiverPhone;
        const receiverAddr = req.body.receiverAddr;

        const order = await orderService.addOrder({ userId: user_id, products, receiver, receiverPhone, receiverAddr });

        res.status(200).send(order);
    } catch(err) {
        next(err);
    }
});

// 주문 조회
orderRouter.get('/mypage/orders', login_required, async (req, res, next) => {
    try {
        const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

        const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
        const jwtDecoded = jwt.verify(userToken, secretKey);
        const user_id = jwtDecoded.id;

        const order = await orderService.getOrder({ id: user_id });

        res.status(200).send(order);
    } catch(err) {
        next(err);
    }
});

// 사용자 주문 수정
orderRouter.put('/mypage/orders/:id', login_required, async (req, res, next) => {
    try{
        const orderId = req.params.id;

        const receiver = req.body.receiver;
        const receiverPhone = req.body.receiverPhone;
        const receiverAddr = req.body.receiverAddr;

        const putOrderValue = { receiver, receiverPhone, receiverAddr };

        const order = await orderService.putUserOrder({ id: orderId,  putOrderValue });

        res.status(200).send(order);
    } catch(err) {
        next
    }
});

// 주문 취소는 상태만 바꾸면 됨
// ++++ 주문 취소상태일때 수정하려고 하면 400 에러 던져주기 +++++
orderRouter.put('/mypage/orders/cancel/:id', login_required, async (req, res, next) => {
    try{
        const orderId = req.params.id;

        const order = await orderService.cancelOrder({ id: orderId });

        res.status(200).send(order);
    } catch(err) {
        next(err);
    }
});


// 관리자
orderRouter.get('/admin/orders', adminOnly, async (req, res, next) => {
    try {
        const orderList = await orderService.getOrderList();

        res.status(200).send(orderList);
    } catch(err) {
        next(err);
    }
});


orderRouter.put('/admin/orders/:id', adminOnly, async (req, res, next) => {
    try{
        const id = req.params.id;

        const status = req.body.status;

        const order = await orderService.putOrder({ id, status });

        res.status(200).send(order);
    } catch(err) {
        next(err);
    }
});

orderRouter.delete('/admin/orders/:id', adminOnly, async (req, res, next) => {
    try {
        const id = req.params.id;

        const result = await orderService.deleteOrder({ id });

        res.status(200).send(result);
    } catch(err) {
        next(err);
    }
});
module.exports = orderRouter;