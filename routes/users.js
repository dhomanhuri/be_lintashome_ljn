var express = require("express");
var router = express.Router();
const { auth } = require("../middleware/auth");
const exampleControllers = require("../controllers/exampleControllers");
const authControllers = require("../controllers/authControllers");
const dataControllers = require("../controllers/dataControllers");

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("hhe");
});

router.post("/register", authControllers.register);

router.get("/hoststatus", dataControllers.hoststatus);
router.get("/bulkpop", dataControllers.bulkpop);
router.post("/bulkpop", dataControllers.bulkpop_add);
router.put("/bulkpop/:id", dataControllers.bulkpop_put);
router.delete("/bulkpop/:id", dataControllers.bulkpop_delete);
router.post("/login", authControllers.login);
router.get("/islogin", auth, authControllers.isLogin);

module.exports = router;