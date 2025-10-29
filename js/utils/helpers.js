/**
 * Utilitários gerais
 * Funções auxiliares utilizadas em toda a aplicação
 */

/**
 * Debounce function para otimizar performance
 * @param {Function} func - Função para executar
 * @param {number} wait - Tempo de espera em ms
 * @param {boolean} immediate - Executar imediatamente
 * @returns {Function} Função debounced
 */
export function debounce(func, wait, immediate = false) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(this, args);
  };
}

/**
 * Throttle function para controlar frequência de execução
 * @param {Function} func - Função para executar
 * @param {number} limit - Limite de tempo em ms
 * @returns {Function} Função throttled
 */
export function throttle(func, limit) {
  let inThrottle;

  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Verifica se elemento está visível na viewport
 * @param {HTMLElement} element - Elemento para verificar
 * @param {number} threshold - Percentual de visibilidade (0-1)
 * @returns {boolean} Se está visível
 */
export function isElementInViewport(element, threshold = 0.1) {
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const verticalVisible = rect.top <= windowHeight && rect.bottom >= 0;
  const horizontalVisible = rect.left <= windowWidth && rect.right >= 0;

  if (!verticalVisible || !horizontalVisible) return false;

  // Calcular área visível
  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
  const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
  const visibleArea = visibleHeight * visibleWidth;
  const totalArea = rect.width * rect.height;

  return visibleArea / totalArea >= threshold;
}

/**
 * Scroll suave para um elemento
 * @param {HTMLElement|string} target - Elemento ou seletor
 * @param {number} offset - Offset em pixels
 * @param {number} duration - Duração em ms
 */
export function smoothScrollTo(target, offset = 0, duration = 800) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;

  if (!element) return;

  const targetPosition = element.offsetTop - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  function animation(currentTime) {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // Easing function (ease-in-out)
    const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    window.scrollTo(0, startPosition + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

/**
 * Detecta tipo de dispositivo
 * @returns {Object} Informações do dispositivo
 */
export function getDeviceInfo() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;

  return {
    isMobile,
    isTablet,
    isDesktop,
    isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    userAgent,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight
  };
}

/**
 * Formata texto removendo acentos e caracteres especiais
 * @param {string} text - Texto para formatar
 * @returns {string} Texto formatado
 */
export function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
}

/**
 * Gera um ID único
 * @param {string} prefix - Prefixo para o ID
 * @returns {string} ID único
 */
export function generateUniqueId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Carrega script dinamicamente
 * @param {string} src - URL do script
 * @param {Object} options - Opções adicionais
 * @returns {Promise} Promise que resolve quando script carrega
 */
export function loadScript(src, options = {}) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = options.async !== false;
    script.defer = options.defer || false;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));

    if (options.attributes) {
      Object.entries(options.attributes).forEach(([key, value]) => {
        script.setAttribute(key, value);
      });
    }

    document.head.appendChild(script);
  });
}

/**
 * Carrega CSS dinamicamente
 * @param {string} href - URL do CSS
 * @param {Object} options - Opções adicionais
 * @returns {Promise} Promise que resolve quando CSS carrega
 */
export function loadCSS(href, options = {}) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;

    link.onload = () => resolve(link);
    link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));

    if (options.media) {
      link.media = options.media;
    }

    document.head.appendChild(link);
  });
}

/**
 * Copia texto para clipboard
 * @param {string} text - Texto para copiar
 * @returns {Promise<boolean>} Se a operação foi bem-sucedida
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback para browsers antigos
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (error) {
    console.error('Failed to copy text:', error);
    return false;
  }
}

/**
 * Detecta preferência de tema (dark/light)
 * @returns {string} 'dark' ou 'light'
 */
export function getPreferredTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

/**
 * Observa mudanças na preferência de tema
 * @param {Function} callback - Função chamada quando tema muda
 * @returns {Function} Função para remover listener
 */
export function watchThemeChanges(callback) {
  if (!window.matchMedia) return () => {};

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleChange = e => callback(e.matches ? 'dark' : 'light');

  mediaQuery.addEventListener('change', handleChange);

  // Retorna função para cleanup
  return () => mediaQuery.removeEventListener('change', handleChange);
}

/**
 * Valida email
 * @param {string} email - Email para validar
 * @returns {boolean} Se é válido
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Formata data
 * @param {Date|string} date - Data para formatar
 * @param {Object} options - Opções de formatação
 * @returns {string} Data formatada
 */
export function formatDate(date, options = {}) {
  const dateObj = date instanceof Date ? date : new Date(date);

  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };

  return dateObj.toLocaleDateString('pt-BR', defaultOptions);
}

/**
 * Logger simples com níveis
 */
export const logger = {
  debug: (...args) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug('[DEBUG]', ...args);
    }
  },

  info: (...args) => {
    console.info('[INFO]', ...args);
  },

  warn: (...args) => {
    console.warn('[WARN]', ...args);
  },

  error: (...args) => {
    console.error('[ERROR]', ...args);
  }
};
