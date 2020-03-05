const UserController = require("../controllers/user.controller");

exports.routesConfig = (app) => {
    app.post('/v1/users/sign-up/', [UserController.signUp]);
    app.post('/v1/users/log-in/', [UserController.logIn]);
}