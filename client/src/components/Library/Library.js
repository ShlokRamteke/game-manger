import React, { useEffect, useState } from "react";
import { getAllGames } from "../../api";
import Game from "./Game/Game";

const Library = () => {
  const [games, setGames] = useState([]);
  const handleGames = async () => {
    const { data } = await getAllGames();
    await setGames(data);
  };

  useEffect(() => {
    handleGames();
  }, []);
  return (
    <div>
      <header>
        <h2> My game library</h2>
      </header>
      <section
        styles={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {games && games.map((game, index) => <Game key={index} game={game} />)}
      </section>
    </div>
  );
};

export default Library;
