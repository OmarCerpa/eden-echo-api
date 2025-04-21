const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient');

// Crear habitación
router.post('/', async (req, res) => {
  const { name, capacity, price } = req.body;
  const { data, error } = await supabase.from('rooms').insert([{ name, capacity, price }]).select();
  if (error) return res.status(500).json({ error });
  res.status(201).json(data[0]);
});

// Obtener habitaciones
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('rooms').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// Actualizar habitación
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, capacity, price } = req.body;
  const { data, error } = await supabase.from('rooms').update({ name, capacity, price }).eq('room_id', id).select();
  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});

// Eliminar habitación
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('rooms').delete().eq('room_id', id);
  if (error) return res.status(500).json({ error });
  res.status(204).send();
});

module.exports = router;
