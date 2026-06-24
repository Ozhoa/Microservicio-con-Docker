const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * GET /hello?name=Ana
 * Responde con { "message": "Hola Ana desde Docker" }
 * Si no se envía 'name', usa "Mundo" como valor por defecto.
 */
app.get('/hello', (req, res) => {
  const name = req.query.name || 'Mundo';
  res.status(200).json({ message: `Hola ${name} desde Docker` });
});

/**
 * Endpoint de salud, útil para healthchecks de Docker / orquestadores.
 */
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

module.exports = app;
