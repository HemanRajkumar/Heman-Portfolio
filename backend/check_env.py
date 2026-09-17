from dotenv import load_dotenv
import os
load_dotenv()
v = os.getenv("GEMINI_API_KEY")
print("FOUND:", bool(v) and v != "your_gemini_api_key_here")
print("LENGTH:", len(v) if v else 0)