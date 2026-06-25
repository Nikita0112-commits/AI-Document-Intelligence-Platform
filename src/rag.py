from pypdf import PdfReader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np


def build_rag(pdf_path):
    """
    Reads the PDF, splits it into chunks,
    generates embeddings, and stores them in FAISS.
    """

    # Read PDF
    reader = PdfReader(pdf_path)

    text = ""

    for page in reader.pages:
        extracted_text = page.extract_text()
        if extracted_text:
            text += extracted_text

    # Split into chunks
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100
    )

    chunks = splitter.split_text(text)

    print("\nFIRST CHUNK:\n")
    print(chunks[0][:1000])

    print("\nTOTAL CHUNKS:", len(chunks))

    # Load embedding model
    model = SentenceTransformer(
        "all-MiniLM-L6-v2"
    )

    # Create embeddings
    embeddings = model.encode(chunks)

    # Create FAISS index
    dimension = embeddings.shape[1]

    index = faiss.IndexFlatL2(dimension)

    index.add(np.array(embeddings))

    return model, index, chunks


def retrieve_context(question, model, index, chunks):
    """
    Retrieves the most relevant chunks for the user's question.
    """

    # Convert question into embedding
    query_embedding = model.encode([question])

    # Search top 5 similar chunks
    distances, indices = index.search(
        np.array(query_embedding),
        5
    )

    context = ""

    retrieved_chunks = []

    print("\n================ RETRIEVED CHUNKS ================\n")

    for i, idx in enumerate(indices[0], start=1):

        print(f"\nChunk {i}\n")
        print("-" * 80)
        print(chunks[idx][:500])
        print("-" * 80)

        context += chunks[idx]
        context += "\n\n"

        retrieved_chunks.append({
        "chunk": int(idx),
        "preview": chunks[idx][:200]
   })

    return context, retrieved_chunks