"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import TextAnalysisStats from "@/components/text-analysis-stats"
import TextAnalysisHeader from "@/components/text-analysis-header"
// import jsPDF from "jspdf";
// import "@/lib/pdf-worker"; 

export default function Home() {
  const [text, setText] = useState("")

  console.log(text);
  
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
        readingTimeMinutes: 0,
      }
    }

    // Word count
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0)
    const wordCount = words.length

    // Character counts
    const charCount = text.length
    // const charCountNoSpaces = text.replace(/\s/g, "").length

    // Sentence count
    // const sentenceCount = text.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0).length

    // Paragraph count
    // const paragraphCount = text.split(/\n\n+/).filter((para) => para.trim().length > 0).length

    // Most frequent word
    // const wordFrequency: Record<string, number> = {}
    // words.forEach((word) => {
    //   const cleanWord = word.toLowerCase().replace(/[^\w]/g, "")
    //   if (cleanWord.length > 0) {
    //     wordFrequency[cleanWord] = (wordFrequency[cleanWord] || 0) + 1
    //   }
    // })

    // const mostFrequentWord = Object.entries(wordFrequency).sort(([, a], [, b]) => b - a)[0]?.[0] || ""

    // Longest word
    // const longestWord = words.reduce((longest, current) => {
    //   const cleanCurrent = current.replace(/[^\w]/g, "")
    //   const cleanLongest = longest.replace(/[^\w]/g, "")
    //   return cleanCurrent.length > cleanLongest.length ? current : longest
    // }, "")

    // Average word length
    // const averageWordLength =
    //   wordCount > 0 ? Math.round((words.reduce((sum, word) => sum + word.length, 0) / wordCount) * 100) / 100 : 0

    // Reading time (average 200 words per minute)
    // const readingTimeMinutes = Math.ceil(wordCount / 200)

    return {
      wordCount,
      charCount,
      // charCountNoSpaces,
      // sentenceCount,
      // paragraphCount,
      // mostFrequentWord,
      // longestWord,
      // averageWordLength,
      // readingTimeMinutes,
    }
  }, [text])

  // const exportCSV = () => {
  // const rows = Object.entries(analysis)
  //     .map(([key, value]) => `${key},${value}`)
  //     .join("\n");

  //   const blob = new Blob([rows], { type: "text/csv" });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = "text-analysis.csv";
  //   a.click();
  //   URL.revokeObjectURL(url);
  // };

  // const exportPDF = () => {
  //   const doc = new jsPDF();

  //   doc.setFontSize(16);
  //   doc.text("Text Analysis Report", 10, 20);

  //   doc.setFontSize(12);
  //   let y = 40;

  //   Object.entries(analysis).forEach(([key, value]) => {
  //     doc.text(`${key}: ${value}`, 10, y);
  //     y += 10;
  //   });

  //   doc.save("text-analysis.pdf");
  // };

//   const handleFileUpload = (file: File) => {
//   const reader = new FileReader();
//   reader.onload = () => {
//     setText(reader.result as string);
//   };
//   reader.readAsText(file);
// };

// const handlePdfUpload = async (file: File) => {
//   const pdfjs = await import("pdfjs-dist/legacy/build/pdf");
//   const arrayBuffer = await file.arrayBuffer();
//   const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

//   let fullText = "";
//   for (let i = 1; i <= pdf.numPages; i++) {
//     const page = await pdf.getPage(i);
//     const content = await page.getTextContent();
//     fullText += content.items.map((item: any) => item.str).join(" ");
//     if (i < pdf.numPages) fullText += "\n\n";
//   }

//   setText(fullText);
// };

return (
  <main className="min-h-0 bg-gradient-to-br from-background via-background to-background pb-12">
    <div className="mx-auto px-10 py-8 md:py-10 max-w-6xl">
      <TextAnalysisHeader />

      {/* IMPORT + BUTTONS */}
      <div className="p-2">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button 
            //  onClick={exportCSV}
            >
            Export CSV
          </button>
          <button 
              // onClick={exportPDF}
            >
            Export PDF</button>

          <input
            // type="file"
            // accept=".txt,.csv,.pdf"
            // onChange={async (e) => {
            //   const file = e.target.files?.[0];
            //   if (!file) return;

            //   if (file.type === "text/plain" || file.name.endsWith(".csv")) {
            //     handleFileUpload(file);
            //   } else if (
            //     file.type === "application/pdf" ||
            //     file.name.endsWith(".pdf")
            //   ) {
            //     await handlePdfUpload(file);
            //   }
            // }}
            className="hidden"
            id="upload-file"
          />

          <label htmlFor="upload-file" className="button-ui-styles">
            Import File
          </label>
        </div>
      </div>

      {/* MAIN GRID — SAME HEIGHT BOTH SIDES */}
      <div className="grid gap-8 lg:grid-cols-3">

        {/* LEFT SIDE */}
        <div className="lg:col-span-1">
          <div>
            <TextAnalysisStats analysis={analysis} />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-2">
          <Card className="border border-border/50 bg-card shadow-lg">
            <div className="p-8 flex flex-col">

              <label className="mb-4 block">
                <span className="mb-2 block text-sm font-semibold text-foreground/80">
                  Paste or type your text here
                </span>

                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Start typing or paste your text here to analyze it..."
                  className="min-h-60  resize-none rounded-lg border border-border/30 bg-background/50 p-4 font-mono text-sm placeholder:text-foreground/40 focus:border-primary/50 focus:bg-background"
                />
              </label>

              {/* FOOTER OF CARD, STAYS AT BOTTOM */}
              <div className="mt-auto flex items-center justify-between pt-4">
                <p className="text-xs text-foreground/60">
                  {text.length} characters •{" "}
                  {
                    text
                      .trim()
                      .split(/\s+/)
                      .filter((w) => w.length > 0).length
                  }{" "}
                  words
                </p>

                {text.length > 0 && (
                  <button
                    onClick={() => setText("")}
                    className="rounded-md bg-destructive/10 px-3 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/20 transition-colors"
                  >
                    Clear
                  </button>
                )} 
              </div>

            </div>
          </Card>
        </div>

      </div>
    </div>
  </main>
);

}
