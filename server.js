const express = require('express');
const {dbConnection} = require('./src/db/config');
const cors = require('cors');
const app = express();

require('dotenv').config();


app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dbConnection();
const PORT = 8080;

app.get('/', (req, res) => {
  res.send('Hello Minister!')
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
});

module.exports = app;
