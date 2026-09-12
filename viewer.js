(function () {
  "use strict";
  const params = new URLSearchParams(location.search);
  const doc = (window.ENGLISH_101_DOCUMENTS || []).find((item) => item.id === params.get("id"));
  const frame = document.getElementById("document-frame");
  const message = document.getElementById("viewer-message");
  if (!doc) {
    frame.hidden = true; message.hidden = false;
    document.getElementById("viewer-error").textContent = "Tài liệu không tồn tại hoặc đường dẫn đã thay đổi.";
    return;
  }
  document.title = `${doc.title} — English 101`;
  document.getElementById("viewer-title").textContent = doc.title;
  document.getElementById("viewer-meta").textContent = `${doc.category} · ${doc.type}`;
  const original = document.getElementById("open-original");
  original.href = doc.path;
  const download = document.getElementById("download-file");
  if (doc.downloadable) { download.href = doc.path; download.hidden = false; }
  if (["PDF", "HTML"].includes(doc.type)) {
    frame.src = doc.path;
  } else if (["WORD", "DOC", "DOCX"].includes(doc.type.toUpperCase())) {
    if (location.protocol === "http:" || location.protocol === "https:") frame.src = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(new URL(doc.path, location.href).href)}`;
    else { frame.hidden = true; message.hidden = false; document.getElementById("viewer-error").textContent = "File Word cần website đã deploy để Office Viewer có thể đọc trực tiếp. Hãy mở bản PDF thay thế hoặc mở file trong tab mới."; }
  } else if (doc.type === "Link") {
    location.replace(doc.path);
  } else {
    frame.src = doc.path;
  }
}());
