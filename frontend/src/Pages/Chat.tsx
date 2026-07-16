import { useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { IoMdSend } from "react-icons/io";
import { useAuth } from "../AuthContext/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { sendChatRequest } from "../helpers/api-communicator";
import robot from "../assets/robot-removebg-preview.png";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const auth = useAuth();

  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async () => {
    const content = inputRef.current?.value.trim();

    if (!content) return;

    inputRef.current!.value = "";

    const newMessage: Message = {
      role: "user",
      content,
    };

    setChatMessages((prev) => [...prev, newMessage]);

    const chatData = await sendChatRequest(content);

    setChatMessages(chatData.chats);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        background:
          "radial-gradient(circle at top,#13203d 0%,#0B1120 45%,#050816 100%)",
      }}
    >
      {/* ================= SIDEBAR ================= */}

      <Box
        sx={{
          width: "30%",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: "1px solid rgba(255,255,255,.08)",
          background:
            "linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.02))",
          backdropFilter: "blur(18px)",
          p: 4,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            textAlign="center"
            mt={2}
            fontWeight="bold"
            color="white"
          >
            Chat-X AI
          </Typography>

          <Typography
            textAlign="center"
            mt={2}
            color="#9cb3c9"
            lineHeight={1.8}
          >
            Ask anything about coding, business, education, history,
            programming or technology.
          </Typography>
        </Box>

        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 1,
              mt:1,
              borderRadius: 3,
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(0,229,255,.15)",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "#7C4DFF",
                width: 45,
                height: 45,
              }}
            >
              {auth?.user?.name?.charAt(0)}
            </Avatar>

            <Box>
              <Typography color="white" fontWeight={700}>
                {auth?.user?.name}
              </Typography>
            </Box>
          </Box>

          <Button
            fullWidth
            startIcon={<DeleteOutlineRoundedIcon />}
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: 3,
              background: "#d32f2f",
              color: "white",
              fontWeight: 700,
              "&:hover": {
                background: "#ef5350",
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>

      {/* ================= CHAT ================= */}

      <Box
        sx={{
          width: { xs: "100%", md: "70%" },
          display: "flex",
          flexDirection: "column",
          p: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          color="white"
          textAlign="center"
          mb={3}
        >
          Chat-X AI Assistant
        </Typography>

        {/* Messages */}

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            px: 1,
            borderRadius: 4,
            background: "rgba(255,255,255,.03)",
            border: "1px solid rgba(255,255,255,.06)",
            backdropFilter: "blur(12px)",
            mb: 2,
            py: 2,
          }}
        >
          {chatMessages.length === 0 && (
            <Typography
              color="#8ca4bc"
              textAlign="center"
              mt={15}
            >
              👋 Start a conversation with Chat-X
            </Typography>
          )}

          {chatMessages.map((chat, index) => (
            <ChatItem
              key={index}
              content={chat.content}
              role={chat.role}
            />
          ))}
        </Box>

        {/* INPUT */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 1.5,
            borderRadius: 4,
            background: "rgba(255,255,255,.05)",
            border: "1px solid rgba(0,229,255,.18)",
            backdropFilter: "blur(15px)",
          }}
        >
          <input
            ref={inputRef}
            placeholder="Ask me anything..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "17px",
              padding: "12px",
            }}
          />

          <IconButton
            onClick={handleSubmit}
            sx={{
              width: 52,
              height: 52,
              background:
                "linear-gradient(135deg,#00E5FF,#7C4DFF)",
              color: "white",
              "&:hover": {
                background:
                  "linear-gradient(135deg,#00B8D4,#5E35B1)",
              },
            }}
          >
            <IoMdSend size={22} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;