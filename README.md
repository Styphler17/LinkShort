# LinkShort

A modern, fast web tool to shorten long URLs into compact, shareable links with a beautiful interface and local history tracking.

## Features

- **URL Shortening**: Convert long URLs into short, shareable links instantly
- **Working Redirects**: Generated short URLs actually redirect to the original destination
- **Copy to Clipboard**: One-click copying of shortened URLs with visual feedback
- **Local History**: Stores your recent shortened links in browser storage
- **Modern UI**: Clean, responsive design with dark/light theme support
- **Internationalization**: Support for English and French languages
- **No Backend Required**: Works entirely in the browser with client-side redirects
- **Responsive Design**: Optimized for desktop and mobile devices

## How It Works

LinkShort generates short URLs in the format `yourdomain.com/?r=abc1234`. When someone visits this URL:

1. The app checks for the `r` parameter
2. Looks up the original URL in your browser's local storage
3. Automatically redirects to the original destination
4. Shows a brief loading message during the redirect

**Note**: Since links are stored locally in your browser, they will only work on the same device/browser where they were created. This is perfect for personal use and sharing with yourself across devices.

## Tech Stack

- **Vite** - Fast build tool and development server
- **Alpine.js** - Lightweight JavaScript framework for interactivity
- **Tailwind CSS** - Utility-first CSS framework for styling
- **PostCSS** - CSS processing and optimization

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

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. Enter a long URL in the input field
2. Click "Shorten URL" to generate a short link
3. Copy the generated short link using the copy button
4. Share the link - it will redirect to the original URL when accessed
5. View your history in the right panel
6. Toggle between light/dark themes using the theme button
7. Switch languages using the language dropdown

## Project Structure

```text
LinkShort/
├── src/
│   ├── main.js          # Alpine.js app, stores, redirect logic, and functionality
│   └── style.css        # Tailwind CSS and custom styles
├── public/
│   ├── LinkShort-logo.png
│   ├── LinkShort-Favicon.png
│   └── locales/         # Internationalization files
│       ├── en.json
│       └── fr.json
├── index.html           # Main HTML file with semantic structure
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Project dependencies and scripts
```

## Design Features

- **Semantic HTML**: Proper use of `<header>`, `<main>`, `<section>`, and `<article>` elements
- **Accessibility**: ARIA labels, proper form labels, and keyboard navigation
- **Theme Support**: Dark and light mode with smooth transitions
- **Internationalization**: Multi-language support with easy locale switching
- **Responsive Layout**: Two-column grid layout that adapts to screen size
- **Modern Animations**: Subtle transitions and hover effects
- **Redirect Pages**: Clean loading and error pages for URL redirection

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
