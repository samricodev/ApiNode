const { infoCursos } = require('./datos/cursos');
const express = require('express');
const app = express();
const cors = require('cors');

const PUERTO = process.env.PORT || 3000;
const router = express.Router();
const routerMatematicas = require('./routers/matematicas.js');
const routerProgramacion = require('./routers/programacion.js');

app.use(cors());
app.use('/api/v1', router);
app.use('/api/v1/cursos/programacion', routerProgramacion);
app.use('/api/v1/cursos/matematicas', routerMatematicas);

app.get('/', (req, res) => {
  const index = __dirname + '/views/index.html';
  res.sendFile(index);
})

router.get('/', (req, res) => {
  const guide = __dirname + '/views/guide.html';
  res.sendFile(guide);
});

router.get('/cursos', (req, res) => {
  res.send(JSON.stringify(infoCursos));
});

app.listen(PUERTO, () => {
  console.log(`🚀 Server on port http://127.0.0.1:${PUERTO}/api/v1`);
});