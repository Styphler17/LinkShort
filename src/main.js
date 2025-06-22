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

// --- Redirect Handler ---
function handleRedirect() {
  const urlParams = new URLSearchParams(window.location.search);
  const redirectCode = urlParams.get('r');
  
  if (redirectCode) {
    const history = JSON.parse(localStorage.getItem('linkShortHistory') || '[]');
    const link = history.find(item => item.shortCode === redirectCode);
    
    if (link) {
      // Show a brief loading message
      document.body.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: system-ui, sans-serif;">
          <div style="text-align: center;">
            <div style="margin-bottom: 1rem;">Redirecting to...</div>
            <div style="color: #666; font-size: 0.9rem;">${link.original}</div>
            <div style="margin-top: 1rem;">
              <a href="${link.original}" style="color: #3b82f6; text-decoration: none;">Click here if not redirected automatically</a>
            </div>
          </div>
        </div>
      `;
      
      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = link.original;
      }, 1500);
      
      return true; // Indicates we're handling a redirect
    } else {
      // Show error page for invalid code
      document.body.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: system-ui, sans-serif;">
          <div style="text-align: center;">
            <div style="margin-bottom: 1rem; color: #ef4444;">Invalid or expired link</div>
            <div style="color: #666; font-size: 0.9rem;">This shortened URL doesn't exist or has expired.</div>
            <div style="margin-top: 1rem;">
              <a href="/" style="color: #3b82f6; text-decoration: none;">Go back to LinkShort</a>
            </div>
          </div>
        </div>
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
  }
}))

// --- Start Alpine ---
window.Alpine = Alpine;

// Check for redirects before starting Alpine
if (!handleRedirect()) {
  Alpine.start();
}
