const router = require("express").Router();
const handleAsyncError = require("express-async-wrap");
const {
  searchSymbol
} = require("../../controllers/market_controller");

const jwt = require("../../middlewares/jwt_middleware");

router.post("/markets/search", handleAsyncError(searchSymbol));

module.exports = router;
