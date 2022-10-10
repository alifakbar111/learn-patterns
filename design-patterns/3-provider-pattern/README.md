# Provider Pattern

**Rules**: We can make data available to `multiple components`. Rather than passing that data down each layer through props, we can wrap all components in a **Provider**.


In some cases, we want to make available data to many (if not all) components in an application. 
Although we can pass data to components using props, this can be difficult to do if almost all components in your application need access to the value of the props. 

`A common usecase for the provider pattern is sharing a theme UI state with many components.`

## Example:

```js
export const ThemeContext = React.createContext();

const themes = {
  light: {
    background: "#fff",
    color: "#000"
  },
  dark: {
    background: "#171717",
    color: "#fff"
  }
};

export default function App() {
  const [theme, setTheme] = useState("dark");

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  const providerValue = {
    theme: themes[theme],
    toggleTheme
  };

  return (
    <div className={`App theme-${theme}`}>
      <ThemeContext.Provider value={providerValue}>
        <Toggle />
        <List />
      </ThemeContext.Provider>
    </div>
  );
}

```
The Provider receives a value prop, which contains the data that we want to pass down. All components that are wrapped within this provider have access to the value of the value prop.

Since the `Toggle` and `List components` are both wrapped within the `ThemeContext` provider, we have access to the values theme and toggleTheme that are passed as a value to the provider.

Each component like ListItem and Toggle an get access to the data, by using the `useContext` hook.

<br>

### **Adv** 
The Provider pattern/Context API makes it possible to pass data to many components, without having to manually pass it through each component layer.

### **(Dis)adv** 
In some cases, overusing the Provider pattern can result in performance issues. All components that consume the context re-render on each state change.