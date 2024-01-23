import React, {useEffect, useState} from "react";
import { getAllGames } from "./api/index.js";
import Library from "./components/Library.js";


function App() {
  const [games,setGames]=useState([]);
  useEffect(()=>{
    setGames(getAllGames());
    console.log(games)
  },[]);
  
  
  return (
    <main>
      <header>Toolbar</header>
      <Library />
    </main>
  );
}

export default App;
