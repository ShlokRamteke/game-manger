import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showHint, setShowHint] = useState(false);
  console.log(showHint);
  const history = useNavigate();
  return (
    <div
      style={{
        width: "960px",
        height: "450px",
        margin: "0 auto",
      }}
    >
      <h1>Game Library Manager</h1>
      <form
        style={{
          width: "75%",
          border: "2px solid black",
          padding: "20px 30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <h2>Please Login to view your games</h2>
        <fieldset style={{ display: "flex", flexDirection: "column" }}>
          <label>Enter GamerTag:</label>
          <input
            style={{ border: "2px solid black", marginLeft: "10px" }}
            type="text"
            placeholder="KodameRatne"
          />
        </fieldset>
        <fieldset style={{ display: "flex", flexDirection: "column" }}>
          <label onClick={() => setShowHint(!showHint)}>
            Forgot your password?
          </label>
          <input
            style={{ border: "2px solid black", marginLeft: "10px" }}
            type="password"
            placeholder="Please enter your password"
          />
        </fieldset>
        <fieldset style={{ marginTop: "15px" }}>
          <button
            style={{ border: "2px solid red", padding: "5px 8px" }}
            onClick={() => history("/games")}
          >
            Sign In
          </button>
        </fieldset>
        <fieldset>
          {showHint ? (
            <small style={{ color: "blue" }}>
              Pssst... you can just click the button to login!
            </small>
          ) : (
            <small style={{ color: "grey" }}>
              If you're stuck, try clicking me or resetting your password...
            </small>
          )}
        </fieldset>
      </form>
    </div>
  );
};

export default Home;
