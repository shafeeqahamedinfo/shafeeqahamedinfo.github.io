(function () {
  const getPortfolioData = window.PortfolioData ? window.PortfolioData.getPortfolioData : async () => ({});
  const saveContactMessage = window.PortfolioData ? window.PortfolioData.saveContactMessage : async () => ({ success: true });
  const renderSkills = window.renderSkills || function () {};

  function getEl(id) {
    return document.getElementById(id);
  }

  function setupRevealAnimations() {
    const elements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.01 }
    );

    elements.forEach((el) => observer.observe(el));
    setTimeout(() => {
      elements.forEach((el) => el.classList.add("visible"));
    }, 500);
  }

  function setupContactForm() {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");

    if (!form || !status) return;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const payload = {
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        subject: String(formData.get("subject") || "").trim(),
        message: String(formData.get("message") || "").trim()
      };

      if (!payload.name || !payload.email || !payload.message) {
        status.style.color = "#ef4444";
        status.textContent = "Please fill in all required fields (Name, Email, and Message).";
        return;
      }

      status.style.color = "var(--accent)";
      status.textContent = "Sending your message to Shafeeq Ahamed...";

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        const json = await response.json();

        if (response.status === 200 && json.success) {
          status.style.color = "#22c55e";
          status.textContent = "Thank you! Your message has been sent successfully to Shafeeq Ahamed.";
          form.reset();
          saveContactMessage(payload);
        } else {
          status.style.color = "#ef4444";
          status.textContent = json.message || "Failed to submit message via Web3Forms.";
          saveContactMessage(payload);
        }
      } catch (error) {
        status.style.color = "#ef4444";
        status.textContent = "Network connection issue. Message saved locally.";
        saveContactMessage(payload);
      }
    });
  }

  async function init() {
    setupRevealAnimations();
    setupContactForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
