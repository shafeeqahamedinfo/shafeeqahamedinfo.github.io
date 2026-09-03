(function () {
  const getCertificateById = window.PortfolioData ? window.PortfolioData.getCertificateById : async () => null;

  function getIdFromQuery() {
    const params = new URLSearchParams(window.location.search);
    return Number(params.get("id") || 0);
  }

  function renderNotFound() {
    const titleEl = document.getElementById("certificateTitle");
    if (titleEl) titleEl.textContent = "Certificate not found";
    const sumEl = document.getElementById("certificateSummary");
    if (sumEl) sumEl.textContent = "The selected certificate does not exist.";
    const descEl = document.getElementById("certificateDescription");
    if (descEl) descEl.textContent = "Please go back and select another certificate.";
  }

  async function init() {
    const id = getIdFromQuery();
    if (!id) {
      renderNotFound();
      return;
    }

    const certificate = await getCertificateById(id);
    if (!certificate) {
      renderNotFound();
      return;
    }

    document.title = `${certificate.title} | Certificate Details`;
    const titleEl = document.getElementById("certificateTitle");
    if (titleEl) titleEl.textContent = certificate.title;
    const sumEl = document.getElementById("certificateSummary");
    if (sumEl) sumEl.textContent = certificate.summary || "";
    const descEl = document.getElementById("certificateDescription");
    if (descEl) descEl.textContent = certificate.description || "No details available.";

    const imageEl = document.getElementById("certificateImage");
    if (imageEl) {
      imageEl.src = certificate.image_url || "assets/images/certificate-placeholder.svg";
      imageEl.decoding = "async";
    }

    const issuedByEl = document.getElementById("issuedBy");
    if (issuedByEl) issuedByEl.textContent = certificate.issued_by || "-";

    const issuedOnEl = document.getElementById("issuedOn");
    if (issuedOnEl) issuedOnEl.textContent = certificate.issued_on || "-";

    const certificateLink = document.getElementById("certificateLink");
    if (certificateLink) certificateLink.href = certificate.certificate_url || "#";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
