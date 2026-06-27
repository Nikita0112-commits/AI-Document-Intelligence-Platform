import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import ChatSection from "./components/chat/ChatSection";

import { Box, Toolbar } from "@mui/material";

function App() {
  return (
    <>
      <Header />

      <Box sx={{ display: "flex" }}>
        <Sidebar />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 4,
            bgcolor: "#f5f5f5",
            minHeight: "100vh",
          }}
        >
          <Toolbar />

          <ChatSection />
        </Box>
      </Box>
    </>
  );
}

export default App;