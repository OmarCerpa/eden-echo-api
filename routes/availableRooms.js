const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient');

// GET /available-rooms?check_in=2025-04-15&check_out=2025-04-20
router.get('/', async (req, res) => {
  const { check_in, check_out } = req.query;

  if (!check_in || !check_out) {
    return res.status(400).json({ error: 'Debes proporcionar check_in y check_out' });
  }

  try {
    // Paso 1: obtener todas las habitaciones
    const { data: allRooms, error: roomError } = await supabase.from('rooms').select('*');
    if (roomError) throw roomError;

    // Paso 2: obtener reservas que se crucen con las fechas solicitadas
    const { data: overlappingReservations, error: reservationError } = await supabase
      .from('reservations')
      .select('room_id')
      .or(
        `and(check_in.lte.${check_out},check_out.gte.${check_in})`
      );

    if (reservationError) throw reservationError;

    const reservedRoomIds = [...new Set(overlappingReservations.map(r => r.room_id))];

    // Paso 3: excluir habitaciones reservadas
    const disponibles = allRooms.filter(room => !reservedRoomIds.includes(room.room_id));

    res.json(disponibles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al consultar habitaciones disponibles' });
  }
});

module.exports = router;
