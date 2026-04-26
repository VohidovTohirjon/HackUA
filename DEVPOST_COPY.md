# Devpost Copy - CareBridge AI

## 1. Short description

CareBridge AI is an API-backed care coordination copilot that helps rural chronic-care teams identify barriers earlier through low-bandwidth SMS and voice-style check-ins.

## 2. Elevator pitch

Rural patients managing chronic conditions often miss care because of transportation, weak broadband, medication confusion, clinic access, or limited staff availability. CareBridge AI turns short patient check-ins into explainable risk signals, care summaries, and human follow-up routing so community health workers, nurses, and care coordinators can respond sooner.

## 3. About the project

CareBridge AI is built for the Social Innovation - Rural Healthcare Access track and the Best Use of AI for Public Good prize. Patients can report issues in plain language through SMS or voice-style check-ins. The system analyzes the message for access barriers, reported concerns, risk level, and safe follow-up routing.

The dashboard helps care teams prioritize outreach. The CHW copilot provides call goals, scripts, resource suggestions, and follow-up checklists. The provider summary turns patient-reported barriers into a concise prep note. All demo data is synthetic.

## 4. How we built it

We built the frontend with React, Vite, and Tailwind CSS. The interface includes a patient check-in simulator, AI analysis panel, risk dashboard, CHW copilot, provider summary, resource matcher, ethics/safety sections, pilot metrics, and a guided demo path.

We added a lightweight Node/Express backend with API endpoints for check-ins, analysis, synthetic patients, follow-up outcomes, metrics, and simulated SMS webhooks. The analysis service can use an OpenAI-compatible API when `AI_API_KEY` is configured. If no key is available, it automatically uses deterministic rule-based analysis so the demo remains safe and reproducible.

## 5. Challenges

The hardest challenge was keeping the AI useful without overstepping. We designed CareBridge AI to support care coordination only: no diagnosis, no prescribing, no treatment changes, and no replacement of clinicians. We also had to keep the workflow realistic for rural settings where broadband, transportation, and staff time are limited.

## 6. Accomplishments

- Built a polished frontend and API-backed backend
- Added optional AI analysis with safe fallback mode
- Created a realistic rural chronic-care workflow
- Added simulated SMS webhook architecture
- Designed transparent risk explanations
- Kept humans central in every clinical decision

## 7. What we learned

We learned that public-good AI in healthcare is most valuable when it reduces coordination friction rather than trying to automate medicine. Rural access problems are often practical: rides, broadband, scheduling, medication access, and trust. AI can help organize these signals, but human follow-up remains essential.

## 8. What’s next

- Pilot one chronic condition, such as diabetes
- Add real voice transcription
- Add Spanish-language check-ins
- Add local resource matching
- Add audit logs and role-based access
- Integrate with existing care management workflows
- Evaluate missed appointments, follow-up time, staff workload, and patient satisfaction

## 9. Built with list

- React
- Vite
- Tailwind CSS
- Node.js
- Express
- local JSON demo storage
- optional OpenAI-compatible API
- simulated Twilio-style SMS webhook
- lucide-react

## 10. 30-second judge pitch

CareBridge AI helps rural chronic-care teams identify barriers earlier through SMS and voice-style check-ins. The API-backed system converts patient messages into explainable risk signals, care summaries, and human follow-up routing. It is designed for transportation barriers, weak broadband, provider shortages, digital literacy limits, and patient trust. It does not diagnose or prescribe. It helps humans reach the right patient sooner.
