import React from "react";

const Main = (props) => {
  return (
    <>
      <h1>Main component</h1>

      <div>
        <p>Hello, {props.name}<br />
        Do you want to see the secret area?<a href="/secret">Click here</a>
        </p>
        <div>
          <hr/>
          Please login first
          <hr/>
          <button onClick={props.auth.login}>Login</button>
        </div>
      </div>
    </>
  );
};

export default Main;
