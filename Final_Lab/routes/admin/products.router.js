const express = require("express");
let router = express.Router();
let multer = require("multer");
const cloudinary = require("../../lib/cloudinary");
const storage =multer.memoryStorage();
const upload = multer({ storage: storage })

let Product = require("../../models/product.model");

router.get("/admin/products/delete/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  return res.redirect("back");
});


router.get("/admin/products/edit/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);
  return res.render("admin/product-edit-form", {
    product,
    layout: "admin/admin-layout",
  });
});


router.post("/admin/products/edit/:id", upload.single("file"), async (req, res) => {
  try {
    // Find the product by ID
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    // Update product fields with the new data
    product.title = req.body.title;
    product.description = req.body.description;
    product.price = req.body.price;

    // Check if a new file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Product Picture is required" });
    }
    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64Image,{
      folder: "products",
    });
    product.picture = result.secure_url;
  
    product.isFeatured = req.body.isFeatured === 'on'; // Convert to boolean

    // Save the updated product to the database
    await product.save();
    console.log("Product updated:", product); // Log the updated product

    // Redirect to the products list after successful update
    return res.redirect("/admin/products");
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).send("Internal Server Error");
  }
});




router.get("/admin/products/create", (req, res) => {
  // if (req.query.title) return res.send(req.query);
  // res.send("This is products creat page");
  res.render("admin/product-form", { layout: "admin/admin-layout" });
});



router.post("/admin/products/create", upload.single("file"), async (req, res) => {
  try {
    let newProduct = new Product(req.body);

    if (!req.file) {
      return res.status(400).json({ message: "Product Picture is required" });
    }

    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "products",
    });

    newProduct.picture = result.secure_url;
    newProduct.isFeatured = req.body.isFeatured === "on"; // boolean conversion

    await newProduct.save();
    return res.redirect("/admin/products");

  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).send("Internal Server Error");
  }
});




router.get("/admin/products/:page?", async (req, res) => {
  let page = req.params.page ? Number(req.params.page) : 1;
  let pageSize = 5;

  // Get filtering and sorting parameters from query
  let sortField = req.query.sortField || 'title';
  let sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
  let filter = {};
  
  // Add filter for isFeatured
  if (req.query.filterFeatured === 'true') {
    filter.isFeatured = true;
  } else if (req.query.filterFeatured === 'false') {
    filter.isFeatured = false;
  }

  // Fetch products with filtering and sorting
  let products = await Product.find(filter)
    .sort({ [sortField]: sortOrder })
    .limit(pageSize)
    .skip((page - 1) * pageSize);

  let totalRecords = await Product.countDocuments(filter);
  let totalPages = Math.ceil(totalRecords / pageSize);

  res.render("admin/products", {
    layout: "admin/admin-layout",
    products,
    page,
    totalRecords,
    totalPages,
    sortField,
    sortOrder,
    currentFilter: req.query.filterFeatured // Pass current filter to view
  });
});

module.exports = router;
