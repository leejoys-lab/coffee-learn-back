const User = require("./schema/userSchema");

class UserModel {

    static async findByEmail({ email }) {
        const user = await User.findOne({ email });
        return user;
      }

    static async findAll() {
        const users = await User.find({});
        return users;
    }

    static async create({ newUser }) {
        const createdNewUser = await User.create(newUser);
        return createdNewUser;
    }

    static async findById({ id }) {
        const user = await User.findById(id);
        return user;
    }

    static async update({ id, newUserValue }) {
        await User.updateOne( { _id: id }, { $set: newUserValue });
    
        const finduser = await User.findById(id);

        return finduser;
    }

    static async delete({ id }) {
        await User.deleteOne({ _id: id });

        return "회원 탈퇴 완료";
    }

}

module.exports = UserModel;