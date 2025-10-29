/**
 * Módulo de Navegação
 * Gerencia todas as funcionalidades relacionadas à navegação do site
 */

import { DOM_SELECTORS, APP_CONFIG } from '../config/constants.js';

class Navigation {
  constructor() {
    this.navbar = document.querySelector(DOM_SELECTORS.NAVBAR);
    this.navbarToggler = document.querySelector(DOM_SELECTORS.NAVBAR_TOGGLER);
    this.navbarCollapse = document.querySelector(DOM_SELECTORS.NAVBAR_COLLAPSE);
    this.navLinks = document.querySelectorAll(DOM_SELECTORS.NAV_LINKS);
    this.isScrolling = false;

    this.init();
  }

  init() {
    this.setupScrollEffect();
    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.highlightActiveSection();
  }

  /**
   * Efeito de scroll no navbar
   */
  setupScrollEffect() {
    let ticking = false;

    const updateNavbar = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 50) {
        this.navbar?.classList.add(APP_CONFIG.CSS_CLASSES.NAVBAR_SCROLLED);
      } else {
        this.navbar?.classList.remove(APP_CONFIG.CSS_CLASSES.NAVBAR_SCROLLED);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /**
   * Funcionalidade do menu mobile
   */
  setupMobileMenu() {
    if (!this.navbarToggler || !this.navbarCollapse) return;

    // Fechar menu ao clicar em um link
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < APP_CONFIG.BREAKPOINTS.MOBILE) {
          // Use Bootstrap's collapse method if available
          if (window.bootstrap?.Collapse) {
            const bsCollapse = new bootstrap.Collapse(this.navbarCollapse, {
              toggle: false
            });
            bsCollapse.hide();
          } else {
            // Fallback manual toggle
            this.navbarCollapse.classList.remove('show');
          }
        }
      });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', e => {
      const isClickInsideNav = this.navbar?.contains(e.target);
      const isNavOpen = this.navbarCollapse?.classList.contains('show');

      if (!isClickInsideNav && isNavOpen) {
        if (window.bootstrap?.Collapse) {
          const bsCollapse = new bootstrap.Collapse(this.navbarCollapse, {
            toggle: false
          });
          bsCollapse.hide();
        } else {
          this.navbarCollapse.classList.remove('show');
        }
      }
    });
  }

  /**
   * Scroll suave para seções
   */
  setupSmoothScrolling() {
    this.navLinks.forEach(link => {
      const href = link.getAttribute('href');

      if (href && href.startsWith('#')) {
        link.addEventListener('click', e => {
          e.preventDefault();
          this.scrollToSection(href);
        });
      }
    });
  }

  /**
   * Scroll suave para uma seção específica
   * @param {string} sectionId - ID da seção
   */
  scrollToSection(sectionId) {
    const targetSection = document.querySelector(sectionId);

    if (!targetSection) return;

    this.isScrolling = true;

    const navbarHeight = this.navbar?.offsetHeight || 0;
    const targetPosition = targetSection.offsetTop - navbarHeight - 20;

    // Usando scroll behavior nativo para melhor performance
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    // Reset flag após animação
    setTimeout(() => {
      this.isScrolling = false;
    }, APP_CONFIG.ANIMATION.SCROLL_DURATION);
  }

  /**
   * Destaca a seção ativa no menu
   */
  highlightActiveSection() {
    const sections = Object.values(DOM_SELECTORS.SECTIONS)
      .map(selector => document.querySelector(selector))
      .filter(Boolean);

    if (sections.length === 0) return;

    const handleScrollHighlight = () => {
      if (this.isScrolling) return;

      const scrollPos = window.scrollY + window.innerHeight / 2;

      let activeSection = null;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPos >= sectionTop && scrollPos <= sectionBottom) {
          activeSection = section;
        }
      });

      // Atualizar links ativos
      this.navLinks.forEach(link => {
        link.classList.remove('active');

        if (activeSection) {
          const linkHref = link.getAttribute('href');
          if (linkHref === `#${activeSection.id}`) {
            link.classList.add('active');
          }
        }
      });
    };

    let ticking = false;
    const throttledHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScrollHighlight();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandler, { passive: true });
  }

  /**
   * Método público para navegar para uma seção
   * @param {string} sectionId - ID da seção
   */
  navigateToSection(sectionId) {
    this.scrollToSection(sectionId);
  }

  /**
   * Método para destruir event listeners (cleanup)
   */
  destroy() {
    // Remover todos os event listeners se necessário
    // Implementar se o módulo precisar ser destruído dinamicamente
  }
}

export default Navigation;
