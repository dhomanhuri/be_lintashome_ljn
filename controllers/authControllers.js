const jwt = require("jsonwebtoken");
const model = require("../models/index");
const Validator = require("fastest-validator");
const v = new Validator();

const { hashpw, comparepw } = require("../utils/bcrypt");
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await model.User.findOne({ where: { email: email } });
        const isPasswordTrue = await comparepw(password, user.dataValues.password);
        if (isPasswordTrue != true) {
            throw "salah";
        }
        const usertoken = user.dataValues;
        delete usertoken.password;

        const token = jwt.sign(usertoken, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.send({
            status: true,
            message: "successfully login",
            data: {
                token: token,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            status: false,
            message: "unauthorize",
        });
    }
};

const isLogin = (req, res) => {
    res.send({
        status: true,
    });
};
const identity = (req, res) => {
    res.send({
        status: true,
        data: req.user,
    });
};

const register = async (req, res) => {
    const schema = {
        name: { type: "string", min: 3, max: 255 },
        email: { type: "email", min: 3, max: 255 },
        password: { type: "string", min: 8, max: 20 },
    };

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        console.log(validate);
        return res.status(400).json({
            status: false,
            message: validate[0].message,
        });
    }
    req.body.password = await hashpw(req.body.password);
    const data = await model.User.create(req.body);
    return res.send({
        status: true,
        data: data,
        message: "data successfully register",
    });
};
module.exports = { login, isLogin, register, identity };
