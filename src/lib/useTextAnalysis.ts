"use client";

import { useState, useMemo } from "react";
import jsPDF from "jspdf";

export function useTextAnalysis() {
  const [text, setText] = useState("");

  const analysis = useMemo(() => {
    if (!text.trim()) {
      return {
        wordCount: 0,
        charCount: 0,
        charCountNoSpaces: 0,
        sentenceCount: 0,
        paragraphCount: 0,
        mostFrequentWord: "",
        longestWord: "",
        averageWordLength: 0,
      };
    }

    const words = text.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    const charCount = text.length;
    const charCountNoSpaces = text.replace(/\s/g, "").length;

    const sentenceCount = text
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 0).length;

    const paragraphCount = text
      .split(/\n\n+/)
      .filter((p) => p.trim().length > 0).length;

    const wordFrequency: Record<string, number> = {};
    words.forEach((word) => {
      const w = word.toLowerCase().replace(/[^\w]/g, "");
      if (w) wordFrequency[w] = (wordFrequency[w] || 0) + 1;
    });

    const mostFrequentWord =
      Object.entries(wordFrequency).sort((a, b) => b[1] - a[1])[0]?.[0] || "";

    const longestWord = words.reduce((longest, current) =>
      current.replace(/[^\w]/g, "").length >
      longest.replace(/[^\w]/g, "").length
        ? current
        : longest
    , "");

    const averageWordLength =
      wordCount > 0
        ? Math.round(
            (words.reduce((n, w) => n + w.length, 0) / wordCount) * 100
          ) / 100
        : 0;

    return {
      wordCount,
      charCount,
      charCountNoSpaces,
      sentenceCount,
      paragraphCount,
      mostFrequentWord,
      longestWord,
      averageWordLength,
    };
  }, [text]);

  /** EXPORT CSV */
  const exportCSV = () => {
    const rows = Object.entries(analysis)
      .map(([key, value]) => `${key},${value}`)
      .join("\n");

    const blob = new Blob([rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "text-analysis.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  /** EXPORT PDF */
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Text Analysis Report", 10, 20);

    doc.setFontSize(12);
    let y = 40;

    Object.entries(analysis).forEach(([key, value]) => {
      doc.text(`${key}: ${value}`, 10, y);
      y += 10;
    });

    doc.save("text-analysis.pdf");
  };

  /** FILE IMPORT (TXT, CSV) */
  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setText(reader.result as string);
    reader.readAsText(file);
  };

  /** IMPORT PDF */
  const handlePdfUpload = async (file: File) => {
    const pdfjs = await import("pdfjs-dist/legacy/build/pdf");
    const buffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: buffer }).promise;

    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      fullText += content.items.map((i: any) => i.str).join(" ");
      if (i < pdf.numPages) fullText += "\n\n";
    }

    setText(fullText);
  };

  return {
    text,
    setText,
    analysis,
    exportCSV,
    exportPDF,
    handleFileUpload,
    handlePdfUpload,
  };
}
