import React, { useState } from 'react'
import items from '../../data.json'
import './Meals.css'
import createIngredientDetailsArray from '../../utils/DataUtil'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IngredientRow from './IngredientRow'


function getMealId(url) {
  let lastSlashIndex = url.lastIndexOf("/")
  let idStr = url.substring(lastSlashIndex + 1)
  return parseInt(idStr)
}

function calculateTotalCost(ingredientQualityMap, ingredientDetailsArray) {
  let extraCost = 0
  let cost = 0
  for (let [key, value] of ingredientQualityMap) {
    if (value === null) {
      continue
    }
    else if (value === "medium") {
      extraCost += 0.05
    }
    else if (value === "low") {
      extraCost += 0.1
    }
  }
  
  for (let i = 0; i < ingredientDetailsArray.length; i++) {
    let ingredientDetail = ingredientDetailsArray[i].ingredient_details
    if (ingredientDetail === null) {
      continue
    }
    let priceByGram = 0
    for (let j = 0; j < ingredientDetail.options.length; j++) {
      if (ingredientQualityMap.get(ingredientDetail.name) === ingredientDetail.options[j].quality) {
        priceByGram = ingredientDetail.options[j].price / 1000
        break
      }
    }

    cost += ingredientDetailsArray[i].ingredient_basics.quantity * priceByGram
  }
  let totalCost = cost + extraCost
  return Math.round((totalCost + Number.EPSILON) * 100) / 100;
}

function calculateTotalQuality(ingredientQualityMap) {
  let matchedIngridientCount = 0
  let quality = 0
  for (let [key, value] of ingredientQualityMap) {
    if (value === null) {
      continue
    }
    else if (value === "medium") {
      matchedIngridientCount++
      quality += 20
    }
    else if (value === "low") {
      matchedIngridientCount++
      quality += 10
    }
    else {
      matchedIngridientCount++
      quality += 30
    }
  }
  let avgQuality = quality / matchedIngridientCount
  if (avgQuality == 30) {
    return "high"
  }
  else if (avgQuality > 20) {
    return "medium-high"
  }
  else if (avgQuality == 20) {
    return "medium"
  }
  else if (avgQuality > 10) {
    return "low-medium"
  }
  else {
    return "low" 
  }
}

function isQuantityTypeMatching(ingredient) {
  let matching = true
  ingredient.ingredient_details.options.forEach(option => {
    if (!((option.per_amount === "kilogram" && ingredient.ingredient_basics.quantity_type === "gram") 
    || (option.per_amount === "litre" && ingredient.ingredient_basics.quantity_type === "millilitre"))) {
      matching = false
    }
  });
  return matching
}

const Meals = () => {
  let [ingredientQualityMap, updateIngredientQualityMap] = useState(new Map())
  let [firstInit, updateFirstInit] = useState(true)
  let mealId = getMealId(window.location.href)
  let meal = items.meals[mealId - 1]
  let mealIdOutOfBounds = isNaN(mealId) || (!isNaN(mealId) && (items.meals.length < mealId || mealId <= 0))
  if (mealIdOutOfBounds) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This resource does not exist in the system!
      </Alert>
    )
  }
  let ingredientDetailsArray = createIngredientDetailsArray(meal)
  let totalCost = calculateTotalCost(ingredientQualityMap, ingredientDetailsArray)
  let quality = calculateTotalQuality(ingredientQualityMap)

  if (firstInit) {
    for (let i = 0; i < ingredientDetailsArray.length; i++) {
      if (ingredientDetailsArray[i].ingredient_details === null) {
        ingredientQualityMap.set(ingredientDetailsArray[i].ingredient_basics.name, null)
      }
      else {
        ingredientQualityMap.set(ingredientDetailsArray[i].ingredient_basics.name, 'medium')
      }
    }
    updateFirstInit(false)
  }

  const handleRadioButtonChange = (changedOption) => {
    let quality = changedOption.substring(changedOption.indexOf("/") + 1)
    let name = changedOption.substring(0, changedOption.indexOf("/"))

    const newMap = new Map()

    for (let [key, value] of ingredientQualityMap) {
      if (key === name) {
        newMap.set(key, quality)
      }
      else {
        newMap.set(key, value)
      }
    }
    updateIngredientQualityMap(newMap)
  }


  return (
    <>
      <div className='main-box'>
        <div className='main-box-header'>
          <div style={{width: '30%', marginLeft:'5%'}}>
            <h2>Quality: {quality}</h2>
          </div>
          <div style={{width: '50%'}}>
            <h1>{meal.name}</h1>
          </div>
          <div style={{width: '15%'}}>
            <h2>Price: {totalCost}$</h2>
          </div>
        </div>
        <hr></hr>
        {ingredientDetailsArray.map((ingredient, i) =>
            <div key={i}>
                <IngredientRow
                    handleRadioButtonChange={handleRadioButtonChange}
                    neededAmount = {ingredient.ingredient_basics.quantity + " " + ingredient.ingredient_basics.quantity_type}
                    quantityTypeMatching = {ingredient.ingredient_details === null || isQuantityTypeMatching(ingredient)}
                    isDetailsMissing = {ingredient.ingredient_details === null}
                    ingredientName = {ingredient.ingredient_basics.name} 
                    lowQualityName = {ingredient?.ingredient_details?.options[2].name}
                    mediumQualityName = {ingredient?.ingredient_details?.options[1].name}
                    highQualityName = {ingredient?.ingredient_details?.options[0].name}
                    lowQualityPrice = {"(" + ingredient?.ingredient_details?.options[2].price + "$/" + ingredient?.ingredient_details?.options[2].per_amount + ")"}
                    mediumQualityPrice = {"(" + ingredient?.ingredient_details?.options[1].price + "$/" + ingredient?.ingredient_details?.options[1].per_amount + ")"}
                    highQualityPrice = {"(" +ingredient?.ingredient_details?.options[0].price + "$/" + ingredient?.ingredient_details?.options[0].per_amount + ")"}
                />
                <hr style={{width:'80%'}}></hr>
            </div>
          )}
      </div>
    </>
  )
}

export default Meals