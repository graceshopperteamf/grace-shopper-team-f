const router = require("express").Router();
const { Op } = require("sequelize");
const adminMiddleware = require("./adminMiddleware");
const { Artist, Product, productKeys } = require("../db/models");

router.get("/", async (req, res, next) => {
    try {
        const products = await Product.findAll({ include: [Artist] });
        res.status(200).json(products);
    } catch (e) {
        next(e);
    }
});

router.post("/", async (req, res, next) => {
    console.log(req.body);
    const { id } = req.body;
    try {
        const products = await Product.findAll({
            where: {
                id: {
                    [Op.in]: id
                },
            },
            include: [Artist],
        });

        res.status(200).json(products);
    } catch (e) {
        next(e);
    }
});

router.get("/:productId", async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.productId, {
            include: [Artist],
        });
        res.status(200).json(product);
    } catch (e) {
        next(e);
    }
});

router.delete("/:productId", adminMiddleware, async (req, res, next) => {
    try {
        await Product.destroy({ where: { id: req.params.productId } });
        res.status(204).end();
    } catch (e) {
        next(e);
    }
});

router.put("/:productId", adminMiddleware, async (req, res, next) => {
    try {
        let product = await Product.findByPk(req.params.productId, {
            include: [Artist],
        });

        // build the product template with keys from the req.body if they're supplied
        const prod = {};
        productKeys.forEach((k) => {
            if (k in req.body) prod[k] = req.body[k];
        });

        product = await product.update(prod);
        res.status(200).json(product);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
