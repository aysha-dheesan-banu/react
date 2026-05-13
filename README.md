# VortexFlow Full-Stack Project

This is a premium React + FastAPI project featuring a modern landing page, authentication flow, and a data-rich dashboard.

## Project Structure

- `/frontend`: React + TypeScript + Vite + Framer Motion
- `/backend`: FastAPI + Uvicorn

## Prerequisites

- Node.js (v18+)
- Python (3.9+)

## Getting Started

### 1. Setup Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
python main.py
```
The backend will run on `http://localhost:8000`.

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`.

## Features

- **Premium Design**: Modern UI with glassmorphism, gradients, and smooth animations using Framer Motion.
- **Routing**: Full navigation between Landing, Login, Signup, and Dashboard.
- **Responsive**: Fully responsive layouts for mobile and desktop.
- **FastAPI**: Clean and fast backend implementation for auth and data.

## Default Credentials
- **Username**: `admin`
- **Password**: `password`
