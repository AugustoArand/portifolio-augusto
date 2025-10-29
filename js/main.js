/**
 * Arquivo principal da aplicação
 * Inicializa todos os módulos e componentes do portfólio
 */

// Importações dos módulos
import Navigation from './modules/navigation.js';
import Carousel from './modules/carousel.js';
import Animations from './modules/animations.js';
import Portfolio from './components/portfolio.js';
import { APP_CONFIG } from './config/constants.js';
import { logger, getDeviceInfo } from './utils/helpers.js';

/**
 * Classe principal da aplicação
 */
class PortfolioApp {
  constructor() {
    this.modules = {};
    this.isInitialized = false;
    this.deviceInfo = getDeviceInfo();

    // Bind dos métodos
    this.init = this.init.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  /**
   * Inicialização da aplicação
   */
  async init() {
    try {
      logger.info('🚀 Inicializando Portfolio App...');

      // Aguardar DOM estar pronto
      await this.waitForDOM();

      // Verificar compatibilidade do browser
      this.checkBrowserCompatibility();

      // Aplicar configurações iniciais
      this.applyInitialConfig();

      // Inicializar módulos
      await this.initializeModules();

      // Configurar event listeners globais
      this.setupGlobalEventListeners();

      // Marcar como inicializado
      this.isInitialized = true;

      // Disparar evento de inicialização completa
      this.dispatchAppReadyEvent();

      logger.info('✅ Portfolio App inicializado com sucesso!');
    } catch (error) {
      logger.error('❌ Erro ao inicializar aplicação:', error);
      this.handleInitializationError(error);
    }
  }

  /**
   * Aguarda o DOM estar completamente carregado
   * @returns {Promise} Promise que resolve quando DOM está pronto
   */
  waitForDOM() {
    return new Promise(resolve => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
  }

  /**
   * Verifica compatibilidade do browser
   */
  checkBrowserCompatibility() {
    const features = {
      es6Modules: 'noModule' in HTMLScriptElement.prototype,
      intersectionObserver: 'IntersectionObserver' in window,
      requestAnimationFrame: 'requestAnimationFrame' in window,
      localStorage: typeof Storage !== 'undefined',
      fetch: 'fetch' in window
    };

    const unsupportedFeatures = Object.entries(features)
      .filter(([feature, supported]) => !supported)
      .map(([feature]) => feature);

    if (unsupportedFeatures.length > 0) {
      logger.warn('⚠️ Recursos não suportados pelo browser:', unsupportedFeatures);
      this.showBrowserCompatibilityWarning(unsupportedFeatures);
    }

    logger.info('🌐 Informações do dispositivo:', this.deviceInfo);
  }

  /**
   * Aplica configurações iniciais
   */
  applyInitialConfig() {
    // Aplicar classe no body baseada no dispositivo
    document.body.classList.add(
      this.deviceInfo.isMobile ? 'is-mobile' : this.deviceInfo.isTablet ? 'is-tablet' : 'is-desktop'
    );

    if (this.deviceInfo.isTouchDevice) {
      document.body.classList.add('is-touch');
    }

    // Configurar viewport meta tag dinâmicamente se necessário
    this.setupViewport();

    // Aplicar tema inicial se suportado
    this.applyInitialTheme();
  }

  /**
   * Configura viewport
   */
  setupViewport() {
    let viewport = document.querySelector('meta[name="viewport"]');

    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.name = 'viewport';
      document.head.appendChild(viewport);
    }

    // Otimizar viewport para mobile
    if (this.deviceInfo.isMobile) {
      viewport.content = 'width=device-width, initial-scale=1, user-scalable=no';
    } else {
      viewport.content = 'width=device-width, initial-scale=1';
    }
  }

  /**
   * Aplica tema inicial
   */
  applyInitialTheme() {
    // Implementar sistema de temas se necessário
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      document.body.classList.add(`theme-${savedTheme}`);
    }
  }

  /**
   * Inicializa todos os módulos
   */
  async initializeModules() {
    const moduleInitializers = [
      { name: 'animations', factory: () => new Animations() },
      { name: 'navigation', factory: () => new Navigation() },
      { name: 'carousel', factory: () => new Carousel() },
      { name: 'portfolio', factory: () => new Portfolio() }
    ];

    for (const { name, factory } of moduleInitializers) {
      try {
        logger.info(`📦 Inicializando módulo: ${name}`);
        this.modules[name] = factory();
        await this.waitForModuleReady(name);
        logger.info(`✅ Módulo ${name} inicializado`);
      } catch (error) {
        logger.error(`❌ Erro ao inicializar módulo ${name}:`, error);
      }
    }
  }

  /**
   * Aguarda módulo estar pronto
   * @param {string} moduleName - Nome do módulo
   * @returns {Promise} Promise que resolve quando módulo está pronto
   */
  waitForModuleReady(moduleName) {
    return new Promise(resolve => {
      // Para módulos simples, resolver imediatamente
      // Para módulos complexos, implementar verificação específica
      setTimeout(resolve, 100);
    });
  }

  /**
   * Configura event listeners globais
   */
  setupGlobalEventListeners() {
    // Resize handler otimizado
    window.addEventListener('resize', this.handleResize, { passive: true });

    // Visibility change handler
    document.addEventListener('visibilitychange', this.handleVisibilityChange);

    // Error handler global
    window.addEventListener('error', this.handleGlobalError.bind(this));

    // Unhandled promise rejection
    window.addEventListener('unhandledrejection', this.handleUnhandledRejection.bind(this));

    // Performance monitoring
    if ('performance' in window) {
      this.setupPerformanceMonitoring();
    }

    // Service Worker (se disponível)
    this.setupServiceWorker();
  }

  /**
   * Handler para resize da janela
   */
  handleResize() {
    // Atualizar informações do dispositivo
    this.deviceInfo = getDeviceInfo();

    // Notificar módulos sobre mudança de tamanho
    Object.values(this.modules).forEach(module => {
      if (typeof module.handleResize === 'function') {
        module.handleResize(this.deviceInfo);
      }
    });

    // Disparar evento customizado
    window.dispatchEvent(
      new CustomEvent('portfolioResize', {
        detail: this.deviceInfo
      })
    );
  }

  /**
   * Handler para mudança de visibilidade da página
   */
  handleVisibilityChange() {
    const isVisible = !document.hidden;

    // Pausar/retomar animações conforme visibilidade
    Object.values(this.modules).forEach(module => {
      if (typeof module.handleVisibilityChange === 'function') {
        module.handleVisibilityChange(isVisible);
      }
    });

    logger.info(`👁️ Página ${isVisible ? 'visível' : 'oculta'}`);
  }

  /**
   * Handler para erros globais
   * @param {ErrorEvent} event - Evento de erro
   */
  handleGlobalError(event) {
    logger.error('💥 Erro global capturado:', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error
    });

    // Enviar erro para serviço de monitoramento (se configurado)
    this.reportError(event.error);
  }

  /**
   * Handler para promises rejeitadas
   * @param {PromiseRejectionEvent} event - Evento de rejection
   */
  handleUnhandledRejection(event) {
    logger.error('🚫 Promise rejeitada não tratada:', event.reason);
    this.reportError(event.reason);
  }

  /**
   * Configura monitoramento de performance
   */
  setupPerformanceMonitoring() {
    // Medir tempo de carregamento
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0];
      if (perfData) {
        logger.info('📊 Performance de carregamento:', {
          loadTime: Math.round(perfData.loadEventEnd - perfData.fetchStart),
          domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
          firstPaint: this.getFirstPaintTime()
        });
      }
    });
  }

  /**
   * Obtém tempo do primeiro paint
   * @returns {number} Tempo em ms
   */
  getFirstPaintTime() {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
    return firstPaint ? Math.round(firstPaint.startTime) : 0;
  }

  /**
   * Configura Service Worker
   */
  async setupServiceWorker() {
    if ('serviceWorker' in navigator && location.protocol === 'https:') {
      try {
        // Implementar service worker se necessário
        logger.info('🔧 Service Worker disponível');
      } catch (error) {
        logger.warn('⚠️ Erro ao registrar Service Worker:', error);
      }
    }
  }

  /**
   * Dispara evento de aplicação pronta
   */
  dispatchAppReadyEvent() {
    const event = new CustomEvent('portfolioReady', {
      detail: {
        modules: Object.keys(this.modules),
        deviceInfo: this.deviceInfo,
        config: APP_CONFIG
      }
    });

    document.dispatchEvent(event);
  }

  /**
   * Mostra aviso de compatibilidade
   * @param {Array} unsupportedFeatures - Recursos não suportados
   */
  showBrowserCompatibilityWarning(unsupportedFeatures) {
    // Implementar notificação para usuário se necessário
    console.warn('Alguns recursos podem não funcionar corretamente neste browser.');
  }

  /**
   * Trata erro de inicialização
   * @param {Error} error - Erro ocorrido
   */
  handleInitializationError(error) {
    // Mostrar mensagem de erro para usuário
    const errorContainer = document.createElement('div');
    errorContainer.className = 'alert alert-danger fixed-top';
    errorContainer.style.zIndex = '9999';
    errorContainer.innerHTML = `
      <strong>Erro:</strong> Falha ao carregar aplicação. 
      Tente recarregar a página.
      <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `;

    document.body.insertAdjacentElement('afterbegin', errorContainer);
  }

  /**
   * Reporta erro para serviço de monitoramento
   * @param {Error} error - Erro para reportar
   */
  reportError(error) {
    // Implementar integração com serviço de monitoramento se necessário
    // Ex: Sentry, LogRocket, etc.
  }

  /**
   * Método público para acessar módulos
   * @param {string} moduleName - Nome do módulo
   * @returns {Object|null} Instância do módulo
   */
  getModule(moduleName) {
    return this.modules[moduleName] || null;
  }

  /**
   * Método público para verificar se app está inicializado
   * @returns {boolean} Se está inicializado
   */
  isReady() {
    return this.isInitialized;
  }

  /**
   * Cleanup da aplicação
   */
  destroy() {
    // Destruir todos os módulos
    Object.values(this.modules).forEach(module => {
      if (typeof module.destroy === 'function') {
        module.destroy();
      }
    });

    // Remover event listeners
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);

    this.modules = {};
    this.isInitialized = false;

    logger.info('🧹 Aplicação destruída');
  }
}

// Criar instância global da aplicação
const portfolioApp = new PortfolioApp();

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => portfolioApp.init());
} else {
  portfolioApp.init();
}

// Expor globalmente para debug (apenas em desenvolvimento)
if (typeof window !== 'undefined') {
  window.portfolioApp = portfolioApp;
}

// Export para uso como módulo
export default portfolioApp;
