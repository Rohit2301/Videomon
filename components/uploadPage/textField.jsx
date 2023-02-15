import { createTheme, TextField, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0effff",
    },
  },
});

export const VideoTitleInput = ({ label, setVideoTitle }) => {
  return (
    <ThemeProvider theme={theme}>
      <TextField
        variant="standard"
        id="upload text-form title"
        label={label}
        color="primary"
        fullWidth
        multiline
        onChange={(e) => setVideoTitle(e.target.value)}
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
export const VideoDescriptionInput = ({ label, setVideoDescription }) => {
  return (
    <ThemeProvider theme={theme}>
      <TextField
        variant="standard"
        id="upload text-form title"
        label={label}
        color="primary"
        fullWidth
        multiline
        onChange={(e) => setVideoDescription(e.target.value)}
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
export const VideoPriceInput = ({ label, setVideoPrice }) => {
  return (
    <ThemeProvider theme={theme}>
      <TextField
        variant="standard"
        id="upload text-form title"
        label={label}
        color="primary"
        fullWidth
        multiline
        onChange={(e) => setVideoPrice(e.target.value)}
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
