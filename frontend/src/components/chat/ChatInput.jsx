import { useState } from "react";

import {
  Box,
  TextField,
  IconButton,
  Paper,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";

function ChatInput({ onSend }) {
  const [question, setQuestion] = useState("");

  const send = () => {
    if (!question.trim()) return;

    onSend(question);
    setQuestion("");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        display: "flex",
        gap: 2,
      }}
    >
      <TextField
        fullWidth
        placeholder="Ask anything about your document..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") send();
        }}
      />

      <IconButton
        color="primary"
        onClick={send}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
}

export default ChatInput;