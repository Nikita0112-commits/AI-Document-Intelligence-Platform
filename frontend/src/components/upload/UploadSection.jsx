import { useState } from "react";
import { uploadPDF } from "../services/api";

import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Alert,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function UploadSection() {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadPDF(formData);
      setUploaded(true);
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    }
  };

  return (
    <Card elevation={2}>
      <CardContent>

        <Typography
          variant="h6"
          gutterBottom
          fontWeight="bold"
        >
          📄 Upload Document
        </Typography>

        <Box mt={2}>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setUploaded(false);
            }}
          />
        </Box>

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
          <Alert
            icon={<DescriptionIcon />}
            severity="info"
            sx={{ mt: 2 }}
          >
            {file.name}
          </Alert>
        )}

        {uploaded && (
          <Alert
            icon={<CheckCircleIcon />}
            severity="success"
            sx={{ mt: 2 }}
          >
            Document indexed successfully.
          </Alert>
        )}

      </CardContent>
    </Card>
  );
}

export default UploadSection;