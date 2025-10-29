/**
 * Componente Portfolio
 * Gerencia a renderização e interação com cards de projetos e stacks
 */

import { PROJECTS_DATA, STACKS_DATA, DOM_SELECTORS } from '../config/constants.js';
import { generateUniqueId, normalizeText } from '../utils/helpers.js';

class Portfolio {
  constructor() {
    this.projectsContainer = null;
    this.stacksContainer = null;
    this.filterState = {
      activeFilter: 'all',
      searchQuery: ''
    };

    // Aguardar DOM estar pronto antes de inicializar
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeContainers());
    } else {
      this.initializeContainers();
    }
  }

  /**
   * Inicializa os containers após DOM estar pronto
   */
  initializeContainers() {
    this.projectsContainer = document.querySelector('#projetos .row');
    this.stacksContainer = document.querySelector('#stacks-conhecidas .row');

    this.init();
  }

  init() {
    this.renderStacks();
    this.setupSearch();
    this.setupFilters();
    this.setupCardInteractions();
  }

  /**
   * Renderiza os cards de stacks tecnológicas
   */
  renderStacks() {
    if (!this.stacksContainer) {
      console.error('Container de stacks não encontrado!');
      return;
    }

    // Limpar container existente
    this.stacksContainer.innerHTML = '';

    STACKS_DATA.forEach((stack, index) => {
      const stackCard = this.createStackCard(stack, index);
      this.stacksContainer.appendChild(stackCard);
    });

    // Integrar com o sistema de animações existente
    this.initializeStackAnimations();
  }

  /**
   * Inicializa animações para os cards de stack
   */
  initializeStackAnimations() {
    const stackCards = this.stacksContainer.querySelectorAll('.animate-on-scroll');

    // Tentar usar o módulo de animações existente
    const animationsModule = window.portfolioApp?.getModule('animations');

    if (animationsModule && typeof animationsModule.observeNewElements === 'function') {
      // Se o módulo de animações está disponível e tem o método, usar o observer existente
      animationsModule.observeNewElements(stackCards);
    } else {
      // Fallback: animar diretamente com delay escalonado
      this.animateStackCardsDirectly(stackCards);
    }
  }

  /**
   * Anima cards diretamente quando o módulo de animações não está disponível
   * @param {NodeList} cards - Cards para animar
   */
  animateStackCardsDirectly(cards) {
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('visible');
      }, index * 100);
    });
  }

  /**
   * Cria um card de stack tecnológica
   * @param {Object} stack - Dados da stack
   * @param {number} index - Índice do card
   * @returns {HTMLElement} Elemento do card
   */
  createStackCard(stack, index) {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-12 col-sm-6 col-md-4 col-lg-3';
    colDiv.setAttribute('data-stack-id', generateUniqueId('stack'));
    colDiv.setAttribute('data-animation-delay', index * 100);

    const cardHTML = `
      <div class="card h-100 stack-card animate-on-scroll fade-in">
        <img src="${stack.image}" 
             class="card-img-top stack-img" 
             alt="${stack.title}"
             loading="lazy"
             onerror="this.src='./assets/img/placeholder.png'">
        <div class="card-body">
          <h5 class="card-title">${stack.title}</h5>
          <p class="card-text">${stack.description}</p>
          <div class="stack-meta">
            <span class="badge bg-secondary">${this.getStackCategory(stack.title)}</span>
          </div>
        </div>
      </div>
    `;

    colDiv.innerHTML = cardHTML;
    return colDiv;
  }

  /**
   * Determina a categoria de uma stack
   * @param {string} title - Título da stack
   * @returns {string} Categoria
   */
  getStackCategory(title) {
    const categories = {
      Frontend: ['React', 'HTML', 'CSS', 'JavaScript'],
      Backend: ['Node.js', 'Express.js', 'Prisma'],
      'Banco de Dados': ['SQL', 'Postgres'],
      Automação: ['Cypress', 'Robot Framework', 'Jmeter'],
      Dados: ['Excel', 'PowerBI'],
      Ferramentas: ['Postman', 'Jira'],
      Metodologia: ['Scrum', 'Ágil']
    };

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => title.toLowerCase().includes(keyword.toLowerCase()))) {
        return category;
      }
    }

    return 'Other';
  }

  /**
   * Configura funcionalidade de busca
   */
  setupSearch() {
    // Criar campo de busca se não existir
    let searchContainer = document.querySelector('.portfolio-search');

    if (!searchContainer) {
      searchContainer = this.createSearchInterface();
      const stacksSection = document.querySelector('#stacks-conhecidas');
      if (stacksSection) {
        const title = stacksSection.querySelector('h2');
        if (title) {
          title.insertAdjacentElement('afterend', searchContainer);
        }
      }
    }

    const searchInput = searchContainer?.querySelector('#stack-search');
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        this.filterState.searchQuery = e.target.value.toLowerCase();
        this.applyFilters();
      });
    }
  }

  /**
   * Cria interface de busca e filtros
   * @returns {HTMLElement} Container da interface
   */
  createSearchInterface() {
    const container = document.createElement('div');
    container.className = 'portfolio-search mb-4';

    container.innerHTML = `
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="input-group">
            <input type="text" 
                   id="stack-search" 
                   class="form-control" 
                   placeholder="Buscar tecnologias..."
                   aria-label="Buscar tecnologias"
                   title="Digite para buscar tecnologias">
            <button class="btn btn-outline-secondary" type="button" id="clear-search"
                    title="Limpar busca" aria-label="Limpar campo de busca">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="col-md-6">
          <select id="stack-filter" class="form-select" 
                  aria-label="Filtrar por categoria" 
                  title="Selecione uma categoria para filtrar">
            <option value="all">Todas as categorias</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Banco de Dados</option>
            <option value="Testing">Automação</option>
            <option value="Analytics">Dados</option>
            <option value="Tools">Ferramentas</option>
            <option value="Methodology">Metodologia</option>
          </select>
        </div>
      </div>
    `;

    return container;
  }

  /**
   * Configura filtros por categoria
   */
  setupFilters() {
    const filterSelect = document.querySelector('#stack-filter');
    const clearButton = document.querySelector('#clear-search');

    filterSelect?.addEventListener('change', e => {
      this.filterState.activeFilter = e.target.value;
      this.applyFilters();
    });

    clearButton?.addEventListener('click', () => {
      const searchInput = document.querySelector('#stack-search');
      if (searchInput) {
        searchInput.value = '';
        this.filterState.searchQuery = '';
        this.applyFilters();
      }
    });
  }

  /**
   * Aplica filtros de busca e categoria
   */
  applyFilters() {
    const stackCards = document.querySelectorAll('.stack-card');
    let visibleCount = 0;

    stackCards.forEach(card => {
      const cardContainer = card.closest('.col-12');
      const title = card.querySelector('.card-title').textContent.toLowerCase();
      const description = card.querySelector('.card-text').textContent.toLowerCase();
      const category = card.querySelector('.badge').textContent;

      // Verificar busca por texto
      const matchesSearch =
        this.filterState.searchQuery === '' ||
        title.includes(this.filterState.searchQuery) ||
        description.includes(this.filterState.searchQuery);

      // Verificar filtro por categoria
      const matchesFilter =
        this.filterState.activeFilter === 'all' || category === this.filterState.activeFilter;

      const shouldShow = matchesSearch && matchesFilter;

      if (shouldShow) {
        cardContainer.style.display = 'block';
        cardContainer.style.animation = `fadeIn 0.3s ease ${visibleCount * 50}ms both`;
        visibleCount++;
      } else {
        cardContainer.style.display = 'none';
      }
    });

    // Mostrar mensagem se nenhum resultado
    this.toggleNoResultsMessage(visibleCount === 0);
  }

  /**
   * Mostra/esconde mensagem de "nenhum resultado"
   * @param {boolean} show - Se deve mostrar a mensagem
   */
  toggleNoResultsMessage(show) {
    let noResultsMsg = document.querySelector('.no-results-message');

    if (show && !noResultsMsg) {
      noResultsMsg = document.createElement('div');
      noResultsMsg.className = 'no-results-message text-center py-4';
      noResultsMsg.innerHTML = `
        <div class="alert alert-info">
          <h5>Nenhuma tecnologia encontrada</h5>
          <p>Tente ajustar sua busca ou filtro.</p>
        </div>
      `;
      this.stacksContainer?.appendChild(noResultsMsg);
    } else if (!show && noResultsMsg) {
      noResultsMsg.remove();
    }
  }

  /**
   * Configura interações com cards
   */
  setupCardInteractions() {
    // Delegação de eventos para cards dinâmicos
    document.addEventListener('click', e => {
      const stackCard = e.target.closest('.stack-card');
      if (stackCard) {
        this.handleStackCardClick(stackCard, e);
      }
    });

    // Hover effects já são tratados pelo módulo de animações
    // Aqui podemos adicionar funcionalidades específicas do portfolio
  }

  /**
   * Manipula clique em card de stack
   * @param {HTMLElement} card - Card clicado
   * @param {Event} event - Evento do clique
   */
  handleStackCardClick(card, event) {
    // Prevenir ação padrão se necessário
    event.preventDefault();

    const title = card.querySelector('.card-title').textContent;
    const description = card.querySelector('.card-text').textContent;

    // Expandir card ou mostrar modal com mais informações
    this.showStackDetails(title, description);
  }

  /**
   * Mostra detalhes de uma stack em modal
   * @param {string} title - Título da stack
   * @param {string} description - Descrição da stack
   */
  showStackDetails(title, description) {
    // Criar modal dinâmico se não existir
    let modal = document.querySelector('#stackModal');

    if (!modal) {
      modal = this.createStackModal();
      document.body.appendChild(modal);
    }

    // Atualizar conteúdo do modal
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-body p').textContent = description;

    // Mostrar modal (usando Bootstrap)
    if (window.bootstrap?.Modal) {
      const bsModal = new bootstrap.Modal(modal);
      bsModal.show();
    }
  }

  /**
   * Cria modal para detalhes de stack
   * @returns {HTMLElement} Elemento do modal
   */
  createStackModal() {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'stackModal';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-hidden', 'true');

    modal.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" 
                    aria-label="Fechar modal" title="Fechar"></button>
          </div>
          <div class="modal-body">
            <p></p>
            <div class="mt-3">
              <small class="text-muted">
                Esta é uma das tecnologias que utilizo em meus projetos.
              </small>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                    title="Fechar modal">Fechar</button>
          </div>
        </div>
      </div>
    `;

    return modal;
  }

  /**
   * Atualiza dados dos projetos dinamicamente
   * @param {Array} newProjects - Novos dados de projetos
   */
  updateProjects(newProjects) {
    // Esta funcionalidade pode ser expandida conforme necessário
    console.log('Atualizando projetos:', newProjects);
  }

  /**
   * Exporta dados do portfolio
   * @returns {Object} Dados do portfolio
   */
  exportData() {
    return {
      projects: PROJECTS_DATA,
      stacks: STACKS_DATA,
      filterState: this.filterState
    };
  }

  /**
   * Método público para acessar e re-animar stacks
   */
  refreshStackAnimations() {
    if (this.stacksContainer) {
      this.initializeStackAnimations();
    }
  }

  /**
   * Cleanup - remove event listeners
   */
  destroy() {
    // Parar de observar elementos das stacks se o módulo de animações estiver disponível
    const animationsModule = window.portfolioApp?.getModule('animations');
    if (animationsModule && typeof animationsModule.unobserveElements === 'function') {
      const stackCards = this.stacksContainer?.querySelectorAll('.animate-on-scroll');
      if (stackCards) {
        animationsModule.unobserveElements(stackCards);
      }
    }
  }
}

export default Portfolio;
