import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fpnosrvzktinuupjmktg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwbm9zcnZ6a3RpbnV1cGpta3RnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNDc5ODYsImV4cCI6MjA2ODcyMzk4Nn0.hzVoFGNnrNoOzXrUhMftZuBbb3ZISCcKkGIVtcEiIdQ';

export const supabase = createClient(supabaseUrl, supabaseKey);