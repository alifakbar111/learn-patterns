import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function Count({ count, increment, decrement }) {
  return (
    <Stack direction="column">
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={increment}>
          +
        </Button>
        <Button variant="contained" onClick={decrement}>
          -
        </Button>
      </Stack>
      <p>Current count: {count}</p>
    </Stack>
  );
}

export default Count;
