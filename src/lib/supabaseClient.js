
import { createClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'


const supabaseUrl = PUBLIC_SUPABASE_URL;
const supabaseKey = PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);


// const authHeader = req.headers.get('Authorization')!
// export const supabase = createClient(supabaseUrl, supabaseKey,{ global: { headers: { Authorization: authHeader } } });
