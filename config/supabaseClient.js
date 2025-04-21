const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wlhszafxgkrxugivtmcs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsaHN6YWZ4Z2tyeHVnaXZ0bWNzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDM1NTE2NywiZXhwIjoyMDU5OTMxMTY3fQ.8-TsBf4w_RArbPrKgTtUDi7g7iyNWRoZvLnm0PqISgo';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
