import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = `https://cttmzzphorfhqkzyboaj.supabase.co`;
export const supabaseUpdateAvatar = `storage/v1/object/public/avatar`;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dG16enBob3JmaHFrenlib2FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0OTIzOTYsImV4cCI6MjAyNTA2ODM5Nn0.1uX5cNlUtoNmxWiaXgm7VmFFGjXjYToTGTzS-nJf9HM";

const supabase = createClient(supabaseUrl, supabaseKey);
export const supabaseSignup = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storageKey: "newAcc",
  },
});

export default supabase;
