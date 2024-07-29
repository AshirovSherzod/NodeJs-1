const { users, products } = require("../server")
const express = require("express")
const router = express.Router()

router.get("/products", (req, res) => {

    if (!products.length) {
        return res.status(400).json({
            msg: "Malumot Topilmadi",
            variant: "error",
            payload: null
        })
    }

    res.status(200).json({
        msg: "Barcha mahsulotlar",
        variant: "success",
        payload: products,
        total: products.length
    })
})

router.post("/products", (req, res) => {

    let existUser = products.find(product => product.title === req.body.title)

    if (existUser) {
        return res.status(400).json({
            msg: "Bunday foydalanuvchi yaratilgan",
            variant: "error",
            payload: null
        })
    }

    let { title, price, category, url } = req.body
    let newProduct = {
        id: new Date().getTime(),
        title,
        price,
        category,
        url,
    }

    products.push(newProduct)
    res.status(201).json({
        msg: "Mahsulot muvaffaqiyatli qo'shildi",
        variant: "success",
        payload: newProduct
    })
})

router.delete("/products/:id", (req, res) => {

    let productIndex = products.findIndex(product => product.id === +req.params.id)
    if (productIndex < 0) {
        return res.status(400).json({
            msg: "Bunday  foydalanuvchi topilmadi",
            variant: "error",
            payload: null
        })
    }

    products.splice(productIndex, 1)
    res.status(201).json({
        msg: "Mahsulot o'chirildi",
        variant: "success",
        payload: null,
    })
})

router.put("/products/:id", (req, res) => {

    let productIndex = products.findIndex(product => product.id === +req.params.id)
    if (productIndex < 0) {
        return res.status(400).json({
            msg: "Bunday  foydalanuvchi topilmadi",
            variant: "error",
            payload: null
        })
    }

    let { title, price, category, url } = req.body
    let newProduct = {
        id: req.params.id,
        title,
        price,
        category,
        url
    }

    products.splice(productIndex, 1, newProduct)
    res.status(201).json({
        msg: "Mahsulot muvaffqaiyatli o'zgartirildi",
        variant: "success",
        payload: newProduct,
    })
})

module.exports = router