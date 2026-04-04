export const SUPABASE_URL = "https://mnwfrgiguvqxgkdwlyaj.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ud2ZyZ2lndXZxeGdrZHdseWFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NzMxMDAsImV4cCI6MjA5MDQ0OTEwMH0.kOF_Vs-CdV87Z2gmULf-5sbS61Ufd_bmIXAsCzKpC9E";

export const IS_SUPABASE_CONFIGURED =
  !!SUPABASE_URL &&
  !!SUPABASE_ANON_KEY &&
  !SUPABASE_URL.includes("YOUR_PROJECT_ID") &&
  !SUPABASE_ANON_KEY.includes("YOUR_SUPABASE_ANON_KEY");
