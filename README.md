Text Analyzer — React/Next.js Application

<video src="https://github.com/user-attachments/assets/ffb2733f-f014-42d7-a530-8ebe68af15eb" controls></video>
<video src="https://github.com/user-attachments/assets/be27e8d2-0e09-4125-b2b5-b22f7ea6bce4" controls></video>

A modern, responsive Text Analysis Tool built with React.js (Next.js) for the Offline Coding Challenge.
It allows users to paste or type text and instantly see analysis such as word count, character count, sentence count, paragraphs, longest word, most frequent word, and more.

This project was created using Next.js App Router and styled with TailwindCSS + shadcn/ui.

Features
Core Text Analysis

Word Count
Character Count (with spaces)
Character Count (without spaces)
Sentence Count
Paragraph Count
Most Frequent Word
Longest Word
Average Word Length
Estimated Reading Time

User Interface

Clean, minimal, responsive design
Two-panel layout (input + stats)
Multiline scrollable input area
Real-time analysis updates as the user types

Performance

Efficient O(n) text analysis
Handles large inputs smoothly
Analysis extracted into a reusable hook: useTextAnalysis.ts

Code Quality

Component-based architecture
Organized folder structure (components, lib, types)
Typed with TypeScript
Comments and clear logic

Project Structure
```
/Users/xxx/Desktop/text-analyzer/
├── .gitignore
├─] .next/ (ignored)
├── README.md
├── components.json
├── eslint.config.mjs
├─] next-env.d.ts (ignored)
├── next.config.ts
├─] node_modules/ (ignored)
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public/
│   ├── pdf.worker.min.mjs
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── text-analysis-header.tsx
│   │   ├── text-analysis-stats.tsx
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── separator.tsx
│   │       └── textarea.tsx
│   ├── lib/
│   │   ├── pdf-worker.ts
│   │   ├── useTextAnalysis.ts
│   │   └── utils.ts
│   └── types/
│       └── pdfjs-worker.d.ts
└── tsconfig.json
```

Getting Started

Install dependencies:
npm install
or
yarn install

Run the development server:
npm run dev
or
yarn dev

Then open:
http://localhost:3000
The app will auto-reload on file changes.


How It Works (Approach)
1. Text Analysis Logic

All calculations are done inside:

src/lib/useTextAnalysis.ts

This hook:

Receives the raw text
Normalizes casing
Removes punctuation where necessary
Performs all analytics in a single pass where possible
Returns an object consumed by UI components
This separation keeps the UI clean and improves testability.

2. UI + Responsiveness

Built with React Server Components (Next.js App Router)
Layout is fully responsive using Tailwind’s grid and flex utilities
Input automatically scrolls on overflow
Stats are displayed in reusable StatCard components

3. Performance Considerations

No expensive nested loops
No heavy regex
All operations are O(n)
Designed to handle large pasted text (articles, essays, reports)


Optional Features Planned (Not Implemented)

Sentiment Analysis
Docker Deployment
Unit Tests

Building for Production
npm run build
npm start

Deployment

You can deploy this project easily on:
Vercel (recommended for Next.js)
Netlify
Docker
