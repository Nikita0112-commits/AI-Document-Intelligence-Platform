import { useState } from "react";
import { uploadPDF } from "../services/api";

import {
  Button,
  Typography,
  Box,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function UploadSection() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const data = await uploadPDF(formData);
      alert(data.message);
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    }
  };

  return (
    <Box>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <Button
        fullWidth
        sx={{ mt: 2 }}
        variant="contained"
        startIcon={<CloudUploadIcon />}
        onClick={handleUpload}
      >
        Upload PDF
      </Button>

      {file && (
        <Typography mt={2} variant="body2">
          📄 {file.name}
        </Typography>
      )}

    </Box>
  );
}

export default UploadSection;