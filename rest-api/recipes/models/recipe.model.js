const mongoose = require("mongoose");

const ingredients = mongoose.Schema({
    name: String,
    amount: Number,
    amountType: String
});


const recipeSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdDate: { type: Date, required: true },

    // Is it right way for allIngredients ???
    allIngredients: { type: [ingredients], required: true },

    // imagePath: { type: String, required: true }
});

module.exports = mongoose.model("Recipe", recipeSchema);
