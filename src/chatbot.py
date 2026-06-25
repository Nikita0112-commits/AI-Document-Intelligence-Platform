from src.config import gemini_model
from src.rag import retrieve_context


def ask_question(question, model, index, chunks):
    """
    Retrieves relevant context from FAISS and asks Gemini to answer.
    """

    context , sources  = retrieve_context(
        question,
        model,
        index,
        chunks
    )

    prompt = f"""
You are an expert AI Research Assistant.

You MUST answer ONLY from the context below.

If the answer exists anywhere in the context,
answer it naturally.

Never say:
- "The context states..."
- "The provided context..."
- "According to the context..."

Only say
"The uploaded document does not contain enough information."
if the answer truly does not exist.

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
        return f"Gemini API Error: {str(e)}"