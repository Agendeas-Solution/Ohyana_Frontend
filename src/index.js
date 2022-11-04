import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.scss";

import reportWebVitals from "./reportWebVitals";
import { Provider as ActivePageProvider } from "./context/pageContext";
import { Provider as AuthProvider } from "./context/authContext/authContext";

ReactDOM.render(
  <AuthProvider>
    <ActivePageProvider>
      <App />
    </ActivePageProvider>
  </AuthProvider>,
  document.getElementById("root")
);

reportWebVitals();
