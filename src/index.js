// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import "./style.css";

// ReactDOM.render(<App />, document.getElementById("root"));

//경고 메세지가 계속 떠서 수정했습니다. 그런데 혹시 몰라서 기존에 사용했던 index.js는 주석처리 해놨습니다.
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import { ThemeProvider } from "./ThemeProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
