from src.rag import build_rag
from src.chatbot import ask_question

print("Building RAG system...")

model, index, chunks = build_rag(
    "data/sample.pdf"
)

print("RAG system ready!")
print("Type 'exit' to quit.\n")

while True:

    question = input("You: ")

    if question.lower() == "exit":
        print("Goodbye!")
        break

    answer = ask_question(
        question,
        model,
        index,
        chunks
    )

    print("\nBot:")
    print(answer)
    print()