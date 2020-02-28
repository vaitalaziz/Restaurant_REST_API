const RecipeController = require("../controllers/recipe.controller");


exports.routesConfig = (app) => {
    // app.post('/create-recipe', [RecipeController.createRecipe]);
    app.post('/api/post', [RecipeController.createRecipe]);
    app.get('/fetch-all-recipes', [RecipeController.fetchAllRecipes]);
}


