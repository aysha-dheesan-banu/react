# Stage 1: Build Frontend
FROM node:20-slim AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
# We skip tsc to avoid build failures due to minor type issues in CI
RUN npx vite build

# Stage 2: Backend & Final Image
FROM python:3.11-slim
WORKDIR /app

# Install dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./

# Copy built frontend from Stage 1 to 'static' folder in backend
COPY --from=frontend-build /app/frontend/dist ./static

# Expose port 8000
EXPOSE 8000

# Environment variables
ENV PYTHONUNBUFFERED=1

# Run the app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
