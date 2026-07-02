import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createPool } from "./db.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);
const db = createPool(process.env);

app.use(cors({
  origin: process.env.CORS_ORIGIN || true
}));
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({ ok: true });
});

app.post("/api/appointments", async (request, response, next) => {
  try {
    const appointment = normalizeAppointment(request.body);
    const validationError = validateAppointment(appointment);

    if (validationError) {
      return response.status(400).json({ error: validationError });
    }

    const [result] = await db.execute(
      `INSERT INTO appointments
        (name, phone, service, master, appointment_date, appointment_time, message)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        appointment.name,
        appointment.phone,
        appointment.service,
        appointment.master || null,
        appointment.date,
        appointment.time,
        appointment.message || null
      ]
    );

    return response.status(201).json({
      ok: true,
      appointmentId: result.insertId
    });
  } catch (error) {
    return next(error);
  }
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ error: "Failed to save appointment" });
});

app.listen(port, () => {
  console.log(`Aura SPA backend is running on port ${port}`);
});

function normalizeAppointment(body) {
  return {
    name: String(body.name || "").trim(),
    phone: String(body.phone || "").trim(),
    service: String(body.service || "").trim(),
    master: String(body.master || "").trim(),
    date: String(body.date || body.appointmentDate || "").trim(),
    time: String(body.time || body.appointmentTime || "").trim(),
    message: String(body.message || "").trim()
  };
}

function validateAppointment(appointment) {
  if (!appointment.name) return "Name is required";
  if (!appointment.phone) return "Phone is required";
  if (!appointment.service) return "Service is required";
  if (!isDate(appointment.date)) return "Valid appointment date is required";
  if (!isTime(appointment.time)) return "Valid appointment time is required";
  return null;
}

function isDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isTime(value) {
  return /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(value);
}
