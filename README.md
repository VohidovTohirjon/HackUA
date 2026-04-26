# CareBridge AI

**Project:** CareBridge AI  
**Track:** Social Innovation - Rural Healthcare Access  
**Prize:** Best Use of AI for Public Good

## What it is

CareBridge AI is an API-backed care coordination MVP for rural chronic-care teams. Patients can send low-bandwidth SMS or voice-style check-ins about barriers such as transportation, missed appointments, weak broadband, medication confusion, or worsening symptoms. The system analyzes the message, explains the risk, and routes the case for human follow-up.

## Why it matters

Rural patients managing chronic conditions often miss care because of long travel distance, limited broadband, clinic availability, provider shortages, low digital literacy, and trust barriers. CareBridge AI is designed to help care teams identify these barriers earlier and prioritize limited staff time without replacing clinicians.

## Key features

- SMS-style patient check-in simulator
- API-backed check-in and analysis workflow
- Optional LLM analysis with deterministic rule-based fallback
- Risk dashboard for care coordinators
- Community health worker copilot with call script and checklist
- Provider-ready summary
- Simulated SMS webhook
- Follow-up outcome API
- Pilot metrics and safety sections
- Synthetic patient data only

## Architecture

`Patient SMS/Voice Check-In -> CareBridge API -> AI Analysis / Rule-Based Safe Fallback -> Risk Dashboard -> CHW/Nurse Follow-Up -> Provider Summary`

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **Storage:** local SQLite database for messages and follow-ups
- **AI mode:** optional OpenAI-compatible API or deterministic fallback
- **SMS mode:** Twilio-style simulated webhook

## API endpoints

- `GET /api/health` - API status
- `POST /api/checkins` - receive and analyze a patient check-in
- `POST /api/analyze` - analyze a message
- `GET /api/patients` - return synthetic patients
- `GET /api/patients/:id` - return one patient with check-ins and care summary
- `POST /api/followups` - save a mock CHW follow-up outcome
- `GET /api/metrics` - return proposed pilot metrics
- `POST /api/sms/webhook` - simulate inbound SMS

## AI safety boundaries

CareBridge AI does **not** diagnose, prescribe, change treatment, or replace healthcare professionals. It may detect reported barriers, summarize patient messages, identify urgency signals, suggest human follow-up roles, and explain why a risk level was assigned. Human care teams make all final decisions.

## How to run frontend

```bash
npm install
npm run dev
```

Open the localhost URL printed by Vite.

## Easiest way to run the full demo

Run frontend and backend together:

```bash
npm run dev:full
```

Open the frontend URL printed by Vite. The backend will run at `http://localhost:3001`.

## How to run backend

In a second terminal:

```bash
npm run server
```

The API runs at `http://localhost:3001`.

Optional `.env` values:

```bash
VITE_API_BASE_URL=http://localhost:3001
AI_API_KEY=
AI_MODEL=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
```

## How fallback mode works

No AI key is required. If `AI_API_KEY` is missing or an AI request fails, the backend automatically uses deterministic rule-based analysis. This keeps the demo safe, reproducible, and fully functional without external services.

## Demo script

1. Run `npm run dev:full` or run backend/frontend in two terminals.
2. Open the frontend URL printed by Vite.
3. Click **Run Winning Demo**.
4. Maria Lopez reports a missed diabetes appointment because she could not get a ride and has high blood sugar.
5. The check-in is sent through `/api/checkins`.
6. The analysis source badge shows API AI or fallback.
7. The dashboard highlights high risk, the CHW copilot provides a script, and the provider summary shows a safe human-review note.

## Devpost description

CareBridge AI helps rural chronic-care teams identify access barriers earlier through SMS and voice-style check-ins. The API-backed prototype turns patient messages into explainable care-coordination signals: barriers, risk level, staff summary, suggested human role, and safe next steps. It is designed for rural realities such as transportation gaps, weak broadband, provider shortages, digital literacy limits, and continuity of care. CareBridge AI does not diagnose or prescribe; it helps humans reach the right patient sooner.

## Built with

- React
- Vite
- Tailwind CSS
- Node.js
- Express
- local JSON demo storage
- optional OpenAI-compatible API
- simulated Twilio-style SMS webhook
- lucide-react
