import { createTheme, TextField, ThemeProvider } from "@mui/material";
import SuperMatic from "../superMatic";
import { useState } from "react";
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
export const VideoPriceInput = ({ label, setVideoPrice, videoDuration }) => {
  const [price, setPrice] = useState(0);
  return (
    <div className="relative flex items-end">
      <div className="">
        <ThemeProvider theme={theme}>
          <TextField
            variant="standard"
            id="upload text-form title"
            label={label}
            color="primary"
            fullWidth
            multiline
            type={"number"}
            onChange={(e) => {
              setVideoPrice(e.target.value);
              setPrice(e.target.value);
            }}
            /* styles the wrapper */
            style={{
              width: "200px",
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
      </div>
      <div>
        <SuperMatic />
      </div>
      <div
        className={`font-sansationR text-xs pl-4 ${
          !videoDuration ? "hidden" : ""
        }`}
      >
        <span className="mr-4">FLOW RATE</span>
        {`${(price / videoDuration).toFixed(2)}`}
      </div>
    </div>
  );
};
export const StreamDespInput = ({ label, setStreamDesp }) => {
  return (
    <ThemeProvider theme={theme}>
      <TextField
        variant="standard"
        id="upload text-form title"
        label={label}
        color="primary"
        fullWidth
        multiline
        onChange={(e) => setStreamDesp(e.target.value)}
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
export const StreamTitleInput = ({ label, setStreamTitle }) => {
  return (
    <ThemeProvider theme={theme}>
      <TextField
        variant="standard"
        id="upload text-form title"
        label={label}
        color="primary"
        fullWidth
        multiline
        onChange={(e) => setStreamTitle(e.target.value)}
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
export const StreamPriceInput = ({ label, setStreamPrice }) => {
  return (
    <ThemeProvider theme={theme}>
      <TextField
        variant="standard"
        id="upload text-form title"
        label={label}
        color="primary"
        fullWidth
        multiline
        onChange={(e) => setStreamPrice(e.target.value)}
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
