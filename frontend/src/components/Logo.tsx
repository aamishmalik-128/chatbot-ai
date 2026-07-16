import React from "react";
import { Link } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const Logo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mr: "auto",
      }}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          textDecoration: "none",
        }}
      >
        <Box
          sx={{
            width: 46,
            height: 46,
            borderRadius: "14px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background:
              "linear-gradient(135deg,#00E5FF 0%,#7C4DFF 100%)",
            boxShadow:
              "0px 0px 12px rgba(0,229,255,.5), 0px 0px 25px rgba(124,77,255,.35)",
            transition: ".3s",
            "&:hover": {
              transform: "scale(1.08) rotate(8deg)",
              boxShadow:
                "0px 0px 20px rgba(0,229,255,.8),0px 0px 35px rgba(124,77,255,.6)",
            },
          }}
        >
          <AutoAwesomeIcon
            sx={{
              color: "#fff",
              fontSize: 28,
            }}
          />
        </Box>

        <Typography
          variant="h5"
          sx={{
            display: { xs: "none", sm: "block" },
            fontWeight: 700,
            letterSpacing: "2px",
            color: "#ffffff",
            textShadow: "0 0 12px rgba(0,229,255,.7)",
          }}
        >
          Chat
          <Box
            component="span"
            sx={{
              ml: 0.5,
              color: "#00E5FF",
            }}
          >
            X
          </Box>
        </Typography>
      </Link>
    </Box>
  );
};

export default Logo;