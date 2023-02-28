import items from '../data.json'
function createIngredientDetailsArray(meal) {
    let ingredientDetailsArray = [];
  
    meal.ingredients.forEach(ingredient => {
      ingredientDetailsArray.push(
        {
          "ingredient_basics" : ingredient,
          "ingredient_details" : getIngredientData(ingredient.name)
        }
      );
    });
  
    return ingredientDetailsArray;
  }
  
 function getIngredientData(ingredientName) {
    let resultIngredient = null;
    for (let i = 0; i < items.ingredients.length; i++) {
      if (items.ingredients[i].name === ingredientName) {
        resultIngredient = items.ingredients[i];
      }
    }
    return resultIngredient;
  }

  export default (getIngredientData, createIngredientDetailsArray)