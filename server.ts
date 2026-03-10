import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";

const db = new Database("dental.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS cases (
    id TEXT PRIMARY KEY,
    patientName TEXT,
    patientId TEXT,
    tooth TEXT,
    date TEXT,
    status TEXT,
    diagnosis TEXT,
    confidence REAL,
    area TEXT,
    diameter TEXT,
    depthStage TEXT,
    treatment TEXT,
    treatmentPlan TEXT
  )
`);

// Seed initial data if empty
const count = db.prepare("SELECT COUNT(*) as count FROM cases").get() as { count: number };
if (count.count === 0) {
  const seedStmt = db.prepare(`
    INSERT INTO cases (id, patientName, patientId, tooth, date, status, diagnosis, confidence, area, diameter, depthStage, treatment, treatmentPlan)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const initialCases = [
    {
      id: 'RPT-2024-001',
      patientName: 'John Doe',
      patientId: 'PT-001',
      tooth: '#18 (Lower Left)',
      date: '2024-03-01',
      status: 'Analyzed',
      diagnosis: 'Mild Caries',
      confidence: 98.2,
      area: '5.2 mm²',
      diameter: '2.1 mm',
      depthStage: 'D1 — Enamel',
      treatment: 'Fluoride Treatment',
      treatmentPlan: JSON.stringify([{ step: 1, description: 'Professional cleaning', timeline: 'Day 1' }])
    },
    {
      id: 'RPT-2024-002',
      patientName: 'Jane Smith',
      patientId: 'PT-002',
      tooth: '#3 (Upper Right)',
      date: '2024-03-05',
      status: 'Pending',
      diagnosis: 'Suspected Cavity',
      confidence: 85.5,
      area: '8.1 mm²',
      diameter: '3.2 mm',
      depthStage: 'D2 — Dentin',
      treatment: 'Consultation Required',
      treatmentPlan: JSON.stringify([{ step: 1, description: 'Detailed X-ray', timeline: 'Day 1' }])
    }
  ];

  initialCases.forEach(c => {
    seedStmt.run(c.id, c.patientName, c.patientId, c.tooth, c.date, c.status, c.diagnosis, c.confidence, c.area, c.diameter, c.depthStage, c.treatment, c.treatmentPlan);
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/cases", (req, res) => {
    const cases = db.prepare("SELECT * FROM cases ORDER BY date DESC").all();
    res.json(cases.map(c => ({
      ...c,
      treatmentPlan: c.treatmentPlan ? JSON.parse(c.treatmentPlan as string) : null
    })));
  });

  app.post("/api/cases", (req, res) => {
    const { id, patientName, patientId, tooth, date, status, diagnosis, confidence, area, diameter, depthStage, treatment, treatmentPlan } = req.body;
    const stmt = db.prepare(`
      INSERT INTO cases (id, patientName, patientId, tooth, date, status, diagnosis, confidence, area, diameter, depthStage, treatment, treatmentPlan)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(id, patientName, patientId, tooth, date, status, diagnosis, confidence, area, diameter, depthStage, treatment, JSON.stringify(treatmentPlan));
    res.status(201).json({ id });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
