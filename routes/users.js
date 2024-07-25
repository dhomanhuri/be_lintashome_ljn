var express = require("express");
var router = express.Router();
const { auth } = require("../middleware/auth");
const exampleControllers = require("../controllers/exampleControllers");
const authControllers = require("../controllers/authControllers");
const dataControllers = require("../controllers/dataControllers");
const cronControllers = require("../controllers/cronControllers");

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("hhe");
});

router.post("/register", authControllers.register);

router.get("/host_data", dataControllers.host_data);
router.get("/test", cronControllers.sumCron);
router.get("/hoststatus", dataControllers.hoststatus);
router.get("/bulkpop", dataControllers.bulkpop);
router.post("/bulkpop", dataControllers.bulkpop_add);
router.put("/bulkpop/:id", dataControllers.bulkpop_put);
router.delete("/bulkpop/:id", dataControllers.bulkpop_delete);
router.post("/login", authControllers.login);
router.get("/islogin", auth, authControllers.isLogin);
router.get("/identity", auth, authControllers.identity);
router.get("/host/:id/:username", dataControllers.hapus);

module.exports = router;
