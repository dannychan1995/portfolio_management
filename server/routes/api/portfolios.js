const router = require("express").Router();
const handleAsyncError = require("express-async-wrap");
const {
  addPofolio
} = require("../../controllers/portfolio_controller");

const jwt = require("../../middlewares/jwt_middleware");

router.post("/portfolios", jwt.required, handleAsyncError(addPofolio));

module.exports = router;
