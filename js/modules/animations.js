/**
 * Módulo de Animações
 * Gerencia animações, scroll reveal e efeitos visuais
 */

import { DOM_SELECTORS, APP_CONFIG } from '../config/constants.js';

class Animations {
  constructor() {
    this.observedElements = new Set();
    this.intersectionObserver = null;
    this.animationQueue = [];
    
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupScrollReveal();
    this.setupHoverEffects();
    this.setupLoadingAnimations();
    this.setupDynamicElementsListener();
  }

  /**
   * Configura listener para novos elementos adicionados dinamicamente
   */
  setupDynamicElementsListener() {
    document.addEventListener('newElementsAdded', (event) => {
      const { elements } = event.detail;
      if (elements && elements.length > 0) {
        this.prepareElementsForAnimation(elements, 'fade-in');
      }
    });
  }

  /**
   * Configura o Intersection Observer para scroll reveal
   */
  setupIntersectionObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '-50px 0px -50px 0px',
      threshold: [0.1, 0.25, 0.5, 0.75, 1]
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
          this.intersectionObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
  }

  /**
   * Configura elementos para scroll reveal
   */
  setupScrollReveal() {
    // Elementos que devem ter animação de fade in
    const fadeElements = document.querySelectorAll(`
      ${DOM_SELECTORS.CARDS},
      .intro-section,
      .container h2,
      .carousel,
      .footer
    `);

    // Elementos que devem ter animação slide from left
    const slideLeftElements = document.querySelectorAll(`
      .card:nth-child(odd),
      .profile-section,
      .about-section
    `);

    // Elementos que devem ter animação slide from right
    const slideRightElements = document.querySelectorAll(`
      .card:nth-child(even),
      .skills-section,
      .projects-section
    `);

    // Aplicar classes e observar elementos
    this.prepareElementsForAnimation(fadeElements, 'fade-in');
    this.prepareElementsForAnimation(slideLeftElements, 'slide-in-left');
    this.prepareElementsForAnimation(slideRightElements, 'slide-in-right');
  }

  /**
   * Prepara elementos para animação
   * @param {NodeList} elements - Elementos para animar
   * @param {string} animationType - Tipo de animação
   */
  prepareElementsForAnimation(elements, animationType) {
    elements.forEach((element, index) => {
      // Adicionar classe de animação inicial
      element.classList.add('animate-on-scroll', animationType);
      
      // Adicionar delay escalonado
      const delay = index * 100;
      element.style.setProperty('--animation-delay', `${delay}ms`);
      
      // Observar elemento
      this.intersectionObserver.observe(element);
      this.observedElements.add(element);
    });
  }

  /**
   * Anima um elemento quando ele entra na viewport
   * @param {HTMLElement} element - Elemento para animar
   */
  animateElement(element) {
    // Remover classe de estado inicial
    element.classList.remove('animate-on-scroll');
    
    // Adicionar classe de animação ativa
    element.classList.add(APP_CONFIG.CSS_CLASSES.VISIBLE);
    
    // Disparar evento personalizado
    const event = new CustomEvent('elementAnimated', {
      detail: { element }
    });
    document.dispatchEvent(event);
  }

  /**
   * Configura efeitos de hover
   */
  setupHoverEffects() {
    // Cards com efeito hover
    const cards = document.querySelectorAll(DOM_SELECTORS.CARDS);
    
    cards.forEach(card => {
      this.addHoverEffect(card);
    });

    // Links externos com efeito hover
    const externalLinks = document.querySelectorAll(DOM_SELECTORS.EXTERNAL_LINKS);
    
    externalLinks.forEach(link => {
      this.addLinkHoverEffect(link);
    });

    // Imagens com efeito parallax suave
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      this.addImageHoverEffect(img);
    });
  }

  /**
   * Adiciona efeito hover a um card
   * @param {HTMLElement} card - Elemento do card
   */
  addHoverEffect(card) {
    let hoverTimeout;

    card.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);
      card.style.transform = 'translateY(-8px) scale(1.02)';
      card.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.15)';
      card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    card.addEventListener('mouseleave', () => {
      hoverTimeout = setTimeout(() => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.06)';
      }, 50);
    });
  }

  /**
   * Adiciona efeito hover a links
   * @param {HTMLElement} link - Elemento do link
   */
  addLinkHoverEffect(link) {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'scale(1.05)';
      link.style.transition = 'transform 0.2s ease';
    });

    link.addEventListener('mouseleave', () => {
      link.style.transform = 'scale(1)';
    });
  }

  /**
   * Adiciona efeito sutil às imagens
   * @param {HTMLElement} img - Elemento da imagem
   */
  addImageHoverEffect(img) {
    img.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.02)';
      img.style.filter = 'brightness(1.1)';
      img.style.transition = 'all 0.3s ease';
    });

    img.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
      img.style.filter = 'brightness(1)';
    });
  }

  /**
   * Configurações de animações de carregamento
   */
  setupLoadingAnimations() {
    // Fade in suave da página inteira
    document.addEventListener('DOMContentLoaded', () => {
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.5s ease';
      
      setTimeout(() => {
        document.body.style.opacity = '1';
      }, 100);
    });

    // Animação de carregamento de imagens
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
    });
  }

  /**
   * Animar elemento programaticamente
   * @param {HTMLElement} element - Elemento para animar
   * @param {string} animationType - Tipo de animação
   * @param {number} delay - Delay em ms
   */
  animateElementProgrammatically(element, animationType = 'fade-in', delay = 0) {
    setTimeout(() => {
      element.classList.add(animationType, APP_CONFIG.CSS_CLASSES.VISIBLE);
    }, delay);
  }

  /**
   * Observar novos elementos dinamicamente
   * @param {HTMLElement|NodeList} elements - Elemento(s) para observar
   */
  observeNewElements(elements) {
    const elementList = elements instanceof NodeList ? Array.from(elements) : [elements];
    
    elementList.forEach(element => {
      if (element && !this.observedElements.has(element)) {
        this.intersectionObserver.observe(element);
        this.observedElements.add(element);
      }
    });
  }

  /**
   * Parar de observar elementos
   * @param {HTMLElement|NodeList} elements - Elemento(s) para parar de observar
   */
  unobserveElements(elements) {
    const elementList = elements instanceof NodeList ? Array.from(elements) : [elements];
    
    elementList.forEach(element => {
      if (element && this.observedElements.has(element)) {
        this.intersectionObserver.unobserve(element);
        this.observedElements.delete(element);
      }
    });
  }

  /**
   * Paralaxe suave no scroll
   */
  setupParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length === 0) return;

    let ticking = false;

    const updateParallax = () => {
      const scrollTop = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrollTop * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
      
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /**
   * Contador animado para números
   * @param {HTMLElement} element - Elemento que contém o número
   * @param {number} start - Número inicial
   * @param {number} end - Número final
   * @param {number} duration - Duração em ms
   */
  animateCounter(element, start, end, duration = 2000) {
    const startTimestamp = performance.now();
    const difference = end - start;

    const step = (timestamp) => {
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const current = Math.floor(start + (difference * easeOut));
      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = end;
      }
    };

    requestAnimationFrame(step);
  }

  /**
   * Typewriter effect para texto
   * @param {HTMLElement} element - Elemento do texto
   * @param {string} text - Texto para digitar
   * @param {number} speed - Velocidade em ms
   */
  typewriterEffect(element, text, speed = 50) {
    element.textContent = '';
    let index = 0;

    const type = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    };

    type();
  }

  /**
   * Cleanup - remover observers e listeners
   */
  destroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    
    this.observedElements.clear();
    this.animationQueue = [];
  }
}

export default Animations;