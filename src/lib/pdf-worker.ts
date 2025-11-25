// src/lib/pdf-worker.ts
if (typeof window !== "undefined") {
  const pdfjs = require("pdfjs-dist/legacy/build/pdf");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
}
