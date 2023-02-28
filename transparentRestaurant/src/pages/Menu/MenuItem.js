import React from 'react'
import { Link } from "react-router-dom";

function MenuItem({id, name, ingredients}) {

  return (

    <div className='box'>
      <span className='mealName'>
        {name}
        </span>
        <hr/>

        <div className='mealBox'>
          <div className='mealBox-item1'>
            <b>Ingredients</b>
            <div className='ingBox'>
            {ingredients.map((ingredient, i) => (
                <div className='ingName' key={i}>{(i+1) + ') ' + ingredient.name}</div>
            ))}
            </div>
          </div>

          <div className='mealBox-item2'>
            
          </div>

          <div className='mealBox-item3'>
          <Link className='detailsLink' to={"/Meals/" + id}>Details</Link>
          </div>
        </div>
    </div>    
  )
}

export default MenuItem