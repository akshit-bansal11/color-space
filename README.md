# Akshit's Color Space

[](https://opensource.org/licenses/MIT)
[](https://reactjs.org/)
[](https://vitejs.dev/)
[](https://tailwindcss.com/)

Akshit's Color Space is a comprehensive, all-in-one web application designed for designers and developers. It provides a full suite of tools to create, browse, extract, and convert colors and gradients, all in one centralized hub.

### ✨ **Live Demo:** [color-space-akshit-bansal11.vercel.app](https://color-space-akshit-bansal11.vercel.app/)

*(Optional: Consider adding a screenshot or GIF of the app in action here\!)*
\`\`

-----

## 🚀 Key Features

This application combines six major utilities into one seamless experience:

  * **Creator:** Visually design and build your own custom color palettes and multi-step gradients from scratch.
  * **Blocks:** Get inspired by browsing a massive, filterable grid of individual color blocks.
  * **Palettes:** Explore a curated library of beautiful, pre-built color palettes suitable for any project.
  * **Gradients:** Browse a grand library of stunning gradients, filterable by mood and color.
  * **Extractor (AI):** Utilize the Gemini API to automatically extract a complete color palette from any uploaded image.
  * **Converter:** Instantly convert color codes between **HEX**, **RGB**, and **HSL**. Also converts gradient definitions between **Vanilla CSS** and **Tailwind CSS** classes.

-----

## 🛠️ Tech Stack

This project is built using a modern frontend stack:

  * **Framework:** [React.js](https://reactjs.org/)
  * **Build Tool:** [Vite](https://vitejs.dev/)
  * **Styling:** [Tailwind CSS](https://tailwindcss.com/)
  * **AI:** [Google Gemini API](https://ai.google.dev/) (for the Extractor feature)

-----

## 🔧 Running Locally (For Developers)

Want to run the project on your local machine? Follow these simple steps.

### 1\. Prerequisites

Make sure you have [Node.js](https://nodejs.org/en/) (v18 or higher recommended) and `npm` installed on your machine.

### 2\. Installation & Setup

**1. Clone the repository:**

```bash
git clone https://github.com/your-username/color-space.git
cd color-space
```

**2. Install dependencies:**

```bash
npm install
```

**3. Set up environment variables:**
This project requires a Google Gemini API key to power the "Extractor" feature.

  * Create a new file named `.env` in the root of the project.
  * Add your API key to it as shown below:

<!-- end list -->

```.env
VITE_GEMINI_API_KEY="<your_gemini_api_key_goes_here>"
```

**4. Run the development server:**
This command will start the Vite server, typically on `http://localhost:5173`.

```bash
npm run dev
```

You can now open the app in your browser and start building\!

-----

## 📁 Project Folder Structure

A high-level overview of the project's structure.

```
color-space/
├── public/               # Static assets
└── src/
    ├── assets/           # Images, SVGs, fonts
    ├── data/             # Static data (e.g., JSON for palettes)
    ├── hooks/            # Custom React hooks
    ├── pages/            # Main application views/components
    ├── shared/           # Reusable UI components (buttons, inputs)
    ├── styles/           # Global CSS (index.css)
    ├── utils/            # Utility/helper functions
    ├── App.jsx           # Main app component
    ├── Colors.jsx        # (Specific components)
    └── main.jsx          # Main React entry point
├── .env                  # Environment variables (private)
├── .gitignore
├── index.html            # HTML entry point
├── package.json
├── README.md             # This file
├── tailwind.config.js    # Tailwind configuration
└── vite.config.js        # Vite configuration
```