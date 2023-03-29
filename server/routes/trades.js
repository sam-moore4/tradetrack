let express = require("express");
let router = express.Router();
let Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.tradesController.getTrades(res);
});

router.post("/create", (req, res) => {
  Controllers.tradesController.createTrades(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.tradesController.updateTrades(req, res);
});

module.exports = router;
