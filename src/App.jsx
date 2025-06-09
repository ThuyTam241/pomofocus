import { useState } from "react";
import "./App.css";
import { Time } from "./components/Time";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ButtonSx = {
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  boxShadow: "none",
  fontSize: "13px",
  fontWeight: 400,
  textTransform: "capitalize",
  padding: "8px 12px",
  lineHeight: 1,
  height: "auto",
  "&:hover": {
    boxShadow: "none",
  },
  "& .MuiButton-startIcon": {
    marginRight: 0.5,
  },
};

function App() {
  const [color, setColor] = useState("#ba4949");

  return (
    <Box
      sx={{
        backgroundColor: color,
        height: "100%",
        paddingBottom: "54px",
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      <AppBar
        position="static"
        sx={{
          maxWidth: "620px",
          margin: "auto",
          marginBottom: 5,
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "space-between",
          justifyItems: "center",
          boxShadow: "none",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <CheckCircleIcon
              sx={{ color: "white", width: "20px", height: "20px" }}
            />
            <Typography
              variant="h6"
              sx={{ fontSize: "20px", fontWeight: "bold", color: "white" }}
            >
              Pomofocus
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button
              variant="contained"
              startIcon={
                <AssessmentIcon sx={{ width: "18px", height: "18px" }} />
              }
              sx={ButtonSx}
            >
              Report
            </Button>
            <Button
              variant="contained"
              startIcon={
                <SettingsIcon sx={{ width: "18px", height: "18px" }} />
              }
              sx={ButtonSx}
            >
              Setting
            </Button>
            <Button
              variant="contained"
              startIcon={
                <AccountCircleIcon sx={{ width: "18px", height: "18px" }} />
              }
              sx={ButtonSx}
            >
              Sign In
            </Button>
            <IconButton
              aria-label="more-vert"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: 1,
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Time color={color} setColor={setColor} />
    </Box>
  );
}

export default App;
