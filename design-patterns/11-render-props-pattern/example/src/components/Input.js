import { useState } from "react";
import { TextField } from "@material-ui/core";

export default function CustomInput(props) {
  const [value, setValue] = useState("");
  return (
    <>
      <TextField
        type="number"
        variant="filled"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Temp in °C"
      />
      {props.children(value)}
    </>
  );
}
