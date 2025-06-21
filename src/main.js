import Alpine from 'alpinejs'
import './style.css'

// Make Alpine available globally
window.Alpine = Alpine

// LinkShort App Component
Alpine.data('linkShort', () => ({
  longUrl: '',
  shortUrl: '',
  isGenerating: false,
  isCopied: false,
  history: [],
  
  init() {
    // Load history from localStorage
    this.history = JSON.parse(localStorage.getItem('linkShortHistory') || '[]')
  },
  
  generateShortUrl() {
    if (!this.longUrl.trim()) return
    
    this.isGenerating = true
    
    // Simulate API call delay
    setTimeout(() => {
      // Generate a random short code
      const shortCode = this.generateShortCode()
      this.shortUrl = `${window.location.origin}/${shortCode}`
      
      // Add to history
      const linkData = {
        id: Date.now(),
        original: this.longUrl,
        short: this.shortUrl,
        createdAt: new Date().toISOString()
      }
      
      this.history.unshift(linkData)
      this.saveHistory()
      
      this.isGenerating = false
    }, 1000)
  },
  
  generateShortCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  },
  
  copyToClipboard() {
    if (this.shortUrl) {
      navigator.clipboard.writeText(this.shortUrl).then(() => {
        this.isCopied = true
        setTimeout(() => {
          this.isCopied = false
        }, 2000)
      })
    }
  },
  
  saveHistory() {
    // Keep only last 10 items
    this.history = this.history.slice(0, 10)
    localStorage.setItem('linkShortHistory', JSON.stringify(this.history))
  },
  
  clearHistory() {
    this.history = []
    localStorage.removeItem('linkShortHistory')
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

// Start Alpine
Alpine.start()
