const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient');

// Crear reserva
router.post('/', async (req, res) => {
  const { user_id, room_id, check_in, check_out, status, total_price } = req.body;
  const { data, error } = await supabase
    .from('reservations')
    .insert([{ user_id, room_id, check_in, check_out, status, total_price }])
    .select();
  if (error) return res.status(500).json({ error });
  res.status(201).json(data[0]);
});

// Obtener todas las reservas
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('reservations').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// Actualizar una reserva
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { user_id, room_id, check_in, check_out, status, total_price } = req.body;
  const { data, error } = await supabase
    .from('reservations')
    .update({ user_id, room_id, check_in, check_out, status, total_price })
    .eq('reservation_id', id)
    .select();
  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});

// Eliminar una reserva
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('reservations').delete().eq('reservation_id', id);
  if (error) return res.status(500).json({ error });
  res.status(204).send();
});

module.exports = router;
