const router = require("express").Router();
const handleAsyncError = require("express-async-wrap");
const {
  addPortfolio,
  getPortfolio,
  cashInjection
} = require("../../controllers/portfolio_controller");

const jwt = require("../../middlewares/jwt_middleware");

router.post("/portfolios", jwt.required, handleAsyncError(addPortfolio));
router.post("/portfolios/cashInjection", jwt.required, handleAsyncError(cashInjection));
router.get("/portfolios/:id", jwt.required, handleAsyncError(getPortfolio));

module.exports = router;
