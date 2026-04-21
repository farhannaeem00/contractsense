# ContractSense

ContractSense is a full-stack contract review platform that helps users upload agreements, analyze risky clauses, extract key deadlines, and generate shareable reports.

## Project Structure

- `client/` - React + Vite frontend
- `server/` - Express + MongoDB API

## Features

- Secure user registration and login
- Contract upload and analysis workflow
- Risk scoring and clause summaries
- Deadline extraction and reporting
- PDF report generation

## Getting Started

### 1. Configure environment variables

Copy the example files and fill in your own values:

- `client/.env.example` -> `client/.env`
- `server/.env.example` -> `server/.env`

### 2. Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 3. Run the development servers

In one terminal:

```bash
cd server
npm run dev
```

In another terminal:

```bash
cd client
npm run dev
```

## Environment Variables

### Server

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `NODE_ENV`
- `CLIENT_URL`
- `GROQ_API_KEY`

### Client

- `VITE_API_URL`

## Notes

- `node_modules/` and local `.env` files are intentionally ignored.
- Update `VITE_API_URL` if the API is deployed to a different host.
