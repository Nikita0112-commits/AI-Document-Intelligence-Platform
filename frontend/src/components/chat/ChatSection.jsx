import { useState } from "react";
import { askQuestion } from "../services/api";

import {
  Paper,
  Typography,
  Box,
} from "@mui/material";

import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

function ChatSection() {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (question) => {
    if (!question.trim()) return;

    const userMessage = {
      sender: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const data = await askQuestion(question);

      const botMessage = {
        sender: "bot",
        text: data.answer,
        sources: data.sources,
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        height: "80vh",
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
        <Typography variant="h5">
          💬 Conversation
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 3,
        }}
      >
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            message={msg}
          />
        ))}
      </Box>

      <ChatInput
        onSend={sendMessage}
      />
    </Paper>
  );
}

export default ChatSection;