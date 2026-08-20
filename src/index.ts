import express from "express";
import estudiantesRouter from "./routes/estudiantes";

const app = express();
const PORT = 3000;

// Middleware para leer JSON
app.use(express.json());

// ==============================
// Rutas de estudiantes
// ==============================
app.use("/api/estudiantes", estudiantesRouter);

// ==============================
// Ruta de estado
// ==============================
app.get("/api/status", (req, res) => {
  res.json({
    status: "Servidor en línea",
    version: "1.0.0",
  });
});

// ==============================
// Iniciar servidor
// ==============================
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});