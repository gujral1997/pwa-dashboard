import React from "react";
import { render } from "react-dom";
import App from "./App";
import "./index.css";

render(<App />, document.getElementById("root"));

// Registering service worker

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/sw.js")
            .then((registration) => {
                console.log("SW registered: ", registration);
            })
            .catch((registrationError) => {
                console.log("SW registration failed: ", registrationError);
            });
    });
}
