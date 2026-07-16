import { AppBar, Toolbar } from "@mui/material";

import Logo from "./Logo";
import { useAuth } from "../AuthContext/AuthContext";
import NavigationLinks from "./NavigationLinks";

const Header = () => {
    const auth = useAuth();
  return (
   <AppBar
  position="sticky"
  elevation={0}
  sx={{
    background: "rgba(10,15,25,.82)",
    backdropFilter: "blur(18px)",
    borderBottom: "1px solid rgba(0,229,255,.15)",
  }}
>
  <Toolbar
    sx={{
      display: "flex",
      justifyContent: "space-between",
      py: 1,
    }}
  >
    <Logo />

    <div
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "center",
      }}
    >
      {auth?.isLoggedIn ? (
        <>
          <NavigationLinks
            to="/chat"
            text="Chat"
            bg="linear-gradient(135deg,#00E5FF,#00B8D4)"
            textColor="#08131f"
          />

          <NavigationLinks
            to="/"
            text="Logout"
            bg="linear-gradient(135deg,#7C4DFF,#5E35B1)"
            textColor="white"
            onClick={auth.logout}
          />
        </>
      ) : (
        <>
          <NavigationLinks
            to="/login"
            text="Login"
            bg="transparent"
            textColor="#00E5FF"
          />

          <NavigationLinks
            to="/signup"
            text="Get Started"
            bg="linear-gradient(135deg,#00E5FF,#7C4DFF)"
            textColor="white"
          />
        </>
      )}
    </div>
  </Toolbar>
</AppBar>
  );
};

export default Header;
