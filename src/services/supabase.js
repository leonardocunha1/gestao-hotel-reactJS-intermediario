// Toda essa parte do código foi obtida no site do Supabase, na parte de API, onde é possível ver como fazer a conexão com o banco de dados "Connecting to your new project".

import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://rnurwjzlnkjcfkentuhx.supabase.co";
// essa Key foi gerada no site do Supabase, na parte de API.
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJudXJ3anpsbmtqY2ZrZW50dWh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyOTg0ODksImV4cCI6MjAzMzg3NDQ4OX0.SKSJuLVSaVuzHLnLksxln8mg_PIzHuIzS6B52oJ2B-o";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
