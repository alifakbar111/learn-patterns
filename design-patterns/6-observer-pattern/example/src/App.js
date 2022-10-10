import { Button, Switch, FormControlLabel } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";

import "./App.css";
import Observable from "./Observable";

function App() {
  function handleClick() {
    Observable.notify("User clicked button");
  }
  function toastify(data) {
    toast(data, {
      position: toast.POSITION.BOTTOM_RIGHT,
      closeButton: false,
      autoClose: 2000,
    });
  }
  function logger(data) {
    console.log(`${Date.now()} ${data}`);
  }
  function handleToggle() {
    Observable.notify("User toggled switch!");
  }
  Observable.subscribe(logger);
  Observable.subscribe(toastify);

  return (
    <div className="App">
      <Button variant="contained" onClick={handleClick}>
        Click Me !
      </Button>
      <FormControlLabel
        control={<Switch name="" onChange={handleToggle} />}
        label="Toggle me!"
      />
      <ToastContainer />
    </div>
  );
}

export default App;
