import React from "react";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export function Input(props) {
  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1, width: "40ch" },
      }}
    >
      <TextField label={props.label} variant="outlined" {...props} />
    </Box>
  );
}

export function Caption(props) {
  return (
    <Box
      sx={{
        "& > :not(style)": { mb: 2 },
      }}
    >
      <TextField
        variant="standard"
        margin="dense"
        label={props.label}
        autoFocus
        fullWidth
        {...props}
      />
    </Box>
  );
}

export function Password(props) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl
      sx={{
        "& > :not(style)": { m: 1, width: "39ch" },
      }}
    >
      <InputLabel htmlFor={props.label}>{props.label}</InputLabel>
      <OutlinedInput
        label={props.label}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        {...props}
      />
    </FormControl>
  );
}
