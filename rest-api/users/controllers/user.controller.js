const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/user.model");
const dbCongif = require("../../config/db.config");


exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hashed => {
            const user = new UserModel({
                email: req.body.email,
                password: hashed
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: "User creation successful",
                        data: result
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        error: error
                    });
                });
        });
};

exports.logIn = (req, res, next) => {
    let recognisedUser;
    UserModel.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Auth invalid' })
            }
            recognisedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({ message: 'Auth invalid' })
            }
            const token = jwt.sign(
                { email: recognisedUser.email, userID: recognisedUser._id },
                dbCongif.secretKey, { expiresIn: "1h" }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userID: recognisedUser._id
            });
        })
        .catch(error => {
            return res.status(401).json({
                message: "Auth failed"
            });
        });
};
