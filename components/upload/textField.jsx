import { createTheme, TextField, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0effff",
    },
  },
});

const TextF = ({ label }) => {
  return (
    <ThemeProvider theme={theme}>
      <TextField
        variant="standard"
        id="upload text-form title"
        label={label}
        color="primary"
        fullWidth
        multiline
        /* styles the wrapper */
        style={{
          width: "400px",
          //   margin: "40px",
        }} /* styles the label component */
        InputLabelProps={{
          style: {
            fontSize: "16px",
          },
        }}
        /* styles the input component */
        inputProps={{
          style: {
            fontSize: "20px",
          },
        }}
      />
    </ThemeProvider>
  );
};
export default TextF;
