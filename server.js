const express = require('express');
const {dbConnection} = require('./src/db/config');
const cors = require('cors');
const app = express();
const validateJWT = require('./src/middleware/jwt.middleware');
const { pollMessages } = require('./src/services/listener.sqs'); 

require('dotenv').config();


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//leer cookies request jwt auth
const cookieParser = require('cookie-parser');
app.use(cookieParser());

dbConnection();
const PORT = 8080;

// Endpoint libre sin validación JWT
app.get('/test-free', (req, res) => {
  res.json({ message: 'Endpoint sin JWT' });
});

// Middleware global: validar JWT
app.use((req, res, next) => {
  const publicRoutes = ['/login', '/register'];
  if (publicRoutes.includes(req.path)) {
    return next(); // Permitir acceso sin validación
  }
  validateJWT(req, res, next); // Validar JWT para el resto
});

app.use("/", require('./src/routes/furniture.routes'));
app.use("/", require('./src/routes/visit.routes'));
app.use("/", require('./src/routes/rent.routes'));
app.use("/", require('./src/routes/warehouse.routes'));
app.use("/", require('./src/routes/transport.routes'));
app.use("/", require('./src/routes/user.routes'))
app.use("/", require('./src/routes/asset.routes'))
app.use("/", require('./src/routes/logistic.routes'))
app.use("/", require('./src/routes/worker.routes'))

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
  pollMessages()
    .then(() => console.log('Listener de SQS iniciado.'))
    .catch((error) => {
      console.error('Error iniciando el listener de SQS:', error);
      process.exit(1); // Salir si el listener falla
    });
});

module.exports = app;
