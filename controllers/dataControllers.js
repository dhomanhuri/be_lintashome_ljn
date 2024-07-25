const model = require("../models/index");
const Validator = require("fastest-validator");
const v = new Validator();
const moment = require("moment");
const { Sequelize, Model, DataTypes, Op, where } = require("sequelize");
const hoststatus = async (req, res) => {
    try {
        let data = await model.HostStatus.findAll({
            where: {
                id: {
                    [Op.in]: Sequelize.literal(`
                  (SELECT MAX(id)
                   FROM HostStatuses
                   GROUP BY user)
                `),
                },
            },
        });
        const currentTime = moment();
        for (let index = 0; index < data.length; index++) {
            const element = data[index];

            element.time = moment(element.createdAt).format("HH:mm:ss");
            const duration = moment.duration(currentTime.diff(element.createdAt));
            const hours = duration.hours();
            const minutes = duration.minutes();
            element.downtime = hours + ":" + minutes;
            element.count = await model.HostStatus.count({
                where: { [Op.and]: [{ user: element.user }, { status: "down" }] },
            });
        }
        data = data.filter((item) => item.status !== "up");

        res.status(200).send({
            status: true,
            data: data,
            message: "success",
        });
    } catch (error) {
        console.log(error);

        res.status(404).send({
            status: false,
            message: "data kososng",
        });
    }
};

const bulkpop = async (req, res) => {
    try {
        let data = await model.BulkPop.findAll();
        if (!data) {
            throw "data kosong";
        }
        res.status(200).send({
            status: true,
            data: data,
            message: "success",
        });
    } catch (error) {
        console.log(error);

        res.status(404).send({
            status: false,
            message: "data kososng",
        });
    }
};
const bulkpop_add = async (req, res) => {
    try {
        const schema = {
            name: { type: "string", min: 1, max: 255 },
            host: { type: "string", min: 1, max: 255 },
            user: { type: "string", min: 1, max: 255 },
            password: { type: "string", min: 1, max: 255 },
            port: { type: "string", min: 1, max: 255 },
        };

        const validate = v.validate(req.body, schema);
        if (validate.length) {
            console.log(validate);
            return res.status(400).json({
                status: false,
                message: validate[0].message,
            });
        }

        let data = await model.BulkPop.create(req.body);

        res.status(200).send({
            status: true,
            data: req.body,
            message: "successfully add data",
        });
    } catch (error) {
        console.log(error);

        res.status(404).send({
            status: false,
            message: "data kososng",
        });
    }
};
const hapus = async (req, res) => {
    try {
        const data = await model.HostStatus.findAll({
            where: {
                [Sequelize.Op.and]: [
                    {
                        pop_id: req.params.id,
                    },
                    {
                        user: decodeURI(req.params.username),
                    },
                ],
            },
        });
        console.log({ data });
        data.forEach((element) => {
            element.destroy();
        });
        return res.status(200).send({
            status: true,
            message: "User Solved",
        });
    } catch (error) {
        console.log(error);

        return res.status(400).send({
            status: false,
            message: "terjadi kesalahan",
        });
    }
};
const bulkpop_put = async (req, res) => {
    try {
        const schema = {
            name: { type: "string", min: 1, max: 255 },
            host: { type: "string", min: 1, max: 255 },
            user: { type: "string", min: 1, max: 255 },
            password: { type: "string", min: 1, max: 255 },
            port: { type: "string", min: 1, max: 255 },
        };

        const validate = v.validate(req.body, schema);
        if (validate.length) {
            console.log(validate);
            return res.status(400).json({
                status: false,
                message: validate[0].message,
            });
        }

        let data = await model.BulkPop.findByPk(req.params.id);
        data.update(req.body);
        res.status(200).send({
            status: true,
            data: req.body,
            message: "successfully update data",
        });
    } catch (error) {
        console.log(error);

        res.status(404).send({
            status: false,
            message: "data kososng",
        });
    }
};
const bulkpop_delete = async (req, res) => {
    try {
        let data = await model.BulkPop.findByPk(req.params.id);
        data.destroy();
        res.status(200).send({
            status: true,
            message: "successfully delete data",
        });
    } catch (error) {
        console.log(error);

        res.status(404).send({
            status: false,
            message: "data kososng",
        });
    }
};

const host_data = async (req, res) => {
    console.log(req.query);
    let data = await model.BulkPop.findOne({
        where: {
            host: req.query.host,
        },
    });
    console.log(data);
    await model.HostStatus.create({
        pop_id: data.id,
        user: req.query.user,
        pop: data.name,
        status: req.query.status,
    });
    res.send(req.query);
};

module.exports = { bulkpop, hoststatus, bulkpop_add, bulkpop_put, bulkpop_delete, host_data, hapus };
