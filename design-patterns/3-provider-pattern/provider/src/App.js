import { createContext, useState } from "react";
import Toggle from "./Toggle";
import List from "./List";
import './App.css'

export const themes = {
  light: {
    background: "#fff",
    color: "#000",
  },
  dark: {
    background: "#171717",
    color: "#fff",
  },
};

export const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState("dark");

  function toggleTheme() {
    setTheme(theme === "ligth" ? "dark" : "ligth");
  }
  return (
    <div className={`App theme-${theme}`}>
      <ThemeContext.Provider value={{ theme: themes[theme], toggleTheme }}>
        <>
          <Toggle />
          <List />
        </>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
