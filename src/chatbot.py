from src.config import gemini_model
from src.rag import retrieve_context


def ask_question(question, model, index, chunks, metadata):
    """
    Retrieves relevant context from FAISS and asks Gemini to answer.
    """

    context, sources = retrieve_context(
        question,
        model,
        index,
        chunks,
        metadata
    )

    prompt = f"""
You are an expert AI Research Assistant.

Answer ONLY using the provided context.

If the answer is not available in the context, reply exactly:

"The uploaded document does not contain enough information."

Do NOT mention:
- "According to the context..."
- "The provided context..."
- "The document states..."

Just answer naturally.

Context:
{context}

Question:
{question}

Answer:
"""

    try:
        response = gemini_model.generate_content(prompt)

        return {
            "answer": response.text,
            "sources": sources
        }

    except Exception as e:
        return {
            "answer": f"Gemini API Error: {str(e)}",
            "sources": []
        }