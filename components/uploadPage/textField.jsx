import { createTheme, TextField, ThemeProvider } from "@mui/material";
import Context from "../../context";
import { useContext } from "react";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0effff",
    },
  },
});

export const VideoTitleInput = ({ label }) => {
  const context = useContext(Context);
  return (
    <ThemeProvider theme={theme}>
      <TextField
        variant="standard"
        id="upload text-form title"
        label={label}
        color="primary"
        fullWidth
        multiline
        onChange={(e) => context.setVideoTitle(e.target.value)}
        type={"number"}
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
export const VideoDescriptionInput = ({ label }) => {
  const context = useContext(Context);
  return (
    <ThemeProvider theme={theme}>
      <TextField
        variant="standard"
        id="upload text-form title"
        label={label}
        color="primary"
        fullWidth
        multiline
        onChange={(e) => context.setVideoTitle(e.target.value)}
        type={"number"}
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
export const VideoPriceInput = ({ label }) => {
  const context = useContext(Context);
  return (
    <ThemeProvider theme={theme}>
      <TextField
        variant="standard"
        id="upload text-form title"
        label={label}
        color="primary"
        fullWidth
        multiline
        onChange={(e) => context.setVideoTitle(e.target.value)}
        type={"number"}
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
