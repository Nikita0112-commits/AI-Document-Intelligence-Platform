# AI Document Intelligence Platform

An AI-powered Retrieval-Augmented Generation (RAG) application that allows users to upload PDF documents and ask natural language questions about their contents.

## Features

- Upload any PDF document
- Extract text using PyPDF
- Intelligent text chunking with LangChain
- Semantic embeddings using Sentence Transformers
- Vector search with FAISS
- Context-aware responses using Google Gemini
- FastAPI REST backend
- React frontend for document upload and Q&A
- Source chunk previews with each response

## Tech Stack

### Backend
- Python
- FastAPI
- FAISS
- Sentence Transformers
- LangChain
- PyPDF
- Google Gemini API

### Frontend
- React
- Vite
- Axios

## Project Architecture

```
PDF Upload
     │
     ▼
Text Extraction
     │
     ▼
Chunking
     │
     ▼
Sentence Embeddings
     │
     ▼
FAISS Vector Database
     │
     ▼
Relevant Context Retrieval
     │
     ▼
Gemini LLM
     │
     ▼
Answer + Source References
```

## Current Status

🚧 This project is under active development.

Completed:
- PDF upload
- RAG pipeline
- Semantic search
- FastAPI backend
- React frontend
- Gemini integration
- Source references

Upcoming Features:
- Chat history
- Better UI/UX
- Multiple document support
- Authentication
- Docker deployment
- Cloud deployment

## Installation

### Backend

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn src.api:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Author

**Nikita Das**