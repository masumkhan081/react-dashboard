import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "jotai";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      {/* Jotai for global state */}
      <BrowserRouter>
        
        {/* React Router for navigation */}
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
