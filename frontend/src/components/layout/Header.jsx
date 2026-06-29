import {
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";

function Header() {
  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <SmartToyIcon fontSize="large" />

          <Typography
            variant="h5"
            fontWeight="bold"
          >
            DocMind AI
          </Typography>
        </Box>

        <Typography>
          AI Document Intelligence Platform
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;