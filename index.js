//Escribe una peque;a app de express js

const express = require('express');
const cors = require('cors');
const bodyParser =  require('body-parser');
const app = express();
const port = 8080;
const definicionesAPI = require('./src/Presentacion/API/index');
 

app.use(cors());    
app.use(bodyParser.json())

app.use('/api', definicionesAPI);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/Presentacion/Web/index.html');
});
 


app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});

