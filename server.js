// server.js
require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
const chatRoutes = require('./routes/chat');

const app = express();


// Middleware
app.use(bodyParser.json());

// Conexión a la base de datos
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const allowedOrigins = [
  'http://localhost:4200',  // Angular local
  'http://127.0.0.1:4200',
  'https://tusitio.com',    // Producción (si lo tienes)
  'https://www.tusitio.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir peticiones sin origin (como curl o postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true
}));

app.use('/available-rooms', require('./routes/availableRooms'));
app.use('/api/chats', chatRoutes);

// Rutas CRUD para "rooms"

// Crear una habitación
app.post('/rooms', async (req, res) => {
  const { name, capacity, price } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO rooms (name, capacity, price) VALUES ($1, $2, $3) RETURNING *',
      [name, capacity, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la habitación' });
  }
});

// Obtener todas las habitaciones
app.get('/rooms', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM rooms');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener habitaciones' });
  }
});

// Actualizar una habitación
app.put('/rooms/:id', async (req, res) => {
  const { id } = req.params;
  const { name, capacity, price } = req.body;
  try {
    const result = await pool.query(
      'UPDATE rooms SET name = $1, capacity = $2, price = $3 WHERE id = $4 RETURNING *',
      [name, capacity, price, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la habitación' });
  }
});

// Eliminar una habitación
app.delete('/rooms/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM rooms WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la habitación' });
  }
});

// Rutas CRUD para "reservations"

// Crear una reserva
app.post('/reservations', async (req, res) => {
  const { room_id, start_date, end_date, customer_name } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO reservations (room_id, start_date, end_date, customer_name) VALUES ($1, $2, $3, $4) RETURNING *',
      [room_id, start_date, end_date, customer_name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
});

// Obtener todas las reservas
app.get('/reservations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reservations');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
});

// Actualizar una reserva
app.put('/reservations/:id', async (req, res) => {
  const { id } = req.params;
  const { room_id, start_date, end_date, customer_name } = req.body;
  try {
    const result = await pool.query(
      'UPDATE reservations SET room_id = $1, start_date = $2, end_date = $3, customer_name = $4 WHERE id = $5 RETURNING *',
      [room_id, start_date, end_date, customer_name, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la reserva' });
  }
});

// Eliminar una reserva
app.delete('/reservations/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM reservations WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la reserva' });
  }
});

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));

