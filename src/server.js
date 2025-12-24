import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contact.js";

dotenv.config();

const app = express();

/* ✅ ORÍGENES PERMITIDOS (FRONTENDS) */
const allowedOrigins = [
  "http://localhost:5173",
  "https://portfolio-backend-production-99fb.up.railway.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite Postman / curl
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, origin); // 👈 CLAVE
      }

      return callback(new Error("CORS no permitido"));
    },
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

/* 🔁 Preflight */
app.options("*", cors());

app.use(express.json());
app.use("/api/contact", contactRoutes);

/* ⚠️ Railway IGNORA este puerto */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en puerto ${PORT}`);
});
