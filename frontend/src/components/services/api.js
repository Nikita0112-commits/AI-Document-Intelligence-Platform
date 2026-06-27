import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const uploadPDF = async (formData) => {
  const response = await api.post("/upload", formData);
  return response.data;
};

export const askQuestion = async (question) => {
  const response = await api.post("/chat", {
    question,
  });

  return response.data;
};

export default api;