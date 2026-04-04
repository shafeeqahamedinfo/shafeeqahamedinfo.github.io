import { IS_SUPABASE_CONFIGURED } from "./config.js";
import { getSupabaseClient } from "./supabaseClient.js";

const form = document.getElementById("adminLoginForm");
const statusEl = document.getElementById("authStatus");
const createAdminBtn = document.getElementById("createAdminBtn");

const supabase = IS_SUPABASE_CONFIGURED ? await getSupabaseClient() : null;

function formatAuthError(error) {
  const message = error?.message || "Unknown authentication error.";

  if (message.toLowerCase().includes("database error querying schema")) {
    return "Login failed: auth user record is invalid. Run the Auth Repair SQL in supabase/schema.sql, then click Create Admin Account again.";
  }

  return `Login failed: ${message}`;
}

function getCredentials() {
  const formData = new FormData(form);
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();
  return { email, password };
}

if (!IS_SUPABASE_CONFIGURED || !supabase) {
  statusEl.textContent = "Configure Supabase URL and Anon key in assets/js/config.js before logging in.";
  form.querySelector("button[type='submit']").disabled = true;
  if (createAdminBtn) createAdminBtn.disabled = true;
} else {
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    window.location.href = "admin.html";
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!IS_SUPABASE_CONFIGURED || !supabase) return;

  const { email, password } = getCredentials();

  if (!email || !password) {
    statusEl.textContent = "Enter both email and password.";
    return;
  }

  statusEl.textContent = "Signing in...";
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    statusEl.textContent = formatAuthError(error);
    return;
  }

  statusEl.textContent = "Login successful. Redirecting...";
  window.location.href = "admin.html";
});

if (createAdminBtn) {
  createAdminBtn.addEventListener("click", async () => {
    if (!IS_SUPABASE_CONFIGURED || !supabase) return;

    const { email, password } = getCredentials();
    if (!email || !password) {
      statusEl.textContent = "Enter email and password before creating admin account.";
      return;
    }

    if (password.length < 6) {
      statusEl.textContent = "Password must be at least 6 characters.";
      return;
    }

    statusEl.textContent = "Creating admin account...";
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      statusEl.textContent = `Account creation failed: ${error.message}`;
      return;
    }

    const loginResult = await supabase.auth.signInWithPassword({ email, password });
    if (!loginResult.error) {
      statusEl.textContent = "Admin account created and logged in. Redirecting...";
      window.location.href = "admin.html";
      return;
    }

    statusEl.textContent = "Account created. If email verification is enabled, confirm your email and then login.";
  });
}
