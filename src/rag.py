from pypdf import PdfReader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np


def build_rag(pdf_path):
    """
    Reads the PDF, creates chunks with page metadata,
    generates embeddings and stores them in FAISS.
    """

    reader = PdfReader(pdf_path)

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100
    )

    chunks = []
    metadata = []

    # Read page by page
    for page_number, page in enumerate(reader.pages):

        text = page.extract_text()

        if not text:
            continue

        page_chunks = splitter.split_text(text)

        for chunk in page_chunks:

            chunks.append(chunk)

            metadata.append({
                "page": page_number + 1
            })

    print("\nTOTAL CHUNKS:", len(chunks))

    # Load embedding model
    model = SentenceTransformer(
        "all-MiniLM-L6-v2"
    )

    embeddings = model.encode(chunks)

    dimension = embeddings.shape[1]

    index = faiss.IndexFlatL2(dimension)

    index.add(np.array(embeddings))

    return model, index, chunks, metadata


def retrieve_context(question, model, index, chunks, metadata):
    """
    Retrieves the most relevant chunks for the user's question.
    """

    query_embedding = model.encode([question])

    distances, indices = index.search(
        np.array(query_embedding),
        5
    )

    context = ""

    retrieved_chunks = []

    print("\n================ RETRIEVED CHUNKS ================\n")

    for rank, idx in enumerate(indices[0], start=1):

        print(f"\nChunk Rank {rank}")
        print("-" * 80)
        print(chunks[idx][:500])
        print("-" * 80)

        context += chunks[idx]
        context += "\n\n"

        retrieved_chunks.append({
            "chunk": int(idx),
            "page": metadata[idx]["page"],
            "preview": chunks[idx][:200]
        })

    return context, retrieved_chunks