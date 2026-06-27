import {
  Box,
  Paper,
  Typography,
  Chip,
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";

function ChatMessage({ message }) {
  const isUser = message.sender === "user";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        mb: 2,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 2,
          maxWidth: "75%",
          bgcolor: isUser ? "#1976d2" : "#ffffff",
          color: isUser ? "white" : "black",
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1,
          }}
        >
          {isUser ? (
            <PersonIcon fontSize="small" />
          ) : (
            <SmartToyIcon fontSize="small" />
          )}

          <Typography fontWeight="bold">
            {isUser ? "You" : "DocMind AI"}
          </Typography>
        </Box>

        <Typography
          sx={{
            whiteSpace: "pre-wrap",
          }}
        >
          {message.text}
        </Typography>

        {!isUser &&
          message.sources &&
          message.sources.length > 0 && (
            <>
              <Typography
                sx={{
                  mt: 2,
                  mb: 1,
                  fontWeight: "bold",
                }}
              >
                📚 Sources
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {message.sources.map((source, index) => (
                  <Chip
                    key={index}
                    label={`Chunk ${source}`}
                    size="small"
                  />
                ))}
              </Box>
            </>
          )}
      </Paper>
    </Box>
  );
}

export default ChatMessage;