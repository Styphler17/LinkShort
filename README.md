# LinkShort

A modern, fast web tool to shorten long URLs into compact, shareable links with a beautiful interface, local history tracking, and Google AdSense Auto Ads monetization.

## Features

- **URL Shortening**: Convert long URLs into short, shareable links instantly
- **Working Redirects**: Generated short URLs actually redirect to the original destination
- **Copy to Clipboard**: One-click copying of shortened URLs with visual feedback
- **Local History**: Stores your recent shortened links in browser storage
- **Modern UI**: Clean, responsive design with dark/light theme support
- **Internationalization**: Support for English and French languages
- **Google AdSense Auto Ads**: Automatic ad placement for maximum revenue
- **No Backend Required**: Works entirely in the browser with client-side redirects
- **Responsive Design**: Optimized for desktop and mobile devices

## 🤑 Monetization Strategy

LinkShort uses **Google AdSense Auto Ads** for optimal revenue generation:

### Auto Ads Benefits:
- **Automatic Placement**: Google AI places ads in optimal positions
- **Smart Optimization**: Continuously improves performance based on user behavior
- **User Experience**: Balances revenue with excellent user experience
- **Mobile Optimized**: Automatically adapts to all screen sizes
- **Multiple Formats**: Display ads, in-article ads, in-feed ads, and more

### Revenue Potential:
| Monthly Page Views | Estimated Monthly Revenue |
|-------------------|---------------------------|
| 1,000 | $15-75 |
| 10,000 | $150-750 |
| 100,000 | $1,500-7,500 |
| 1,000,000 | $15,000-75,000 |

## 🌐 Domain & Subdomain Support

### AdSense Subdomain Support ✅

**Yes, Google AdSense supports subdomains!** Here's what you need to know:

#### ✅ What Works:
- **Your own domain subdomains** (e.g., `linkshort.yourdomain.com`)
- **Same publisher ID** across all subdomains
- **Multiple subdomains** under one AdSense account

#### ❌ What Doesn't Work:
- **Google Sites subdomains** (limited AdSense support)
- **Free hosting service subdomains** (blogspot, wordpress.com, etc.)
- **Subdomains without proper domain ownership**

#### 🚀 Recommended Setup:
1. **Use your own domain** (not Google Sites)
2. **Deploy to proper hosting** (Netlify, Vercel, GitHub Pages)
3. **Apply for AdSense** with main domain first
4. **Add subdomain** after approval
5. **Use same publisher ID** for all subdomains

**📖 See [Subdomain AdSense Guide](docs/Subdomain-AdSense-Guide.md) for detailed setup instructions.**

## How It Works

LinkShort generates short URLs in the format `yourdomain.com/?r=abc1234`. When someone visits this URL:

1. The app checks for the `r` parameter
2. Looks up the original URL in your browser's local storage
3. Shows a redirect page with Auto Ads for 5 seconds
4. Automatically redirects to the original destination
5. Google Auto Ads optimize placement for maximum revenue

**Note**: Since links are stored locally in your browser, they will only work on the same device/browser where they were created. This is perfect for personal use and sharing with yourself across devices.

## Tech Stack

- **Vite** - Fast build tool and development server
- **Alpine.js** - Lightweight JavaScript framework for interactivity
- **Tailwind CSS** - Utility-first CSS framework for styling
- **PostCSS** - CSS processing and optimization
- **Google AdSense Auto Ads** - Automatic ad monetization

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

## 🚀 Auto Ads Setup (10 Minutes)

### Step 1: Get AdSense Publisher ID
1. Sign up for Google AdSense at [adsense.google.com](https://adsense.google.com)
2. Wait for approval (1-2 weeks)
3. Get your publisher ID (format: `ca-pub-XXXXXXXXXX`)

### Step 2: Update Code
Replace `YOUR_PUBLISHER_ID` in `index.html` with your actual AdSense publisher ID:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID" crossorigin="anonymous"></script>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: "ca-pub-YOUR_PUBLISHER_ID",
    enable_page_level_ads: true
  });
</script>
```

### Step 3: Enable Auto Ads
1. Log into your AdSense account
2. Go to **Ads** → **By ad unit** → **Auto ads**
3. Enable desired ad formats (Display ads, In-article ads, etc.)
4. Save settings

**That's it!** Google will automatically place and optimize ads for maximum revenue.

## Usage

1. Enter a long URL in the input field
2. Click "Shorten URL" to generate a short link
3. Copy the generated short link using the copy button
4. Share the link - it will show Auto Ads before redirecting to the original URL
5. View your history in the right panel
6. Toggle between light/dark themes using the theme button
7. Switch languages using the language dropdown

## Project Structure

```text
LinkShort/
├── src/
│   ├── main.js          # Alpine.js app, stores, redirect logic, ad management
│   └── style.css        # Tailwind CSS and custom styles
├── public/
│   ├── LinkShort-logo.png
│   ├── LinkShort-Favicon.png
│   └── locales/         # Internationalization files
│       ├── en.json
│       └── fr.json
├── docs/
│   ├── Monetization-Guide.md      # Complete monetization strategy
│   └── Quick-Start-Monetization.md # 10-minute Auto Ads setup
├── index.html           # Main HTML file with Auto Ads integration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Project dependencies and scripts
```

## Design Features

- **Semantic HTML**: Proper use of `<header>`, `<main>`, `<section>`, and `<article>` elements
- **Accessibility**: ARIA labels, proper form labels, and keyboard navigation
- **Theme Support**: Dark and light mode with smooth transitions
- **Internationalization**: Multi-language support with easy locale switching
- **Responsive Layout**: Clean two-column grid layout
- **Modern Animations**: Subtle transitions and hover effects
- **Redirect Pages**: Auto Ads optimized redirect pages with 5-second delay
- **Auto Ads Integration**: Google's AI-powered ad optimization

## Revenue Optimization Tips

### 1. Traffic Generation
- **SEO Optimization**: Target keywords like "URL shortener", "link shortener"
- **Social Media**: Share on Twitter, LinkedIn, Reddit
- **Content Marketing**: Write blog posts about URL shortening
- **Email Marketing**: Include shortened links in newsletters

### 2. Auto Ads Optimization
- **Trust Google's AI**: Let Auto Ads optimize automatically
- **Focus on Content**: Better content = more engaged users = better ad performance
- **Monitor Performance**: Check AdSense dashboard regularly
- **Be Patient**: Auto Ads improve over time with more data

### 3. Analytics and Tracking
- **Google Analytics**: Track user behavior and traffic sources
- **AdSense Dashboard**: Monitor ad performance and revenue
- **Conversion Tracking**: Track clicks and user engagement
- **A/B Testing**: Let Google handle optimization automatically

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Disclaimer

This application includes Google AdSense Auto Ads. Users should be aware that:
- Redirect pages display advertisements
- User data may be collected for analytics purposes
- Ad networks may use cookies for tracking
- Revenue generation depends on traffic volume and Auto Ads optimization
- Google Auto Ads automatically balance revenue with user experience
