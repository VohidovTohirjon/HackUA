import Database from "better-sqlite3";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = process.env.DATABASE_PATH || join(__dirname, "data/carebridge.sqlite");

export const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS checkins (
    id TEXT PRIMARY KEY,
    patient_id TEXT NOT NULL,
    channel TEXT NOT NULL,
    message TEXT NOT NULL,
    analysis_json TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS followups (
    id TEXT PRIMARY KEY,
    patient_id TEXT NOT NULL,
    outcome TEXT NOT NULL,
    notes TEXT,
    next_follow_up_date TEXT,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS escalations (
    id TEXT PRIMARY KEY,
    patient_id TEXT NOT NULL,
    priority TEXT NOT NULL,
    reason TEXT NOT NULL,
    summary TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
`);

export function insertCheckin(checkin) {
  db.prepare(`
    INSERT INTO checkins (id, patient_id, channel, message, analysis_json, created_at)
    VALUES (@id, @patientId, @channel, @message, @analysisJson, @createdAt)
  `).run({
    ...checkin,
    analysisJson: JSON.stringify(checkin.analysis)
  });
}

export function getCheckinsByPatient(patientId) {
  return db
    .prepare("SELECT * FROM checkins WHERE patient_id = ? ORDER BY created_at DESC")
    .all(patientId)
    .map((row) => ({
      id: row.id,
      patientId: row.patient_id,
      channel: row.channel,
      message: row.message,
      analysis: JSON.parse(row.analysis_json),
      createdAt: row.created_at
    }));
}

export function insertFollowup(followup) {
  db.prepare(`
    INSERT INTO followups (id, patient_id, outcome, notes, next_follow_up_date, created_at)
    VALUES (@id, @patientId, @outcome, @notes, @nextFollowUpDate, @createdAt)
  `).run(followup);
}

export function getFollowupsByPatient(patientId) {
  return db
    .prepare("SELECT * FROM followups WHERE patient_id = ? ORDER BY created_at DESC")
    .all(patientId)
    .map((row) => ({
      id: row.id,
      patientId: row.patient_id,
      outcome: row.outcome,
      notes: row.notes,
      nextFollowUpDate: row.next_follow_up_date,
      createdAt: row.created_at
    }));
}

export function insertEscalation(escalation) {
  db.prepare(`
    INSERT INTO escalations (id, patient_id, priority, reason, summary, status, created_at)
    VALUES (@id, @patientId, @priority, @reason, @summary, @status, @createdAt)
  `).run(escalation);
}

export function getEscalationsByPatient(patientId) {
  return db
    .prepare("SELECT * FROM escalations WHERE patient_id = ? ORDER BY created_at DESC")
    .all(patientId)
    .map((row) => ({
      id: row.id,
      patientId: row.patient_id,
      priority: row.priority,
      reason: row.reason,
      summary: row.summary,
      status: row.status,
      createdAt: row.created_at
    }));
}
