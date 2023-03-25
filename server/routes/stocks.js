let express = require("express");
let router = express.Router();
let Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.stockController.getStock(res);
});

router.post("/create", (req, res) => {
  Controllers.stockController.createStock(req.body, res);
});

module.exports = router;
