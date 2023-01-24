const express = require('express');
const router = express.Router();
const {users} = require('../models');
const bcrypt = require("bcrypt");
const {sign} = require("jsonwebtoken");
const {validateToken} = require("../middlewares/ValidMiddleware");

// Auth and information about logged user
router.get("/valid", validateToken, (req, res) => {
    res.json(req.user);
});

// Information about the user
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await users.findByPk(id, {
        attributes: {
            exclude: ["password"]
        }
    });
    res.json(user);
});

// Create user
router.post("/", async (req, res) => {
    const {username, email, password} = req.body;

    const user = await users.findOne({
        where: {
            username: username
        }
    });

    if (user != null) {
        res.json({error: "Podany przez Ciebie login jest zajęty!"});
        return;
    }

    bcrypt.hash(password, 5).then((hash) => {
        users.create({
            username: username,
            email: email,
            password: hash,
        });
        res.json({success: "Mozesz sie zalogować"});
    });
});

// Login and creating access token
router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    const user = await users.findOne({
        where: {
            username: username
        }
    });

    if (user == null) {
        res.json({error: "Nie ma użytkownika o podanym loginie!"});
        return;
    }

    bcrypt.compare(password, user.password).then((valid) => {
        if (valid) {
            const accessToken = sign({username: user.username, id: user.id}, "secretKey");
            res.json({token: accessToken, username: username, id: user.id});
        } else {
            res.json({error: "Błędne hasło!"});
        }
    });
});

module.exports = router;