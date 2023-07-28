const Order = require("../model/orderModel");
const User = require("../../users/model/userModel");
const dayjs = require("dayjs");

class orderService {

    static async getUser({ id }) {
        const user = await User.findById({ id });

        if(!user) {
            throw new Error("일치하는 회원이 없습니다. 다시 확인해 주세요.");
        }

        return user;
    }

    static async addOrder({ userId, products, receiver, receiverPhone, receiverAddr }) {
        const status = "결제 완료";
        const days = dayjs().format('YYYY-MM-DD HH:mm:ss');

        const newOrder = { products, status, reg_date: days, userId, receiver, receiverPhone, receiverAddr };

        const createdOrder = await Order.create({ newOrder });

        return createdOrder;
    }

    static async getOrder({ id }) {
        const user = await User.findById({ id });

        if(!user) {
            throw new Error("일치하는 회원이 없습니다. 다시 확인해 주세요.");
        }

        console.log(user.id);

        const orderList = await Order.findByUserId({ id });

        return orderList;
    }

    static async putUserOrder({ id, putOrderValue }) {
        let order = await Order.findById({ id });

        if(!order) {
            throw new Error("해당 주문이 없습니다. 다시 확인해 주세요.");
        } else if( order.status === "주문 취소") {
            throw new Error("이미 취소 상태이므로 수정할 수 없습니다.");
        } else if( order.status === "배송 준비중") {
            throw new Error("배송 준비 중이므로 수정할 수 없습니다.");
        }

        order = await Order.updateUser({ id, putOrderValue });

        return order;
    }

    static async cancelOrder({ id }) {
        let order = await Order.findById({ id });

        if(!order) {
            throw new Error("해당 주문이 없습니다. 다시 확인해 주세요.");
        } else if( order.status === "주문 취소") {
            throw new Error("이미 취소 상태이므로 수정할 수 없습니다.");
        }

        order = await Order.cancel({ id });

        return order;
    }


    // 관리자
    static async getOrderList() {
        const orderList = await Order.findAll();

        return orderList;
    }

    static async putOrder({ id, status }) {
        let order = await Order.findById({ id });

        if(!order) {
            throw new Error("해당 주문이 없습니다. 다시 확인해 주세요.");
        }

        order = await Order.update({ id, status });

        return order;
    }

    static async deleteOrder({ id }) {
        const order = await Order.findById({ id });

        if(!order) {
            throw new Error("해당 주문이 없습니다. 다시 확인해 주세요.");
        }

        const result = await Order.delete({ id });

        return result;
    }



}

module.exports = orderService;