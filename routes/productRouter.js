const express = require("express");
const seedData = require("../controller/productController");
const router = express.Router();

router.post("/createData", seedData.createData);
router.get("/csv", seedData.downloadProductsCSV);
router.get("/json", seedData.downloadProductsJSON);
router.post("/updatePrices", seedData.updatePrices);
router.get("/pagination", seedData.pagination);

module.exports = router;
