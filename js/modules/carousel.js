/**
 * Módulo de Carousel
 * Gerencia o carousel de projetos com funcionalidades aprimoradas
 */

import { DOM_SELECTORS, APP_CONFIG, PROJECTS_DATA } from '../config/constants.js';

class Carousel {
  constructor() {
    this.carousel = document.querySelector(DOM_SELECTORS.CAROUSEL);
    this.carouselItems = [];
    this.currentIndex = 0;
    this.isPlaying = true;
    this.intervalId = null;
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    if (!this.carousel) return;

    this.setupCarouselData();
    this.setupControls();
    this.setupKeyboardNavigation();
    this.setupTouchNavigation();
    this.setupAutoPlay();
    this.setupAccessibility();
  }

  /**
   * Configura os dados do carousel dinamicamente
   */
  setupCarouselData() {
    const carouselInner = this.carousel.querySelector('.carousel-inner');
    const carouselIndicators = this.carousel.querySelector('.carousel-indicators');

    if (!carouselInner || !carouselIndicators) return;

    // Limpar conteúdo existente
    carouselInner.innerHTML = '';
    carouselIndicators.innerHTML = '';

    // Gerar slides dinamicamente
    PROJECTS_DATA.forEach((project, index) => {
      // Criar slide
      const slide = this.createSlide(project, index);
      carouselInner.appendChild(slide);

      // Criar indicador
      const indicator = this.createIndicator(index);
      carouselIndicators.appendChild(indicator);
    });

    // Atualizar referências
    this.carouselItems = carouselInner.querySelectorAll('.carousel-item');
    this.updateIndicators();
  }

  /**
   * Cria um slide do carousel
   * @param {Object} project - Dados do projeto
   * @param {number} index - Índice do slide
   * @returns {HTMLElement} Elemento do slide
   */
  createSlide(project, index) {
    const slide = document.createElement('div');
    slide.className = `carousel-item${index === 0 ? ' active' : ''}`;
    slide.setAttribute('data-index', index);

    slide.innerHTML = `
      <img src="${project.image}" 
           class="d-block w-100 project-img" 
           alt="${project.title}"
           loading="lazy">
      <div class="carousel-caption d-none d-md-block">
        <h5 class="fw-bold text-dark">${project.title}</h5>
        <p class="text-dark">${project.description}</p>
        ${
          project.url !== '#'
            ? `
          <a href="${project.url}" 
             target="_blank" 
             rel="noopener noreferrer"
             class="btn btn-sm btn-outline-dark mt-2">
            Ver Projeto
          </a>
        `
            : ''
        }
      </div>
    `;

    return slide;
  }

  /**
   * Cria um indicador do carousel
   * @param {number} index - Índice do indicador
   * @returns {HTMLElement} Elemento do indicador
   */
  createIndicator(index) {
    const indicator = document.createElement('button');
    indicator.type = 'button';
    indicator.setAttribute('data-bs-target', '#carouselExampleCaptions');
    indicator.setAttribute('data-bs-slide-to', index);
    indicator.setAttribute('aria-label', `Slide ${index + 1}`);

    if (index === 0) {
      indicator.className = 'active';
      indicator.setAttribute('aria-current', 'true');
    }

    return indicator;
  }

  /**
   * Configura os controles do carousel
   */
  setupControls() {
    const prevButton = this.carousel?.querySelector('.carousel-control-prev');
    const nextButton = this.carousel?.querySelector('.carousel-control-next');

    prevButton?.addEventListener('click', e => {
      e.preventDefault();
      this.previousSlide();
    });

    nextButton?.addEventListener('click', e => {
      e.preventDefault();
      this.nextSlide();
    });

    // Pausar autoplay ao interagir
    [prevButton, nextButton].forEach(button => {
      button?.addEventListener('click', () => {
        this.pauseAutoPlay();
        this.resumeAutoPlayAfterDelay();
      });
    });
  }

  /**
   * Navegação por teclado
   */
  setupKeyboardNavigation() {
    document.addEventListener('keydown', e => {
      if (!this.isCarouselInView()) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          this.previousSlide();
          this.pauseAutoPlay();
          this.resumeAutoPlayAfterDelay();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.nextSlide();
          this.pauseAutoPlay();
          this.resumeAutoPlayAfterDelay();
          break;
        case ' ':
          e.preventDefault();
          this.toggleAutoPlay();
          break;
      }
    });
  }

  /**
   * Navegação por toque (swipe)
   */
  setupTouchNavigation() {
    this.carousel?.addEventListener(
      'touchstart',
      e => {
        this.touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    this.carousel?.addEventListener(
      'touchend',
      e => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
      },
      { passive: true }
    );
  }

  /**
   * Processa gestos de swipe
   */
  handleSwipe() {
    const threshold = 50; // Sensibilidade do swipe
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - próximo slide
        this.nextSlide();
      } else {
        // Swipe right - slide anterior
        this.previousSlide();
      }

      this.pauseAutoPlay();
      this.resumeAutoPlayAfterDelay();
    }
  }

  /**
   * Configurar autoplay
   */
  setupAutoPlay() {
    this.startAutoPlay();

    // Pausar quando hover
    this.carousel?.addEventListener('mouseenter', () => {
      this.pauseAutoPlay();
    });

    this.carousel?.addEventListener('mouseleave', () => {
      this.startAutoPlay();
    });

    // Pausar quando não visível
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAutoPlay();
      } else {
        this.startAutoPlay();
      }
    });
  }

  /**
   * Configurações de acessibilidade
   */
  setupAccessibility() {
    // Adicionar roles ARIA
    this.carousel?.setAttribute('role', 'region');
    this.carousel?.setAttribute('aria-label', 'Carousel de projetos');

    // Configurar indicadores para leitores de tela
    const indicators = this.carousel?.querySelectorAll('.carousel-indicators button');
    indicators?.forEach((indicator, index) => {
      indicator.setAttribute('aria-label', `Ir para projeto ${index + 1}`);
    });
  }

  /**
   * Próximo slide
   */
  nextSlide() {
    if (this.carouselItems.length === 0) return;

    const current = this.carousel?.querySelector('.carousel-item.active');
    const next = current?.nextElementSibling || this.carouselItems[0];

    this.transitionToSlide(current, next);
    this.currentIndex = (this.currentIndex + 1) % this.carouselItems.length;
    this.updateIndicators();
  }

  /**
   * Slide anterior
   */
  previousSlide() {
    if (this.carouselItems.length === 0) return;

    const current = this.carousel?.querySelector('.carousel-item.active');
    const previous =
      current?.previousElementSibling || this.carouselItems[this.carouselItems.length - 1];

    this.transitionToSlide(current, previous);
    this.currentIndex =
      this.currentIndex === 0 ? this.carouselItems.length - 1 : this.currentIndex - 1;
    this.updateIndicators();
  }

  /**
   * Ir para um slide específico
   * @param {number} index - Índice do slide
   */
  goToSlide(index) {
    if (index < 0 || index >= this.carouselItems.length) return;

    const current = this.carousel?.querySelector('.carousel-item.active');
    const target = this.carouselItems[index];

    this.transitionToSlide(current, target);
    this.currentIndex = index;
    this.updateIndicators();
  }

  /**
   * Transição entre slides
   * @param {HTMLElement} current - Slide atual
   * @param {HTMLElement} next - Próximo slide
   */
  transitionToSlide(current, next) {
    if (!current || !next || current === next) return;

    current.classList.remove('active');
    next.classList.add('active');

    // Disparar evento personalizado
    const event = new CustomEvent('slideChanged', {
      detail: {
        currentIndex: this.currentIndex,
        direction: 'next' // ou 'previous'
      }
    });
    this.carousel?.dispatchEvent(event);
  }

  /**
   * Atualizar indicadores
   */
  updateIndicators() {
    const indicators = this.carousel?.querySelectorAll('.carousel-indicators button');

    indicators?.forEach((indicator, index) => {
      if (index === this.currentIndex) {
        indicator.classList.add('active');
        indicator.setAttribute('aria-current', 'true');
      } else {
        indicator.classList.remove('active');
        indicator.removeAttribute('aria-current');
      }
    });
  }

  /**
   * Iniciar autoplay
   */
  startAutoPlay() {
    if (this.intervalId) return;

    this.isPlaying = true;
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, APP_CONFIG.ANIMATION.CAROUSEL_INTERVAL);
  }

  /**
   * Pausar autoplay
   */
  pauseAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isPlaying = false;
  }

  /**
   * Alternar autoplay
   */
  toggleAutoPlay() {
    if (this.isPlaying) {
      this.pauseAutoPlay();
    } else {
      this.startAutoPlay();
    }
  }

  /**
   * Retomar autoplay após delay
   */
  resumeAutoPlayAfterDelay(delay = 3000) {
    setTimeout(() => {
      if (!this.isPlaying) {
        this.startAutoPlay();
      }
    }, delay);
  }

  /**
   * Verificar se carousel está visível
   * @returns {boolean}
   */
  isCarouselInView() {
    if (!this.carousel) return false;

    const rect = this.carousel.getBoundingClientRect();
    const viewHeight = window.innerHeight || document.documentElement.clientHeight;

    return rect.top < viewHeight && rect.bottom > 0;
  }

  /**
   * Destruir carousel (cleanup)
   */
  destroy() {
    this.pauseAutoPlay();
    // Remover event listeners se necessário
  }
}

export default Carousel;
