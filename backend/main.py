import os
import requests
import uvicorn
from fastapi import FastAPI, Depends, HTTPException, status, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Optional
from jose import jwt, JWTError
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="React-FastAPI SSO Integration API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# SSO Configuration
CLIENT_ID = os.getenv("SSO_CLIENT_ID")
CLIENT_SECRET = os.getenv("SSO_CLIENT_SECRET")
SSO_BACKEND_URL = os.getenv("SSO_BACKEND_URL", "https://api.wytnet.com")
REDIRECT_URI = os.getenv("SSO_REDIRECT_URI", "http://localhost:5173/callback")

class User(BaseModel):
    username: str
    email: str

class LoginRequest(BaseModel):
    username: str
    password: str

class SSOExchangeRequest(BaseModel):
    code: str
    code_verifier: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the SSO-integrated API"}

@app.post("/auth/sso-callback")
def sso_callback(request: SSOExchangeRequest):
    """
    Exchange the authorization code for tokens using the backend (confidential client).
    """
    token_url = f"{SSO_BACKEND_URL}/oauth/token"
    payload = {
        "grant_type": "authorization_code",
        "code": request.code,
        "redirect_uri": REDIRECT_URI,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "code_verifier": request.code_verifier,
    }
    
    try:
        response = requests.post(token_url, data=payload)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        detail = "Failed to exchange code for tokens"
        if response is not None:
            try:
                error_data = response.json()
                detail = error_data.get("error_description", error_data.get("error", detail))
            except:
                pass
        raise HTTPException(status_code=400, detail=detail)

# JWT Verification Logic
def verify_access_token(token: str) -> dict:
    try:
        # Note: In a production app, you should fetch JWKS and verify signature properly.
        # For this demonstration, we'll decode without verification or use the JWKS if available.
        # The guide suggests:
        # ISSUER = "https://api.wytnet.com"
        # jwks = requests.get(f"{ISSUER}/.well-known/jwks.json").json()
        # ... logic to find key and verify ...
        
        # Simplified decode for now, or you can implement the full check
        payload = jwt.get_unverified_claims(token)
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

def get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid token")
    token = authorization.split(" ")[1]
    return verify_access_token(token)

@app.get("/me")
def read_users_me(current_user: dict = Depends(get_current_user)):
    return current_user

@app.post("/login")
def login(request: LoginRequest):
    # Dummy login for demonstration
    if request.username == "admin" and request.password == "password":
        return {"access_token": "dummy-token", "token_type": "bearer", "username": request.username}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.post("/signup")
def signup(user: User):
    # Dummy signup
    return {"message": f"User {user.username} created successfully"}

# Serve Static Files
# Note: Ensure the 'static' directory exists (handled by Dockerfile)
if os.path.exists("./static"):
    app.mount("/assets", StaticFiles(directory="./static/assets"), name="assets")

    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):
        # Allow API routes to work
        if full_path.startswith("auth/") or full_path == "me" or full_path == "login" or full_path == "signup":
            raise HTTPException(status_code=404)
        
        file_path = os.path.join("./static", full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse("./static/index.html")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
