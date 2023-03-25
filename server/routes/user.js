let express = require("express");
let router = express.Router();
let Controllers = require("../controllers");

router.get("/users", (req, res) => {
  Controllers.userController.getUser(res);
});

router.post("/create", (req, res) => {
  Controllers.userController.createUser(req.body, res);
});

module.exports = router;
