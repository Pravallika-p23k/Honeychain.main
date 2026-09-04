# HoneyChain

HoneyChain is a digital traceability and smart beekeeping platform designed for rural honey producers, government inspection bodies, quality labs, and buyers. It combines blockchain-based verification, IoT hive monitoring, AI-driven recommendations, and a public batch verification flow to ensure honey authenticity and supply-chain transparency.

The project is built as a multi-layer platform with:

- a React frontend for dashboards and user workflows
- a FastAPI backend for APIs, auth, and role-based business logic
- a PostgreSQL/SQLite data layer for operational records
- a Hardhat + Solidity smart contract for on-chain batch traceability
- AI and telemetry-driven intelligence for hive health monitoring

---

## Overview

HoneyChain connects beekeepers, inspectors, quality labs, and consumers in a single ecosystem. It supports:

- beekeepers managing hive & harvest data
- government oversight through dashboards and batch verification
- IoT telemetry monitoring for hive health
- AI insights for colony conditions and anomaly detection
- QR-driven consumer verification of honey batch authenticity
- blockchain-backed supply-chain events for immutable traceability

---

## Key Features

### Smart beekeeping and traceability

- Hive registration and tracking
- Harvest and batch lifecycle management
- Quality checks and public verification
- Geographic and cluster-based monitoring

### IoT monitoring

- Temperature, humidity, battery, vibration, and weight telemetry
- Live operational dashboard for hive health
- Alerts for abnormal conditions

### AI insights

- Predictive hive health analysis
- Risk scoring based on telemetry patterns
- Cluster-wise analytics and advisory support

### Blockchain security

- Secure batch registration on-chain
- Tamper-resistant lifecycle event logs
- Immutable records for supply-chain transparency

### Public verification

- Batch lookup by ID
- QR-based verification flow
- Supply-chain timeline for consumers and regulators

---

## Tech Stack

### Frontend

- React 19
- Vite
- React Router DOM
- Tailwind CSS
- Recharts
- Lucide React

### Backend

- Python
- FastAPI
- Uvicorn
- SQLAlchemy
- Pydantic
- JWT authentication with Passlib/Bcrypt

### Database

- PostgreSQL
- SQLite fallback for local/dev testing

### Blockchain

- Solidity
- Hardhat
- Ethereum-compatible local deployment environment

### Other tools

- QR-based verification UI
- Dashboard analytics
- Role-based access patterns

---

## Project Structure

```text
Honeychain.main/
├── backend/
│   ├── app/
│   ├── README.md
│   └── requirements.txt
├── blockchain/
│   ├── contracts/
│   ├── scripts/
│   ├── test/
│   ├── hardhat.config.js
│   └── package.json
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── .gitignore
```

---

## Prerequisites

Before running the project, make sure you have:

- Node.js 18+ and npm
- Python 3.10+
- PostgreSQL (optional; SQLite fallback is supported)
- A local blockchain environment if testing the Solidity contract

---

## Running the Frontend

From the project root:

```bash
npm install
npm run dev
```

The app will run in development mode using Vite.

---

## Running the Backend

Go to the backend folder:

```bash
cd backend
python -m venv venv
```

Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Linux/macOS:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the API:

```bash
uvicorn app.main:app --reload --port 8000
```

Backend endpoints will be available at:

- http://localhost:8000
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

---

## Running the Blockchain Contract

Go to the blockchain folder:

```bash
cd blockchain
npm install
npx hardhat compile
npx hardhat test
```

To deploy locally:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

---

## Environment Notes

- The backend is configured to prefer PostgreSQL but can fall back to SQLite when PostgreSQL is unavailable.
- Seed data can be used to populate sample beekeeper, hive, telemetry, and batch records.
- The frontend uses demo/mock data for dashboard workflows and demonstration screens.

---

## Use Cases

### For beekeepers

- register hives and monitor colony health
- record harvest data
- track quality and traceability information

### For government and regulators

- inspect hive health patterns
- verify batch history and certification
- assess production compliance and quality signals

### For consumers and buyers

- verify product authenticity using QR or batch ID
- inspect origin and supply-chain timeline

---

## Future Scope

This project has strong potential for real-world deployment in agricultural traceability and food safety:

- real IoT sensor integration and gateway deployment
- national-scale onboarding for beekeeping clusters
- more advanced AI models for disease and yield forecasting
- mobile apps for field officers and beekeepers
- integration with lab systems and certification authorities
- expansion to other agricultural products beyond honey
- global marketplace trust and export verification flows

---

## License

This project does not currently declare a formal license in the repository. Please confirm the licensing details before public or commercial deployment.

---

## Project Vision

HoneyChain aims to create trust in the honey value chain by making origin, quality, and movement of product visible, verifiable, and secure. It blends digital public infrastructure with practical field-level agriculture workflows, giving rural producers and institutions a stronger foundation for transparency and accountability.
