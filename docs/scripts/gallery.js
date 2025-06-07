// Gallery Module - Lazy loaded for artwork section
// Advanced gallery functionality with modal system and zoom

class GalleryManager {
  constructor() {
    this.modal = null;
    this.currentIndex = 0;
    this.artworks = [];
    this.isInitialized = false;
    
    this.init();
  }
  
  init() {
    if (this.isInitialized) return;
    
    console.log('Gallery: Initializing advanced gallery features...');
    
    this.collectArtworks();
    this.setupModal();
    this.bindEvents();
    this.setupKeyboardNavigation();
    this.setupTouchNavigation();
    
    this.isInitialized = true;
    console.log('Gallery: Advanced features loaded');
  }
  
  collectArtworks() {
    const artworkCards = document.querySelectorAll('.artwork-card');
    this.artworks = Array.from(artworkCards).map((card, index) => {
      const img = card.querySelector('img');
      const title = card.querySelector('.artwork-title')?.textContent || `Artwork ${index + 1}`;
      const description = card.querySelector('.artwork-description')?.textContent || '';
      const button = card.querySelector('.artwork-button');
      
      return {
        element: card,
        src: img?.src || '',
        alt: img?.alt || title,
        title,
        description,
        link: button?.href || '#',
        index
      };
    });
  }
  
  setupModal() {
    this.modal = document.createElement('div');
    this.modal.className = 'gallery-modal';
    this.modal.innerHTML = `
      <div class="gallery-modal-overlay" aria-hidden="true"></div>
      <div class="gallery-modal-container" role="dialog" aria-modal="true" aria-labelledby="gallery-title">
        <button class="gallery-close" aria-label="Close gallery">
          <i class="fas fa-times"></i>
        </button>
        <button class="gallery-prev" aria-label="Previous artwork">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button class="gallery-next" aria-label="Next artwork">
          <i class="fas fa-chevron-right"></i>
        </button>
        <div class="gallery-content">
          <div class="gallery-image-container">
            <img class="gallery-image" alt="" loading="lazy">
            <div class="gallery-loading">
              <i class="fas fa-spinner fa-spin"></i>
            </div>
          </div>
          <div class="gallery-info">
            <h3 id="gallery-title" class="gallery-artwork-title"></h3>
            <p class="gallery-artwork-description"></p>
            <div class="gallery-actions">
              <a class="gallery-view-btn btn btn-primary" href="#" target="_blank">
                <i class="fas fa-external-link-alt"></i>
                View Details
              </a>
              <button class="gallery-zoom-btn" aria-label="Toggle zoom">
                <i class="fas fa-search-plus"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="gallery-thumbnails">
          <!-- Thumbnails will be inserted here -->
        </div>
      </div>
    `;
    
    document.body.appendChild(this.modal);
    this.addGalleryStyles();
  }
  
  addGalleryStyles() {
    if (document.querySelector('#gallery-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'gallery-styles';
    styles.textContent = `
      .gallery-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: none;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .gallery-modal.active {
        display: flex;
        opacity: 1;
      }
      
      .gallery-modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(10px);
      }
      
      .gallery-modal-container {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        max-width: 1400px;
        margin: 0 auto;
      }
      
      .gallery-close {
        position: absolute;
        top: 2rem;
        right: 2rem;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        z-index: 10001;
      }
      
      .gallery-close:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.1);
      }
      
      .gallery-prev,
      .gallery-next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        z-index: 10001;
      }
      
      .gallery-prev {
        left: 2rem;
      }
      
      .gallery-next {
        right: 2rem;
      }
      
      .gallery-prev:hover,
      .gallery-next:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-50%) scale(1.1);
      }
      
      .gallery-content {
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 2rem;
        width: 100%;
        height: 80vh;
        max-height: 800px;
      }
      
      .gallery-image-container {
        position: relative;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .gallery-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        border-radius: 8px;
        transition: transform 0.3s ease;
        cursor: zoom-in;
      }
      
      .gallery-image.zoomed {
        cursor: zoom-out;
        transform: scale(1.5);
      }
      
      .gallery-loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 2rem;
      }
      
      .gallery-info {
        color: white;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      
      .gallery-artwork-title {
        font-size: 2rem;
        font-weight: 600;
        margin: 0;
        color: white;
      }
      
      .gallery-artwork-description {
        font-size: 1.1rem;
        opacity: 0.8;
        line-height: 1.6;
        margin: 0;
      }
      
      .gallery-actions {
        display: flex;
        gap: 1rem;
        margin-top: auto;
      }
      
      .gallery-view-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 500;
        transition: all 0.3s ease;
      }
      
      .gallery-zoom-btn {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        padding: 12px;
        border-radius: 8px;
        cursor: pointer;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
      }
      
      .gallery-zoom-btn:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      
      .gallery-thumbnails {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 0.5rem;
        padding: 1rem;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 12px;
        backdrop-filter: blur(10px);
      }
      
      .gallery-thumbnail {
        width: 60px;
        height: 60px;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        opacity: 0.5;
        transition: all 0.3s ease;
        border: 2px solid transparent;
      }
      
      .gallery-thumbnail.active {
        opacity: 1;
        border-color: white;
      }
      
      .gallery-thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      @media (max-width: 768px) {
        .gallery-content {
          grid-template-columns: 1fr;
          grid-template-rows: 1fr auto;
          height: 90vh;
        }
        
        .gallery-info {
          max-height: 200px;
          overflow-y: auto;
        }
        
        .gallery-prev,
        .gallery-next {
          width: 50px;
          height: 50px;
        }
        
        .gallery-prev {
          left: 1rem;
        }
        
        .gallery-next {
          right: 1rem;
        }
        
        .gallery-close {
          top: 1rem;
          right: 1rem;
          width: 40px;
          height: 40px;
        }
      }
    `;
    
    document.head.appendChild(styles);
  }
  
  bindEvents() {
    // Add click handlers to artwork cards
    this.artworks.forEach((artwork, index) => {
      const viewButton = artwork.element.querySelector('.artwork-button');
      if (viewButton) {
        viewButton.addEventListener('click', (e) => {
          e.preventDefault();
          this.openGallery(index);
        });
      }
      
      // Also allow clicking on the image itself
      const image = artwork.element.querySelector('img');
      if (image) {
        image.addEventListener('click', () => {
          this.openGallery(index);
        });
        image.style.cursor = 'pointer';
      }
    });
    
    // Modal event handlers
    const closeBtn = this.modal.querySelector('.gallery-close');
    const overlay = this.modal.querySelector('.gallery-modal-overlay');
    const prevBtn = this.modal.querySelector('.gallery-prev');
    const nextBtn = this.modal.querySelector('.gallery-next');
    const zoomBtn = this.modal.querySelector('.gallery-zoom-btn');
    
    closeBtn.addEventListener('click', () => this.closeGallery());
    overlay.addEventListener('click', () => this.closeGallery());
    prevBtn.addEventListener('click', () => this.previousArtwork());
    nextBtn.addEventListener('click', () => this.nextArtwork());
    zoomBtn.addEventListener('click', () => this.toggleZoom());
    
    // Prevent modal content clicks from closing modal
    this.modal.querySelector('.gallery-content').addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
  
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (!this.modal.classList.contains('active')) return;
      
      switch (e.key) {
        case 'Escape':
          this.closeGallery();
          break;
        case 'ArrowLeft':
          this.previousArtwork();
          break;
        case 'ArrowRight':
          this.nextArtwork();
          break;
        case ' ':
          e.preventDefault();
          this.toggleZoom();
          break;
      }
    });
  }
  
  setupTouchNavigation() {
    let startX = 0;
    let endX = 0;
    
    this.modal.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    
    this.modal.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0) {
          this.nextArtwork();
        } else {
          this.previousArtwork();
        }
      }
    });
  }
  
  openGallery(index) {
    this.currentIndex = index;
    this.updateModalContent();
    this.createThumbnails();
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    this.modal.querySelector('.gallery-close').focus();
  }
  
  closeGallery() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset zoom
    const image = this.modal.querySelector('.gallery-image');
    image.classList.remove('zoomed');
  }
  
  updateModalContent() {
    const artwork = this.artworks[this.currentIndex];
    if (!artwork) return;
    
    const image = this.modal.querySelector('.gallery-image');
    const title = this.modal.querySelector('.gallery-artwork-title');
    const description = this.modal.querySelector('.gallery-artwork-description');
    const viewBtn = this.modal.querySelector('.gallery-view-btn');
    const loading = this.modal.querySelector('.gallery-loading');
    
    // Show loading state
    loading.style.display = 'block';
    image.style.opacity = '0';
    
    // Update content
    title.textContent = artwork.title;
    description.textContent = artwork.description;
    viewBtn.href = artwork.link;
    
    // Load image
    const newImage = new Image();
    newImage.onload = () => {
      image.src = newImage.src;
      image.alt = artwork.alt;
      image.style.opacity = '1';
      loading.style.display = 'none';
    };
    newImage.src = artwork.src;
    
    // Reset zoom
    image.classList.remove('zoomed');
  }
  
  createThumbnails() {
    const container = this.modal.querySelector('.gallery-thumbnails');
    container.innerHTML = '';
    
    this.artworks.forEach((artwork, index) => {
      const thumb = document.createElement('div');
      thumb.className = 'gallery-thumbnail';
      if (index === this.currentIndex) {
        thumb.classList.add('active');
      }
      
      thumb.innerHTML = `<img src="${artwork.src}" alt="${artwork.alt}">`;
      thumb.addEventListener('click', () => {
        this.currentIndex = index;
        this.updateModalContent();
        this.updateThumbnails();
      });
      
      container.appendChild(thumb);
    });
  }
  
  updateThumbnails() {
    const thumbnails = this.modal.querySelectorAll('.gallery-thumbnail');
    thumbnails.forEach((thumb, index) => {
      thumb.classList.toggle('active', index === this.currentIndex);
    });
  }
  
  previousArtwork() {
    this.currentIndex = (this.currentIndex - 1 + this.artworks.length) % this.artworks.length;
    this.updateModalContent();
    this.updateThumbnails();
  }
  
  nextArtwork() {
    this.currentIndex = (this.currentIndex + 1) % this.artworks.length;
    this.updateModalContent();
    this.updateThumbnails();
  }
  
  toggleZoom() {
    const image = this.modal.querySelector('.gallery-image');
    image.classList.toggle('zoomed');
  }
}

// Initialize gallery when module is loaded
const gallery = new GalleryManager();

// Export for external use
window.GalleryManager = GalleryManager;
window.gallery = gallery;

console.log('Gallery module loaded successfully');
