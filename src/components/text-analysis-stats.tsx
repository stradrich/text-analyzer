import { Card } from "@/components/ui/card"

interface AnalysisResult {
  wordCount: number
  charCount: number
  charCountNoSpaces: number
  sentenceCount: number
  paragraphCount: number
  mostFrequentWord: string
  longestWord: string
  averageWordLength: number
  // readingTimeMinutes: number
}

interface Props {
  analysis: AnalysisResult
}

const StatCard = ({
  label,
  value,
  subtext,
}: {
  label: string
  value: string | number
  subtext?: string
}) => (
  <div className="rounded-lg border border-border/30 bg-background/50 p-4 backdrop-blur-sm">
    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-foreground/60">{label}</p>
    <p className="text-2xl font-bold text-primary">{value}</p>
    {subtext && <p className="mt-1 text-xs text-foreground/50">{subtext}</p>}
  </div>
)

export default function TextAnalysisStats({ analysis }: Props) {
  return (
    <Card className="border border-border/50 bg-card shadow-2xl max-h-[430px] overflow-y-auto">
      <div className="p-5">
        <h2 className="mb-5 text-lg font-semibold text-foreground">Statistics</h2>
        <div className="space-y-3">
          <StatCard label="Words" value={analysis.wordCount} />
          <StatCard label="Characters" value={analysis.charCount} />
          <StatCard label="Characters (No Spaces)" value={analysis.charCountNoSpaces} />
          <StatCard label="Sentences" value={analysis.sentenceCount} />
          <StatCard label="Paragraphs" value={analysis.paragraphCount} />

          <div className="my-4 border-t border-border/20" />

          <StatCard label="Average Word Length" value={analysis.averageWordLength} subtext="characters per word" />
          {/* <StatCard
            label="Reading Time"
            value={`${analysis.readingTimeMinutes} min`}
            subtext="at 200 words/minute"
          /> */}

          <div className="my-4 border-t border-border/20" />

          <div className="space-y-3">
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-foreground/60">
                Most Frequent Word
              </p>
              <p className="truncate rounded bg-primary/10 px-3 py-2 font-mono text-sm font-medium text-primary">
                {analysis.mostFrequentWord || "N/A"}
              </p>
            </div>

            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-foreground/60">
                Longest Word
              </p>
              <p className="truncate rounded px-3 py-2 font-mono text-sm font-medium">
                {analysis.longestWord || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
