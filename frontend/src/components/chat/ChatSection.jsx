import { useState } from "react";
import { askQuestion } from "../services/api";

import {
  Paper,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

function ChatSection() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (question) => {
    if (!question.trim()) return;

    const userMessage = {
      sender: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const data = await askQuestion(question);

      const botMessage = {
        sender: "bot",
        text: data.answer,
        sources: data.sources || [],
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "❌ Unable to connect to the backend.",
          sources: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        height: "calc(100vh - 130px)",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid #ddd",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          💬 Conversation
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          scrollBehavior: "smooth",
          p: 3,
          bgcolor: "#fafafa",
        }}
      >
        {messages.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              mt: 12,
            }}
          >
            <Typography variant="h3">
              🤖
            </Typography>

            <Typography
              variant="h5"
              mt={2}
              fontWeight="bold"
            >
              Welcome to DocMind AI
            </Typography>

            <Typography
              color="text.secondary"
              mt={1}
            >
              Upload a PDF and start asking questions.
            </Typography>
          </Box>
        )}

        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            message={msg}
          />
        ))}

        {loading && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mt: 2,
            }}
          >
            <CircularProgress size={24} />

            <Typography>
              🤖 DocMind AI is thinking...
            </Typography>
          </Box>
        )}
      </Box>

      <ChatInput onSend={sendMessage} />
    </Paper>
  );
}

export default ChatSection;