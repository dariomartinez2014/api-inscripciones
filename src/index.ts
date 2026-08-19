import express from "express";

const app = express();
const PORT = 3000;

// Middleware para leer JSON
app.use(express.json());

// Interface Estudiante
interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

// Arreglo en memoria
const estudiantes: Estudiante[] = [];

// ==============================
// GET - Obtener estudiantes
// ==============================
app.get("/api/estudiantes", (req, res) => {
  res.status(200).json(estudiantes);
});

// ==============================
// POST - Crear estudiante
// ==============================
app.post("/api/estudiantes", (req, res) => {
  const { nombre, email, bootcamp } = req.body;

  if (!email) {
    return res.status(400).json({
      mensaje: "El email es obligatorio",
    });
  }

  const nuevoEstudiante: Estudiante = {
    id: estudiantes.length + 1,
    nombre,
    email,
    bootcamp,
  };

  estudiantes.push(nuevoEstudiante);

  res.status(201).json(nuevoEstudiante);
});

// ==============================
// PUT - Actualizar estudiante
// ==============================
app.put("/api/estudiantes/:id", (req, res) => {
  const id = Number(req.params.id);

  const estudiante = estudiantes.find(
    (estudiante) => estudiante.id === id
  );

  if (!estudiante) {
    return res.status(404).json({
      mensaje: "Estudiante no encontrado",
    });
  }

  const { nombre, email, bootcamp } = req.body;

  estudiante.nombre = nombre;
  estudiante.email = email;
  estudiante.bootcamp = bootcamp;

  res.status(200).json(estudiante);
});

// ==============================
// DELETE - Eliminar estudiante
// ==============================
app.delete("/api/estudiantes/:id", (req, res) => {
  const id = Number(req.params.id);

  const indice = estudiantes.findIndex(
    (estudiante) => estudiante.id === id
  );

  if (indice === -1) {
    return res.status(404).json({
      mensaje: "Estudiante no encontrado",
    });
  }

  estudiantes.splice(indice, 1);

  res.status(200).json({
    mensaje: "Estudiante eliminado correctamente",
  });
});

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

