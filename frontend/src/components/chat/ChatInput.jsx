import { useState } from "react";

import {
  Box,
  TextField,
  IconButton,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";

function ChatInput({ onSend }) {
  const [question, setQuestion] = useState("");

  const handleSend = () => {
    if (!question.trim()) return;

    onSend(question);
    setQuestion("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        p: 2,
        borderTop: "1px solid #ddd",
      }}
    >
      <TextField
        fullWidth
        placeholder="Ask anything about your document..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      />

      <IconButton
        color="primary"
        onClick={handleSend}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
}

export default ChatInput;