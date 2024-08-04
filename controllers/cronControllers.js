const model = require("../models/index");
const { RouterOSAPI } = require("node-routeros");
const { Op } = require('sequelize');
const sumCron = async (req, res) => {
    try {
        const data = await model.BulkPop.findAll();

        for (let i = 0; i < data.length; i++) {
            try {
                const pop = data[i];
                const mikrotikConfig = {
                    host: pop.host,
                    user: pop.user,
                    password: pop.password,
                    port: pop.port,
                };
                const conn = new RouterOSAPI(mikrotikConfig);
                await conn.connect();
                const active = await conn.write("/ppp/active/print");
                const total = await conn.write("/ppp/secret/print");
                conn.close();
                pop.update({ total: total.length, online: active.length, offline: total.length - active.length });
            } catch (error) {
                console.log(error);
            }
        }
        res.send({ status: true, data: data });
    } catch (error) {
        console.log(error);
        // res.status(404).send({
        //     status: false,
        //     message: "terjadi error",
        // });
    }
};
const destroyCron = async (req, res) => {
    // await model.HostStatus.truncate();
    // return res.send({ status: true });
    
    try {
        const idsToKeep = await model.HostStatus.findAll({
            attributes: ['user', [model.Sequelize.fn('MIN', model.Sequelize.col('id')), 'minId']],
            group: ['user'],
            raw: true
        });

        const idsToKeepSet = new Set(idsToKeep.map(entry => entry.minId));

        await model.HostStatus.destroy({
            where: {
                id: {
                    [Op.notIn]: Array.from(idsToKeepSet)
                }
            }
        });

        // return res.send({ status: true });
    } catch (error) {
        console.error('Error deleting records:', error);
        // return res.status(500).send({ status: false, error: 'Internal server error' });
    }
};

module.exports = { sumCron, destroyCron };
