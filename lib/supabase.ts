import { createClient } from "@supabase/supabase-js";

// A preview deployment may not have production environment variables.
// Leave the reviews feature unavailable rather than crashing the whole site.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
