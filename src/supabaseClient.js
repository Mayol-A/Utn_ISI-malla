import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://egdmamumdybonphnbhpm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnZG1hbXVtZHlib25waG5iaHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNTkyMTgsImV4cCI6MjA2ODczNTIxOH0.GI-xUt56uwduEBwzonZ3_73-ceObz81C9iiOd6XWuPw';

export const supabase = createClient(supabaseUrl, supabaseKey);

