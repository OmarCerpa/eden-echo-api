const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://pllzqpkldzckpwmpluja.supabase.co'; // proyecto de n8n/chat
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsbHpxcGtsZHpja3B3bXBsdWphIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTc0MjY2NywiZXhwIjoyMDU1MzE4NjY3fQ.dvSvk7cyJfpliKltB8Uy2bnCi3vDgxYSXDw2hgSClXk'; // usa la anon o service role key de ese proyecto

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
