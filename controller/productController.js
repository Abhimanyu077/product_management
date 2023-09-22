const produceSchema = require("../model/productSchema");
const seedData = require("../seedData");
const json2csv = require("json2csv").parse;

module.exports = {
  createData: async (req, res) => {
    try {
      const data = await produceSchema.insertMany(seedData);
      res.status(201).json({
        success: true,
        message: "user data successfully seeded",
        data: data,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  downloadProductsCSV: async (req, res) => {
    try {
      const getData = await produceSchema.find();
      const filteredData = getData.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));
      const csvData = json2csv(filteredData, { header: true });
      res.status(200).send(csvData);
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  downloadProductsJSON: async (req, res) => {
    try {
      const data = await produceSchema.find();
      res.status(201).json({
        success: true,
        message: "user data successfully seeded",
        data: data,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  updatePrices: async (req, res) => {
    try {
      const updateData = req.body;
      const updatedProducts = [];
      for (const item of updateData) {
        const { id, newPrice } = item;
        const updatedProduct = await produceSchema.findOneAndUpdate(
          { _id: id },
          { price: newPrice },
          { new: true, select: "-updatedAt -createdAt -__v -quantity " }
        );
        if (updatedProduct) {
          updatedProducts.push(updatedProduct);
        }
      }
      const updatedProductCount = updatedProducts.length;
      if (updatedProductCount > 0) {
        res.status(200).json({
          success: true,
          message: `${updatedProductCount} product's updated successfully.`,
          updatedProductCount: updatedProductCount,
          updatedProducts: updatedProducts,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "No products were updated.",
          updatedProductCount: 0,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  pagination: async (req, res) => {
    try {
      const { page, limit } = req.query;
      if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
        return res
          .status(400)
          .json({ error: "Invalid pagination parameters." });
      }
      const startIndex = (page - 1) * limit;
      const paginatedRecords = await produceSchema
        .find()
        .skip(startIndex)
        .limit(limit);
      res.json({ success: true, records: paginatedRecords });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};
