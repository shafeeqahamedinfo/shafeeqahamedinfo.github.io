import { getCertificateById } from "./dataService.js";

function getIdFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("id") || 0);
}

function renderNotFound() {
  document.getElementById("certificateTitle").textContent = "Certificate not found";
  document.getElementById("certificateSummary").textContent = "The selected certificate does not exist.";
  document.getElementById("certificateDescription").textContent = "Please go back and select another certificate.";
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
  document.getElementById("certificateTitle").textContent = certificate.title;
  document.getElementById("certificateSummary").textContent = certificate.summary || "";
  document.getElementById("certificateDescription").textContent = certificate.description || "No details available.";
  const imageEl = document.getElementById("certificateImage");
  imageEl.src = certificate.image_url || "assets/images/certificate-placeholder.svg";
  imageEl.decoding = "async";
  document.getElementById("issuedBy").textContent = certificate.issued_by || "-";
  document.getElementById("issuedOn").textContent = certificate.issued_on || "-";

  const certificateLink = document.getElementById("certificateLink");
  certificateLink.href = certificate.certificate_url || "#";
}

init();
