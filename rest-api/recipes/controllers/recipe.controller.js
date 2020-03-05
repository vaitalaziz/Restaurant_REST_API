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
        createdDate: new Date()
        // imagePath: url + "/images/"
    });
    recipe
        .save()
        .then(createdRecipe => {
            res.status(201).json({
                message: "Recipe added successfully",
                data: {
                    ...createdRecipe
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Creating a Recipe failed!",
                data: error
            });
        });
});

exports.fetchAllRecipes = (req, res, next) => {
    RecipeModel.find().then(results => {
        res.status(200).json({
            message: "Recipe fetched successfully",
            data: results
        });
    });
}

exports.deleteRecipe = (req, res) => {
    RecipeModel.deleteOne({ _id: req.params.id })
        .then(result => {
            if (result.n > 0) {
                res.status(200).json({ message: 'Recipe Deleted' })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Deleting recipe failed'
            });
        });

}

exports.updateRecipe = (req, res, next) => {
    // TODO: image
    const recipe = new RecipeModel({
        _id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        allIngredients: req.body.stocked_ingredients
    });
    RecipeModel.updateOne({ _id: req.params.id }, recipe)
        .then(result => {
            if (result.n > 0) {
                res.status(200).json({ message: 'Update successful' });
                return;
            }
            // TODO: auth failed
        })
        .catch(error => {
            res.status(500).json({ message: 'Update failed' })
        });
}

exports.fetchRecipe = (req, res, next) => {
    RecipeModel.findById(req.params.id)
        .then(result => {
            if (result) {
                res.status(200).json(result);
                return;
            }
            res.status(404).json({ message: 'Recipe not exist' });
        })
        .catch(errror => {
            res.status(500).json({ message: 'Recipe can not fetch' });
        })
}
