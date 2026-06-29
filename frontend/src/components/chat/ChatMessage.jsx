import {
  Box,
  Paper,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function ChatMessage({ message }) {
  const isUser = message.sender === "user";

  const copyText = () => {
    navigator.clipboard.writeText(message.text);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        mb: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isUser ? "row-reverse" : "row",
          gap: 2,
          alignItems: "flex-start",
          maxWidth: "85%",
        }}
      >
        <Avatar
          sx={{
            bgcolor: isUser ? "#1976d2" : "#4CAF50",
          }}
        >
          {isUser ? <PersonIcon /> : <SmartToyIcon />}
        </Avatar>

        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: isUser ? "#1976d2" : "white",
            color: isUser ? "white" : "black",
            minWidth: 250,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography fontWeight="bold">
              {isUser ? "You" : "DocMind AI"}
            </Typography>

            {!isUser && (
              <IconButton
                size="small"
                onClick={copyText}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            )}
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

                {message.sources.map((source, index) => (
                  <Paper
                    key={index}
                    elevation={1}
                    sx={{
                      p: 1.5,
                      mt: 1,
                      bgcolor: "#f8f9fa",
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                    >
                      📄 Page {source.page} • Chunk {source.chunk}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: "block",
                        mt: 0.5,
                      }}
                    >
                      {source.preview}
                    </Typography>
                  </Paper>
                ))}
              </>
            )}
        </Paper>
      </Box>
    </Box>
  );
}

export default ChatMessage;