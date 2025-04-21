const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient');

// Crear un usuario
router.post('/', async (req, res) => {
  const { name, email, phone } = req.body;
  const { data, error } = await supabase.from('users').insert([{ name, email, phone }]).select();
  if (error) return res.status(500).json({ error });
  res.status(201).json(data[0]);
});

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// Actualizar un usuario
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const { data, error } = await supabase.from('users').update({ name, email, phone }).eq('user_id', id).select();
  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('users').delete().eq('user_id', id);
  if (error) return res.status(500).json({ error });
  res.status(204).send();
});

module.exports = router;
