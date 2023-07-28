const Order = require("./schema/orderSchema");
const User = require("../..//users/model/schema/userSchema");

class OrderModel {

    static async userfindById({ id }) {
        const user = await User.findById(id);
        return user;
    }

    static async findById({ id }) {
        const order = await Order.findById(id);
        return order;
    }

    static async findAll() {
        return await Order.find({});
    }

    static async findByUserId({ id }) {
        const orderList = await Order.findOne({ userId: id });

        return orderList;
    }

    static async cancel({ id }) {
        await Order.updateOne( { _id: id }, { status: "주문 취소" });

        const findOrder = await Order.findById(id);

        return findOrder;
    }

    static async create({ newOrder }) {
        const order = await Order.create(newOrder);

        return order;
    }

    static async update({ id, status }) {
        await Order.updateOne({ _id: id }, { status: status });

        const findOrder = await Order.findById(id);

        return findOrder;
    }

    static async delete({ id }) {
        await Order.deleteOne({ _id: id });

        return "주문 삭제 완료";
    }

    static async updateUser({ id, putOrderValue }) {
        await Order.updateOne({ _id: id }, { $set: putOrderValue });

        const findOrder = await Order.findById(id);

        return findOrder;
    }

}

module.exports = OrderModel;
