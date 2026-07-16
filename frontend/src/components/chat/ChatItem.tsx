import { Avatar, Box, Typography } from "@mui/material";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import { useAuth } from "../../AuthContext/AuthContext";

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const auth = useAuth();
  const isAssistant = role === "assistant";

  const initials = auth?.user?.name
    ? auth.user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <Box
      sx={{
        display: "flex",
        gap: { xs: 1.2, sm: 1.5 },
        justifyContent: isAssistant ? "flex-start" : "flex-end",
        px: { xs: 1, sm: 2 },
        py: 0.75,
      }}
    >
      {isAssistant && (
        <Avatar
          sx={{
            width: { xs: 28, sm: 32 },
            height: { xs: 28, sm: 32 },
            flexShrink: 0,
            bgcolor: "#00E5FF",
            boxShadow: "0px 0px 12px rgba(0,229,255,.5)",
          }}
        >
          <SmartToyRoundedIcon sx={{ fontSize: { xs: 15, sm: 17 } }} />
        </Avatar>
      )}

      <Box
        sx={{
          maxWidth: { xs: "82%", sm: "75%", md: "68%" },
          px: { xs: 1.8, sm: 2.2 },
          py: { xs: 1.1, sm: 1.4 },
          borderRadius: isAssistant
            ? "16px 16px 16px 4px"
            : "16px 16px 4px 16px",
          background: isAssistant
            ? "rgba(255,255,255,.045)"
            : "linear-gradient(135deg, rgba(0,229,255,.22), rgba(124,77,255,.22))",
          border: isAssistant
            ? "1px solid rgba(255,255,255,.08)"
            : "1px solid rgba(0,229,255,.3)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontSize: { xs: 13.5, sm: 14.5 },
            lineHeight: 1.55,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {content}
        </Typography>
      </Box>

      {!isAssistant && (
        <Avatar
          sx={{
            width: { xs: 28, sm: 32 },
            height: { xs: 28, sm: 32 },
            flexShrink: 0,
            bgcolor: "#7C4DFF",
            fontSize: { xs: 11.5, sm: 13 },
            fontWeight: 600,
            boxShadow: "0px 0px 12px rgba(124,77,255,.45)",
          }}
        >
          {initials}
        </Avatar>
      )}
    </Box>
  );
};

export default ChatItem;