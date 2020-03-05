const RecipeController = require("../controllers/recipe.controller");


exports.routesConfig = (app) => {
    // app.post('/create-recipe', [RecipeController.createRecipe]);
    app.post('/v1/recipes/', [RecipeController.createRecipe]);
    app.get('/v1/recipes/', [RecipeController.fetchAllRecipes]);
    app.get('/v1/recipes/:id', [RecipeController.fetchRecipe]);
    app.delete('/v1/recipes/:id', [RecipeController.deleteRecipe]);
    app.put('/v1/recipes/:id', [RecipeController.updateRecipe]);
}


