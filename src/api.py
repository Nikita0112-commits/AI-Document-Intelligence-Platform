from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
import shutil
import os

from src.rag import build_rag
from src.chatbot import ask_question

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("uploads", exist_ok=True)

print("Loading RAG System...")

model, index, chunks, metadata = build_rag("data/sample.pdf")

print("RAG System Ready!")


class QuestionRequest(BaseModel):
    question: str


@app.get("/")
def home():
    return {
        "message": "RAG Chatbot API Running"
    }


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    global model, index, chunks, metadata

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    print(f"\nBuilding index for {file.filename}...")

    model, index, chunks, metadata = build_rag(file_path)

    print("New document indexed successfully!")

    return {
        "message": "File uploaded and indexed successfully.",
        "filename": file.filename,
        "total_chunks": len(chunks)
    }


@app.post("/chat")
def chat(request: QuestionRequest):

    result = ask_question(
        request.question,
        model,
        index,
        chunks,
        metadata
    )

    return {
        "question": request.question,
        "answer": result["answer"],
        "sources": result["sources"]
    }