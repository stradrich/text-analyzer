"use client";

import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import TextAnalysisStats from "@/components/text-analysis-stats";
import TextAnalysisHeader from "@/components/text-analysis-header";
import { useTextAnalysis } from "@/lib/useTextAnalysis";
import "@/lib/pdf-worker";

export default function Home() {
  const {
    text,
    setText,
    analysis,
    exportCSV,
    exportPDF,
    handleFileUpload,
    handlePdfUpload,
  } = useTextAnalysis();

  return (
    <main className="min-h-0 pb-12 bg-gradient-to-br from-background via-background to-background">
      <div className="mx-auto max-w-6xl px-10 py-8 md:py-10">

        <TextAnalysisHeader />

        {/* IMPORT + BUTTONS */}
        <div className="p-2">
          <div className="mb-6 flex flex-wrap items-center gap-3">

            <button onClick={exportCSV}>Export CSV</button>
            <button onClick={exportPDF}>Export PDF</button>

            <input
              id="upload-file"
              type="file"
              accept=".txt,.csv,.pdf"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                if (file.type === "text/plain" || file.name.endsWith(".csv")) {
                  handleFileUpload(file);
                } else if (file.type === "application/pdf") {
                  await handlePdfUpload(file);
                }
              }}
            />
            <label htmlFor="upload-file" className="button-ui-styles">
              Import File
            </label>

          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-8 lg:grid-cols-3">

          <div className="lg:col-span-1">
            <TextAnalysisStats analysis={analysis} />
          </div>

          <div className="lg:col-span-2">
            <Card className="border border-border/50 bg-card shadow-lg">
              <div className="flex flex-col p-8">

                <label className="mb-4 block">
                  <span className="mb-2 block text-sm font-semibold text-foreground/80">
                    Paste or type your text here
                  </span>

                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Start typing or paste your text..."
                    className="h-55 overflow-y-auto resize-none rounded-lg border border-border/30 bg-background/50 p-4 font-mono text-sm placeholder:text-foreground/40 focus:border-primary/50"
                  />
                </label>

                <div className="mt-auto flex items-center justify-between pt-4">
                  <p className="text-xs text-foreground/60">
                    {text.length} characters •{" "}
                    {text.trim().split(/\s+/).filter(Boolean).length} words
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
