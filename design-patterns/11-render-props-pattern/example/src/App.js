import Input from "./components/Input";
import "./App.css";

function Kelvin({ value = 0 }) {
  const calc = Number(value) + 273.15;
  return <div className="temp">{calc}K</div>;
}

function Fahrenheit({ value = 0 }) {
  const calc = (value * 9) / 5 + 32;
  return <div className="temp">{calc}°F</div>;
}

function App() {
  return (
    <div className="App">
      <div className="App">
        <h1>☃️ Temperature Converter 🌞</h1>
        <Input>
          {(value) => (
            <>
              <Kelvin value={value} />
              <Fahrenheit value={value} />
            </>
          )}
        </Input>
      </div>
    </div>
  );
}

export default App;
