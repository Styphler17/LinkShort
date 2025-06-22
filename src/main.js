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
      this.shortUrl = `${window.location.host}/${shortCode}`;
      
      this.history.unshift({
        id: Date.now(),
        original: this.longUrl,
        short: this.shortUrl,
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
Alpine.start();
