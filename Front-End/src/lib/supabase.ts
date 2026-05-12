import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://unvxcvcxclcsosluipxo.supabase.co";
const supabaseKey = process.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
