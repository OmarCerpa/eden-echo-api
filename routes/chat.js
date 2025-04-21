const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClientChat'); // 👈 usa el correcto

// Obtener todos los chats
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('n8n_chat_histories')
    .select('session_id, message, created_at')
    .order('created_at', { ascending: true });

  if (error) return res.status(500).json({ error });
  res.json(data);
});

module.exports = router;
