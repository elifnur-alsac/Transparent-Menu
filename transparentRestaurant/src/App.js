import React, {useState} from "react";
import {Routes, Route} from 'react-router-dom'
import Welcome from "./pages/Welcome/Welcome";
import Menu from "./pages/Menu/Menu";


import Meals from "./pages/Meals/Meals";
function App() {

  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/Menu" element={<Menu/>}/>
        <Route path="/Meals/:id" element={<Meals/>}/>
        
      </Routes>

    </div>
  );
}

export default App;
