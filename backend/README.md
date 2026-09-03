# Honey Chain - FastAPI + PostgreSQL Backend Infrastructure

This directory contains the RESTful Python FastAPI backend for **Honey Chain**, the national honey traceability and smart beekeeping platform for KVIC (Khadi & Village Industries Commission) oversight and rural beekeepers.

---

## 🛠️ Tech Stack

- **Framework**: FastAPI (Python 3.10+)
- **Server**: Uvicorn
- **Database**: PostgreSQL (via `psycopg2-binary`) with automatic fallback support for SQLite (`sqlite:///./honeychain.db`)
- **ORM**: SQLAlchemy 2.0
- **Validation**: Pydantic v2
- **Auth**: Passlib (Bcrypt) & Python-JOSE (JWT Tokens)

---

## 🚀 Quick Setup & Execution Guide

### Step 1: Start PostgreSQL Database
Ensure PostgreSQL is running locally or via Docker on port `5432`:

#### Using PostgreSQL locally:
1. Open PostgreSQL CLI or pgAdmin.
2. Create database named `honeychain`:
   ```sql
   CREATE DATABASE honeychain;
   ```

#### Using Docker (Optional):
```bash
docker run --name honeychain-pg -e POSTGRES_DB=honeychain -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15
```

*(Note: If PostgreSQL is not installed, the backend will automatically fallback to SQLite at `sqlite:///./honeychain.db` so you can test immediately without setup).*

---

### Step 2: Create Python Virtual Environment & Install Dependencies

Navigate to the `backend` directory:
```bash
cd C:\Users\hemaa\.gemini\antigravity\scratch\honey-chain\backend
```

Create & activate virtual environment:
- **Windows (PowerShell)**:
  ```powershell
  python -m venv venv
  .\venv\Scripts\Activate.ps1
  ```
- **Linux / macOS**:
  ```bash
  python3 -m venv venv
  source venv/bin/activate
  ```

Install dependencies:
```bash
pip install -r requirements.txt
```

---

### Step 3: Seed Initial Sample Database Records

Populate PostgreSQL / SQLite with initial beekeepers, hives, IoT telemetry readings, harvest lots, and KVIC lab certificates:
```bash
python -m app.seed
```

---

### Step 4: Run the FastAPI Server

Launch the Uvicorn development server:
```bash
uvicorn app.main:app --reload --port 8000
```

The API server will run at: **`http://localhost:8000`**

Interactive Swagger API Documentation: **`http://localhost:8000/docs`**  
ReDoc Documentation: **`http://localhost:8000/redoc`**

---

## 📋 API Endpoints Reference

### 1. Authentication (`/api/auth`)
- `POST /api/auth/register` — Register a new user (Beekeeper, Gov Officer, Buyer)
- `POST /api/auth/login` — Login user & return JWT token

### 2. Beekeepers (`/api/beekeepers`)
- `GET /api/beekeepers` — List all certified beekeepers
- `POST /api/beekeepers` — Register new beekeeper
- `PUT /api/beekeepers/{id}/verify` — Toggle government certification status

### 3. Smart Hives (`/api/hives`)
- `GET /api/hives` — List monitored hives (optional `?status=HEALTHY`)
- `GET /api/hives/{id}` — Get detailed hive microclimate profile
- `POST /api/hives` — Register a new smart hive node

### 4. IoT Telemetry (`/api/telemetry`)
- `POST /api/telemetry` — Ingress IoT sensor reading (Temp, Humidity, Weight, Sound Hz, Battery)
- `GET /api/telemetry/hive/{hive_id}` — Get 24-hour historical stream

### 5. Honey Harvests (`/api/harvests`)
- `GET /api/harvests` — List extraction logs
- `POST /api/harvests` — Log harvest & auto-generate government Batch ID (`HC-AP-2026-XXXX`)

### 6. Honey Batches (`/api/batches`)
- `GET /api/batches` — Catalog of harvested lots
- `GET /api/batches/{batch_id}` — Get batch details
- `PUT /api/batches/{batch_id}/quality` — Input KVIC NABL lab test scores (Purity, Moisture, C4 Sugars)
- `PUT /api/batches/{batch_id}/marketplace` — Toggle marketplace listing

### 7. Public Batch Verification (`/api/verify`)
- `GET /api/verify/{batch_id}` — **Public Unauthenticated Endpoint**: Scan QR or lookup Batch ID for origin certificate & supply chain timeline

### 8. Alerts (`/api/alerts`)
- `GET /api/alerts` — List system anomaly notifications
- `POST /api/alerts` — Create system alert
- `PUT /api/alerts/{id}/dismiss` — Dismiss/resolve alert

### 9. Government Statistics (`/api/stats`)
- `GET /api/stats/gov-dashboard` — National overview metrics (Hives, Yield MT, Purity compliance %, Cluster heatmap stats)
