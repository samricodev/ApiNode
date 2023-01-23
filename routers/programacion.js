const express = require("express");
const routerProgramacion = express.Router();
const { programacion } = require('../datos/cursos.js').infoCursos;

//MIDDLEWARE
routerProgramacion.use(express.json());

//GET
routerProgramacion.get("/", (req, res) => {
  res.json(programacion);
});

routerProgramacion.get("/:lenguaje", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultados = programacion.filter(
    (curso) => curso.lenguaje === lenguaje
  );

  if (resultados.length == 0) {
    return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);
  } else {
    res.send(resultados);
  }
});

routerProgramacion.get("/:lenguaje/:nivel", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;
  const resultados = programacion.filter(
    curso => curso.lenguaje === lenguaje && curso.nivel === nivel
  );

  if (resultados.length == 0) {
    return res
      .status(404)
      .send(`No se encontraron cursos de ${lenguaje} con nivel ${nivel}`);
  } else {
    res.send(resultados);
  }
});

//POST
routerProgramacion.post('/', (req, res) => {
  let cursoNuevo = req.body;
  programacion.push(cursoNuevo);
  res.json(programacion);
});

//PUT
routerProgramacion.put('/:id', (req, res) => {
  const id = req.params.id;
  const cursoActualizado = req.body;
  const indice = programacion.findIndex(curso => curso.id == id);

  if(indice >= 0){
    programacion[indice] = cursoActualizado;
  } else{
    res.status(404).send('Curso no encontrado');
  }

  res.json(programacion);
});

//PATCH
routerProgramacion.patch('/:id',(req, res) => {
  const infoActualizada = req.body;
  const id = req.params.id;
  const indice = programacion.findIndex(curso => curso.id == id);

  if(indice >= 0){
    const cursoAModificar = programacion[indice];
    Object.assign(cursoAModificar, infoActualizada);
  } else{
    res.status(404).send('Curso no encontrado');
  }
  res.json(programacion);
});

//DELETE
routerProgramacion.delete('/:id', (req, res) => {
  const id = req.params.id;
  const indice = programacion.findIndex(curso => curso.id == id);

  if(indice >= 0){
    programacion.splice(indice, 1);
  } else {
    res.status(404).send('Curso no encontrado');
  }

  res.json(programacion);
});

module.exports = routerProgramacion;
