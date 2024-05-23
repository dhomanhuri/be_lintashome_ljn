const model = require("../models/index");
const Validator = require("fastest-validator");
const v = new Validator();

const hoststatus = async (req, res) => {
    try {
        let data = await model.HostStatus.findAll();
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
                errors: validate[0].message,
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
                errors: validate[0].message,
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

module.exports = { bulkpop, hoststatus, bulkpop_add, bulkpop_put, bulkpop_delete };
