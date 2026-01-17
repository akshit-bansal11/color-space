# Akshit's Color Space

Akshit's Color Space is a comprehensive, all-in-one web application designed for designers and developers. It provides a full suite of tools to create, browse, extract, and convert colors and gradients, all in one centralized hub.

### ✨ **Live Demo:** [color-space-akshit-bansal11.vercel.app](https://color-space-akshit-bansal11.vercel.app/)

---

## Key Features

This application combines six major utilities into one seamless experience:

- **Creator:** Visually design and build your own custom color palettes and multi-step gradients from scratch.
- **Blocks:** Get inspired by browsing a massive, filterable grid of individual color blocks.
- **Palettes:** Explore a curated library of beautiful, pre-built color palettes suitable for any project.
- **Gradients:** Browse a grand library of stunning gradients, filterable by mood.
- **Extractor (AI):** Utilize the Gemini API to automatically extract a complete color palette from any uploaded image. (Requires user's Gemini API Key)
- **Converter:** Instantly convert color codes between **HEX**, **RGB**, and **HSL**. Also converts gradient definitions between **Vanilla CSS** and **Tailwind CSS** classes.

---

## Tech Stack

This project is built using a modern frontend stack:

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Core:** [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/)
- **AI:** [Google Gemini API](https://ai.google.dev/) (for the Extractor feature)
- **Package Manager:** [pnpm](https://pnpm.io/)

---

## Running Locally (For Developers)

Want to run the project on your local machine? Follow these simple steps.

### 1\. Prerequisites

Make sure you have [Node.js](https://nodejs.org/en/) (v18 or higher recommended) and `pnpm` installed on your machine.

### 2\. Installation & Setup

**1. Clone the repository:**

```bash
git clone https://github.com/akshit-bansal11/color-space.git
cd color-space
```

**2. Install dependencies:**

```bash
pnpm install
```

**3. Run the development server:**
This command will start the Next.js development server, typically on `http://localhost:3000`.

```bash
pnpm dev
# or
pnpm run dev
```

You can now open the app in your browser and start building\!

---

## Project Folder Structure

A high-level overview of the project's structure.

```
color-space/
├── public/               # Static assets (images, SVGs)
└── src/
    ├── app/              # Next.js App Router pages & layout
    │   ├── layout.tsx    # Root layout
    │   ├── page.tsx      # Home page
    │   └── globals.css   # Global styles
    ├── components/       # Reusable UI components
    │   ├── views/        # Main feature views (Creator, Blocks, etc.)
    │   ├── form/         # Form elements (Input, Select)
    │   └── ...
    ├── data/             # Static data (palettes, gradients)
    ├── hooks/            # Custom React hooks
    └── utils/            # Utility/helper functions
├── .gitignore
├── next.config.ts        # Next.js configuration
├── package.json
├── README.md             # This file
├── tailwind.config.ts    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```
