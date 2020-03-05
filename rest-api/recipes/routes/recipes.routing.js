const RecipeController = require("../controllers/recipe.controller");


exports.routesConfig = (app) => {
    // create new recipe
    app.post('/v1/recipes/', [RecipeController.createRecipe]);
    // fetch all recipe
    app.get('/v1/recipes/', [RecipeController.fetchAllRecipes]);
    // fetch a specific recipe by id
    app.get('/v1/recipes/:id', [RecipeController.fetchRecipe]);
    // delete a specific recipe by id 
    app.delete('/v1/recipes/:id', [RecipeController.deleteRecipe]);
    // update a specific recipe by id
    app.put('/v1/recipes/:id', [RecipeController.updateRecipe]);
}


