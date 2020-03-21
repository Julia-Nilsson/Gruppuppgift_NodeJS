const express = require("express");
const Candy = require("../../model/productSchema");
const User = require("../../model/userSchema");
const router = express.Router();


router.route("/admin")
    .get(async (req, res) => {
        const sortName = req.query.name;
        const sortPrice = req.query.price;
        const sortCategory = req.query.category;
        const queryExist = req.query.page;

        let productQuantity = await Candy.find().countDocuments();

        const page = +req.query.page || 1;
        const productsPerPage = 4;
        let pageQuantity = await Candy.find().countDocuments() / productsPerPage;
        pageQuantity = Math.ceil(pageQuantity);

        const pageCount = Math.ceil(productQuantity / productsPerPage)

        const findCandy = await Candy.find().collation({ locale: "sv", strength: 2 }).sort({ name: sortName }).skip(productsPerPage * (page - 1)).limit(productsPerPage);

        res.render("admin/admin", { findCandy, page, pageQuantity, productsPerPage, queryExist, pageCount, title: "Admin - Lasses Lakrits" })
    })
    .post(async (req, res) => {
        await new Candy({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            color: req.body.color,
            createdByAdmin: req.body.createdByAdmin,
            img: req.body.img

        }).save((error, success) => {
            if (error) {
                res.send(error.message);
            }
            else {
                res.redirect("/admin");
            }
        });
    });

router.route("/delete/:id")
    .get(async (req, res) => {
        await Candy.deleteOne({ _id: req.params.id });
        res.redirect("/admin");
    })


router.route("/update/:id")
    .get(async (req, res) => {
        const updateCandy = await Candy.findById({ _id: req.params.id });
        res.render("admin/update", { updateCandy, title: "Update Candy" });
    })
    .post(async (req, res) => {
        await Candy.updateOne({ _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    price: req.body.price,
                    description: req.body.description,
                    category: req.body.category,
                    color: req.body.color,
                    createdByAdmin: req.body.createdByAdmin,
                    img: req.body.img
                }
            }, { runValidators: true });
        res.redirect("/admin");
    })


router.route("/admin2")
    .get(async (req, res) => {
        const sortName = req.query.name;
        const sortAdmin = req.query.admin;

        const queryExist = req.query.page;

        let userQuantity = await User.find().countDocuments();

        const page = +req.query.page || 1;
        const usersPerPage = 4;
        let pageQuantity = await User.find().countDocuments() / usersPerPage;
        pageQuantity = Math.ceil(pageQuantity);

        const pageCount = Math.ceil(userQuantity / usersPerPage)

        let onlyUsers = { admin: false };
        const findUsers = await User.find(onlyUsers).collation({ locale: "sv", strength: 2 }).sort({ name: sortName }).skip(usersPerPage * (page - 1)).limit(usersPerPage);

        let onlyAdmins = { admin: true };
        const findAdmins = await User.find(onlyAdmins).collation({ locale: "sv", strength: 2 }).sort({ admin: sortAdmin }).skip(usersPerPage * (page - 1)).limit(usersPerPage);

        res.render("admin/admin2", { findUsers, findAdmins, page, pageQuantity, usersPerPage, queryExist, pageCount, title: "Admin - Lasses Lakrits" })
    })


router.route("/updateUser/:id")
    .get(async (req, res) => {
        const findUser = await User.findById({ _id: req.params.id });
        res.render("admin/updateUser", { findUser, title: "Update Admin" });
    })
    .post(async (req, res) => {
        await User.updateOne({ _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    admin: req.body.admin
                }
            }, { runValidators: true });
        res.redirect("/admin2");
    })
    

module.exports = router;