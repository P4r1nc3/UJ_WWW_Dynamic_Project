const express = require('express');
const router = express.Router();
const {products} = require('../models');
const {validateToken} = require("../middlewares/ValidMiddleware");

// get active user products
router.get("/active/:username", validateToken, async (req, res) => {
    const username = req.params.username;
    const listOfProducts = await products.findAll({
        where: {
            username: username,
            ended: false
        }
    });
    res.json(listOfProducts);
});

// get ended user products
router.get("/ended/:username", validateToken, async (req, res) => {
    const username = req.params.username;
    const listOfProducts = await products.findAll({
        where: {
            username: username,
            ended: true
        }
    });
    res.json(listOfProducts);
});

// get product by id
router.get("/byID/:id", async (req, res) => {
    const id = req.params.id;
    const product = await products.findByPk(id);
    res.json(product);
});

// create product
router.post("/", validateToken, async (req, res) => {
    const product = req.body;
    product.username = req.user.username;
    product.UserId = req.user.id;
    await products.create(product);
    res.json(product);
});

// edit product
router.patch("/:id", validateToken, async (req, res) => {
    const id = req.params.id;
    const product = req.body;
    await products.update({
        name: product.name,
        make: product.make,
        details: product.details,
        deadline: product.deadline,
    }, {
        where: {
            id: id
        }
    });
    res.json(product);
});

// remove product
router.patch("/end/:id", validateToken, async (req, res) => {
    const id = req.params.id;
    await products.update({
        ended: true,
    }, {
        where: {
            id: id
        }
    });
    res.json("Usunięto produkt");
});

module.exports = router;