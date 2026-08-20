import { Router } from "express";

const router = Router();

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
// GET /api/estudiantes
// GET /api/estudiantes?bootcamp=PERN
// ==============================
router.get("/", (req, res) => {
  const bootcamp = req.query.bootcamp;

  if (bootcamp) {
    const estudiantesFiltrados = estudiantes.filter(
      (estudiante) => estudiante.bootcamp === bootcamp
    );

    return res.status(200).json(estudiantesFiltrados);
  }

  res.status(200).json(estudiantes);
});

// ==============================
// GET - Obtener estudiante por ID
// GET /api/estudiantes/:id
// ==============================
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const estudiante = estudiantes.find(
    (estudiante) => estudiante.id === id
  );

  if (!estudiante) {
    return res.status(404).json({
      mensaje: "Estudiante no encontrado",
    });
  }

  res.status(200).json(estudiante);
});

// ==============================
// POST - Crear estudiante
// ==============================
router.post("/", (req, res) => {
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
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
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

export default router;