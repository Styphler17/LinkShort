import Alpine from 'alpinejs'
import './style.css'

// --- Theme Store ---
Alpine.store('theme', {
  darkMode: localStorage.getItem('darkMode') === 'true',

  init() {
    this.toggle(this.darkMode);
  },

  toggle(on) {
    this.darkMode = on;
    localStorage.setItem('darkMode', this.darkMode);
    if (this.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
});

// --- Internationalization Store ---
Alpine.store('i18n', {
  locale: 'en',
  strings: {},

  async init() {
    await this.loadLocale(this.locale);
  },

  async loadLocale(locale) {
    try {
      const response = await fetch(`/locales/${locale}.json`);
      this.strings = await response.json();
      this.locale = locale;
      document.documentElement.lang = locale;
      document.title = this.strings.pageTitle || 'LinkShort';
    } catch (error) {
      console.error(`Failed to load locale '${locale}':`, error);
    }
  },

  t(key, fallback = '') {
    return key.split('.').reduce((obj, k) => (obj && obj[k] !== 'undefined') ? obj[k] : key, this.strings);
  }
});

// --- Ad Management Store ---
Alpine.store('ads', {
  enabled: true,
  
  // Track ad impressions
  trackImpression(spot) {
    if (!this.enabled) return;
    
    const impressions = JSON.parse(localStorage.getItem('adImpressions') || '{}');
    impressions[spot] = (impressions[spot] || 0) + 1;
    localStorage.setItem('adImpressions', JSON.stringify(impressions));
    
    // Send to analytics (you can replace with your own tracking)
    console.log(`Ad impression: ${spot}`);
  },
  
  // Track ad clicks
  trackClick(spot) {
    if (!this.enabled) return;
    
    const clicks = JSON.parse(localStorage.getItem('adClicks') || '{}');
    clicks[spot] = (clicks[spot] || 0) + 1;
    localStorage.setItem('adClicks', JSON.stringify(clicks));
    
    console.log(`Ad click: ${spot}`);
  },
  
  // Get ad stats
  getStats() {
    const impressions = JSON.parse(localStorage.getItem('adImpressions') || '{}');
    const clicks = JSON.parse(localStorage.getItem('adClicks') || '{}');
    
    return {
      impressions,
      clicks,
      totalImpressions: Object.values(impressions).reduce((a, b) => a + b, 0),
      totalClicks: Object.values(clicks).reduce((a, b) => a + b, 0)
    };
  }
});

// --- Redirect Handler ---
function handleRedirect() {
  const urlParams = new URLSearchParams(window.location.search);
  const redirectCode = urlParams.get('r');
  
  if (redirectCode) {
    const history = JSON.parse(localStorage.getItem('linkShortHistory') || '[]');
    const link = history.find(item => item.shortCode === redirectCode);
    
    if (link) {
      // Track redirect
      const redirects = JSON.parse(localStorage.getItem('redirectStats') || '{}');
      redirects[redirectCode] = (redirects[redirectCode] || 0) + 1;
      localStorage.setItem('redirectStats', JSON.stringify(redirects));
      
      // Show redirect page with Auto Ads
      document.body.innerHTML = `
        <!doctype html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Redirecting - LinkShort</title>
          
          <!-- Google AdSense Auto Ads -->
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID" crossorigin="anonymous"></script>
          <script>
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "ca-pub-YOUR_PUBLISHER_ID",
              enable_page_level_ads: true
            });
          </script>
          
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 0; }
            .container { max-width: 800px; margin: 0 auto; padding: 20px; }
            .card { background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 40px; text-align: center; }
            .btn { display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 6px; margin: 8px; }
            .btn-secondary { background: #6b7280; }
            .url { word-break: break-all; color: #6b7280; margin: 20px 0; }
            .icon { width: 64px; height: 64px; margin: 0 auto 20px; color: #3b82f6; }
            .dark { background: #1f2937; color: white; }
            .dark .card { background: #374151; }
            .dark .btn-secondary { background: #4b5563; }
            .dark .url { color: #9ca3af; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="card">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
              <h1 style="font-size: 2rem; font-weight: bold; margin-bottom: 1rem;">Redirecting to...</h1>
              <p class="url">${link.original}</p>
              <div style="margin: 2rem 0;">
                <a href="${link.original}" class="btn">Continue Now</a>
                <button onclick="window.history.back()" class="btn btn-secondary">Go Back</button>
              </div>
              <div style="margin-top: 2rem; padding: 1rem; background: #f3f4f6; border-radius: 8px;">
                <h3 style="margin: 0 0 0.5rem 0; font-weight: 600;">About LinkShort</h3>
                <p style="margin: 0; font-size: 0.9rem; color: #6b7280;">
                  LinkShort is a free URL shortening service that helps you create clean, shareable links instantly.
                </p>
              </div>
            </div>
          </div>
          
          <!-- Auto Ads will be placed automatically by Google -->
        </body>
        </html>
      `;
      
      // Redirect after 5 seconds (more time for ads)
      setTimeout(() => {
        window.location.href = link.original;
      }, 5000);
      
      return true; // Indicates we're handling a redirect
    } else {
      // Show error page for invalid code
      document.body.innerHTML = `
        <!doctype html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Invalid Link - LinkShort</title>
          
          <!-- Google AdSense Auto Ads -->
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID" crossorigin="anonymous"></script>
          <script>
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "ca-pub-YOUR_PUBLISHER_ID",
              enable_page_level_ads: true
            });
          </script>
          
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 0; background: #f3f4f6; }
            .container { max-width: 500px; margin: 100px auto; padding: 20px; }
            .card { background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 40px; text-align: center; }
            .btn { display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 6px; }
            .icon { width: 64px; height: 64px; margin: 0 auto 20px; color: #ef4444; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="card">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
              <h1 style="font-size: 2rem; font-weight: bold; margin-bottom: 1rem; color: #ef4444;">Invalid or Expired Link</h1>
              <p style="margin-bottom: 2rem; color: #6b7280;">
                This shortened URL doesn't exist or has expired.
              </p>
              <a href="/" class="btn">Go back to LinkShort</a>
            </div>
          </div>
          
          <!-- Auto Ads will be placed automatically by Google -->
        </body>
        </html>
      `;
      return true; // Indicates we're handling a redirect (error case)
    }
  }
  
  return false; // No redirect to handle
}

// --- Main App Component ---
Alpine.data('linkShort', () => ({
  longUrl: '',
  shortUrl: '',
  isGenerating: false,
  isCopied: false,
  history: [],
  
  init() {
    this.history = JSON.parse(localStorage.getItem('linkShortHistory') || '[]');
  },
  
  generateShortUrl() {
    if (!this.longUrl.trim()) return;
    this.isGenerating = true;
    
    setTimeout(() => {
      const shortCode = this.generateShortCode();
      this.shortUrl = `${window.location.origin}/?r=${shortCode}`;
      
      this.history.unshift({
        id: Date.now(),
        original: this.longUrl,
        short: this.shortUrl,
        shortCode: shortCode,
        createdAt: new Date().toISOString()
      });
      
      this.saveHistory();
      this.isGenerating = false;
      this.longUrl = '';
    }, 1000);
  },
  
  generateShortCode() {
    return Math.random().toString(36).substr(2, 7);
  },
  
  copyToClipboard(textToCopy) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      this.isCopied = true;
      setTimeout(() => this.isCopied = false, 2000);
    });
  },
  
  saveHistory() {
    this.history = this.history.slice(0, 10);
    localStorage.setItem('linkShortHistory', JSON.stringify(this.history));
  },
  
  clearHistory() {
    this.history = [];
    localStorage.removeItem('linkShortHistory');
  },
  
  isValidUrl(string) {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  },
  
  // Ad management methods
  toggleAds() {
    this.$store.ads.enabled = !this.$store.ads.enabled;
    localStorage.setItem('adsEnabled', this.$store.ads.enabled);
  },
  
  getAdStats() {
    return this.$store.ads.getStats();
  }
}))

// --- Start Alpine ---
window.Alpine = Alpine;

// Check for redirects before starting Alpine
if (!handleRedirect()) {
  Alpine.start();
}
