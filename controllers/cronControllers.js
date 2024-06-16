const model = require("../models/index");
const { RouterOSAPI } = require("node-routeros");
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
                    port: pop.port
                };
                const conn = new RouterOSAPI(mikrotikConfig);
                await conn.connect();
                const active = await conn.write("/ppp/active/print");
                const total = await conn.write("/ppp/secret/print");
                conn.close();
                pop.update({ total: total.length, online: active.length, offline: total.length - active.length })
            } catch (error) {
                console.log(error);
            }
        }
        res.send({ status: true, data: data })
    } catch (error) {
        console.log(error);
        res.send({ status: false, error: "terjadi kesalahan" })
    }
}
const destroyCron = async (res, req) => {
    await model.HostStatus.truncate();
    return res.send({ status: true })
}

module.exports = { sumCron, destroyCron };