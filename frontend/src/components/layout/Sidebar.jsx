import {
  Drawer,
  Toolbar,
  Typography,
  Divider,
  Box,
} from "@mui/material";

import UploadSection from "../upload/UploadSection";

const drawerWidth = 280;

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      <Box sx={{ p: 3 }}>

        <Typography
          variant="h6"
          fontWeight="bold"
        >
          📄 Documents
        </Typography>

        <Divider sx={{ my: 2 }} />

        <UploadSection />

      </Box>
    </Drawer>
  );
}

export default Sidebar;