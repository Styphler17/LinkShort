# LinkShort

A simple, fast web tool to shorten long URLs into compact, shareable links.

## Features

- **URL Shortening**: Convert long URLs into short, shareable links
- **Copy to Clipboard**: One-click copying of shortened URLs
- **Local History**: Stores your recent shortened links in browser storage
- **Modern UI**: Clean, responsive design built with Tailwind CSS
- **No Backend Required**: Works entirely in the browser

## Tech Stack

- **Vite** - Fast build tool and development server
- **Alpine.js** - Lightweight JavaScript framework for interactivity
- **Tailwind CSS** - Utility-first CSS framework for styling

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd LinkShort
```

2. Install dependencies:

```bash
npm install
```

1. Start the development server:

```bash
npm run dev
```

1. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. Enter a long URL in the input field
2. Click "Shorten URL"
3. Copy the generated short link using the copy button
4. Your shortened links are automatically saved to your browser's local storage

## Project Structure

```text
LinkShort/
├── src/
│   ├── main.js          # Alpine.js app and functionality
│   └── style.css        # Tailwind CSS and custom styles
├── index.html           # Main HTML file
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Project dependencies and scripts
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
