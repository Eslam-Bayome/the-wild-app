import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://eltereozpyqkltakltla.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsdGVyZW96cHlxa2x0YWtsdGxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyNDM0NzgsImV4cCI6MjAzMjgxOTQ3OH0.xM7x7QCZD818RqiYTalbgPG9__Cwp_52uAoHK5X6Yx0`;
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
