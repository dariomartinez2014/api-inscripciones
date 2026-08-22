import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../swagger_output.json";
import cors from "cors";

const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(cors());
// Middleware para leer JSON
app.use(express.json());

/* Swagger */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));
// Interface Estudiante
interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

// Arreglo en memoria
const estudiantes: Estudiante[] = [];

app.get("/", (req, res) => {
  res.status(200).json({
    mensaje: "API funcionando correctamente",
  });
});

// ==============================
// GET - Obtener estudiantes
// ==============================
app.get("/api/students", (req, res) => {
  res.status(200).json(
    estudiantes.map((estudiante) => ({
      id: estudiante.id,
      name: estudiante.nombre,
      email: estudiante.email,
      bootcamp: estudiante.bootcamp,
    }))
  );
});


// ==============================
// POST - Crear estudiante
// ==============================
app.post(["/api/estudiantes", "/students", "/api/students"], (req, res) => {
  // #swagger.description = 'Crea un nuevo estudiante'
 const { nombre, name, email, bootcamp } = req.body;

  if (!email) {
    return res.status(400).json({
      mensaje: "El email es obligatorio",
    });
  }

  const nuevoEstudiante: Estudiante = {
    id: estudiantes.length + 1,
    nombre: nombre ?? name,
    email,
    bootcamp,
  };

  estudiantes.push(nuevoEstudiante);

  res.status(201).json(nuevoEstudiante);
});

// ==============================
// PUT - Actualizar estudiante
// ==============================
app.put(
  ["/api/estudiantes/:id", "/students/:id", "/api/students/:id"],
  (req, res) => {
  // #swagger.description = 'Actualiza un estudiante existente'
  const id = Number(req.params.id);

  const estudiante = estudiantes.find(
    (estudiante) => estudiante.id === id
  );

  if (!estudiante) {
    return res.status(404).json({
      mensaje: "Estudiante no encontrado",
    });
  }

 const { nombre, name, email, bootcamp } = req.body;

estudiante.nombre = nombre ?? name;
estudiante.email = email;
estudiante.bootcamp = bootcamp;

  res.status(200).json(estudiante);
});

// ==============================
// DELETE - Eliminar estudiante
// ==============================
app.delete(["/api/estudiantes/:id", "/students/:id"], (req, res) => { 
  // #swagger.description = 'Elimina un estudiante'
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

