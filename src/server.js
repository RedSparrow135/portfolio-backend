import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contact.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // tu React
}));
app.use(express.json());

app.use("/api/contact", contactRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend en http://localhost:${PORT}`);
});
