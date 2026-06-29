import { Box, Toolbar } from "@mui/material";

import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import ChatSection from "./components/chat/ChatSection";

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <Header />

      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f4f6f8",
          p: 4,
        }}
      >
        <Toolbar />

        <ChatSection />
      </Box>
    </Box>
  );
}

export default App;