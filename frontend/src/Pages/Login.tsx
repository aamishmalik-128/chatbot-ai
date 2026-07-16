import { Box, Typography, TextField, Button, Avatar } from "@mui/material";
import { useAuth } from "../AuthContext/AuthContext";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import robot from "../assets/robot-removebg-preview.png";
import { Link } from "react-router-dom";
import {toast} from 'react-hot-toast'
const Login = () => {
  const auth = useAuth();
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try{
      toast.loading("Signing In",{id:"login"})
      await auth?.login(email,password)
      toast.success("Signed In Successfully",{id:"login"})
      
    }catch(error){
      console.log(error)
      toast.error("Signed in Fail",{id:"login"})
    }
    console.log(email,password)
  };

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        boxSizing: "border-box",
        background:
          "radial-gradient(circle at top,#13203d 0%,#0B1120 40%,#050816 100%)",
      }}
    >
      {/* Left Side */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={robot}
          alt="Robot"
          width="420"
          style={{
            filter: "drop-shadow(0px 0px 30px rgba(0,229,255,.45))",
          }}
        />
      </Box>

      {/* Right Side */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* This IS the form — no nested <form> inside it */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: 420,
            flexShrink: 0,
            p: 5,
            borderRadius: "24px",
            backdropFilter: "blur(18px)",
            background: "rgba(255,255,255,.05)",
            border: "1px solid rgba(0,229,255,.18)",
            boxShadow: "0px 0px 40px rgba(0,229,255,.18)",
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
            <Avatar
              sx={{
                bgcolor: "#00E5FF",
                width: 70,
                height: 70,
                boxShadow: "0px 0px 25px rgba(0,229,255,.5)",
              }}
            >
              <SmartToyRoundedIcon sx={{ fontSize: 40 }} />
            </Avatar>

            <Typography
              variant="h4"
              mt={2}
              fontWeight="bold"
              sx={{ color: "#fff", letterSpacing: 1 }}
            >
              Welcome Back
            </Typography>

            <Typography sx={{ color: "#A7B5C9", mt: 1 }}>
              Login to continue chatting with AI
            </Typography>
          </Box>

          <TextField
            fullWidth
            name="email"
            label="Email"
            margin="normal"
            variant="outlined"
            InputLabelProps={{ style: { color: "#7fb7ff" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#fff",
                borderRadius: "14px",
                "& fieldset": { borderColor: "#2c4b66" },
                "&:hover fieldset": { borderColor: "#00E5FF" },
                "&.Mui-focused fieldset": {
                  borderColor: "#00E5FF",
                  boxShadow: "0 0 15px rgba(0,229,255,.5)",
                },
              },
            }}
          />

          <TextField
            fullWidth
            type="password"
            name="password"
            label="Password"
            margin="normal"
            variant="outlined"
            InputLabelProps={{ style: { color: "#7fb7ff" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#fff",
                borderRadius: "14px",
                "& fieldset": { borderColor: "#2c4b66" },
                "&:hover fieldset": { borderColor: "#00E5FF" },
                "&.Mui-focused fieldset": {
                  borderColor: "#00E5FF",
                  boxShadow: "0 0 15px rgba(0,229,255,.5)",
                },
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 4,
              py: 1.5,
              borderRadius: "14px",
              fontWeight: "bold",
              background: "linear-gradient(135deg,#00E5FF,#7C4DFF)",
              color: "#fff",
              fontSize: "16px",
              "&:hover": {
                background: "linear-gradient(135deg,#00B8D4,#5E35B1)",
                boxShadow: "0px 0px 25px rgba(0,229,255,.5)",
              },
            }}
          >
            LOGIN
          </Button>

          <Typography textAlign="center" mt={3} color="#A7B5C9">
            Don't have an account?{" "}
            <span
              style={{ color: "#00E5FF", cursor: "pointer", fontWeight: 600 }}
            >
              <Link
                to={"/signup"}
                style={{
                  color: "#00E5FF",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                {" "}
                Sign Up{" "}
              </Link>
            </span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;