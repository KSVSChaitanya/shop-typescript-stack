import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeApp } from "./lib/init";

initializeApp();

createRoot(document.getElementById("root")!).render(<App />);
