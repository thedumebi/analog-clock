import React, { useEffect, useState } from "react";
import Clock from "./components/Clock";
import "./App.css";

const App: React.FC = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const HTML: HTMLElement = document.querySelector("html")!;
    HTML.setAttribute("data-theme", theme);

    return () => {
      HTML.setAttribute("data-theme", theme);
    };
  }, [theme]);

  return (
    <div className="app_container">
      <Clock />

      {theme === "light" ? (
        <div className="theme">
          <span onClick={() => setTheme("dark")}>Dark</span>
        </div>
      ) : (
        <div className="theme">
          <span onClick={() => setTheme("light")}>Light</span>
        </div>
      )}

      <span>Made by DMB</span>
    </div>
  );
};

export default App;
