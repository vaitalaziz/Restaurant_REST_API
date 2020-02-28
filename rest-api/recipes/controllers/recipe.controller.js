// Image related parts are copied from Udemy by Max

const multer = require("multer");
const RecipeModel = require('../models/recipe.model');

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});

exports.createRecipe = ('', multer({ storage: storage }).single("image"), (req, res, next) => {
    console.log('I am kicked');
    const url = req.protocol + "://" + req.get("host");
    const recipe = new RecipeModel({
        title: req.body.title,
        description: req.body.description,
        allIngredients: req.body.stocked_ingredients,
        // imagePath: url + "/images/" 
    });
    recipe
        .save()
        .then(createdRecipe => {
            res.status(201).json({
                message: "Recipe added successfully",
                post: {
                    ...createdRecipe
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Creating a Recipe failed!",
                post: error
            });
        });
});

exports.fetchAllRecipes = (req, res, next) => {
    console.log('I am kicked');
    RecipeModel.find().then(results => {
        res.status(200).json({
            message: "Posts fetched successfully",
            posts: results
        });
    });
}