import React, { useState } from 'react'
import './Menu.css'
import MenuItem from './MenuItem'
import items from '../../data.json'
import FilterGroups from './FilterGroups';
import createIngredientDetailsArray from '../../utils/DataUtil'
import SortButton from './SortButton'
import ErrorBoundary from '../../ErrorBoundary';



const Menu = () => {
  let [originalMenu, updateOriginalMenu] = useState(items.meals)
  let [filterTextValue, updateFilterText] =useState('all');
  let [sortOption, updateSortOption] =useState('ascending');

  let newMenu = originalMenu.filter((meal) => {
    let ingArray = createIngredientDetailsArray(meal);
    let breakEntered = false;
    for(let i = 0; i<ingArray.length; i++) {
      let ingObject = ingArray[i];
      if (ingObject.ingredient_details === null) {
        continue;
      }
      if(filterTextValue === 'vegan'){

        if(!ingObject.ingredient_details.groups.includes("vegan")){
          breakEntered = true;
          break;
        }
        
      }else if(filterTextValue === 'vegetarian'){
        if(!ingObject.ingredient_details.groups.includes("vegetarian")){
          breakEntered = true;
          break;
        }
      }else{
        return meal;
      }
    }
    if(!breakEntered){
      return meal;
    }

  })

  if (sortOption === 'ascending') {
    newMenu = newMenu.sort(
      (item1, item2) => item1.name.localeCompare(item2.name)
    )
  }
  else {
    newMenu = newMenu.sort(
      (item1, item2) => (item1.name.localeCompare(item2.name)*-1)
    )
  }

  
  function onFilterValueSelected(filterValue){
    updateFilterText(filterValue);
  }
  function sortButtonClicked() {
    if (sortOption === 'ascending') {
      updateSortOption('descending')
    }
    else {
      updateSortOption('ascending')
    }
  }

  return (
    <div>
      
      <h1 className='menuHeader'>Our Menu</h1>
      <div id="root"></div>
      <div className='header-box'>
        <div>
          <SortButton sortButtonClicked={sortButtonClicked} sortOption={sortOption}></SortButton>
        </div>
        <div>
          <FilterGroups filterValueSelected={onFilterValueSelected}></FilterGroups>
        </div>
      </div>
      {newMenu.map(meal => 
        (
          <div key={meal.id}>
            <ErrorBoundary errorMsg="An error occured while generating the menu item.">
              <MenuItem id={meal.id} name = {meal.name} ingredients = {meal.ingredients}/>
            </ErrorBoundary>
          </div>
        )
      )}
    </div>
  )
}

export default Menu