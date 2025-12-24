import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contact.js";

const app = express();

/* FRONTENDS PERMITIDOS */
const allowedOrigins = [
  "http://localhost:5173",
  // cuando tengas frontend en prod, lo agregas aquí
 "https://portfolio-backend-production-99fb.up.railway.app/"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Permitir Postman / curl
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, origin);
      }

      return callback(new Error("CORS bloqueado"));
    },
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());
app.use("/api/contact", contactRoutes);

/* 🚨 ESTO ES CLAVE EN RAILWAY */
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Backend escuchando en puerto", PORT);
});
