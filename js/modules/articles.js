/**
 * Módulo de Artigos do LinkedIn
 * Gerencia a exibição e interação com os artigos publicados
 */

/**
 * Dados dos artigos
 * Nota: Estes são dados de exemplo. O usuário pode atualizar com seus próprios artigos.
 */
const articles = [
  {
    id: 1,
    title: "Dose Diária de CTFL Tester Foundation - Cap. 06 - Ferramentas de Teste",
    description: "As ferramentas de teste podem ser divididas em algumas categorias, e algumas delas podem contemplar todas as necessidades.",
    date: "2025-10-29",
    url: "https://www.linkedin.com/pulse/dose-di%C3%A1ria-de-ctfl-tester-foundation-cap-06-teste-arandiba-e7fff",
    category: "Certificação",
    image: null // Será usado placeholder
  },
  {
    id: 2,
    title: "Dose Diária de CTFL Tester Foundation - Cap. 04 - Análise e Modelagem de Teste",
    description: " O objetivo principal é garantir que os testes sejam completos, eficientes e cubram adequadamente a funcionalidade do sistema.",
    date: "2025-10-22",
    url: "https://www.linkedin.com/pulse/dose-di%C3%A1ria-de-ctfl-tester-foundation-cap-04-an%C3%A1lise-arandiba-4y5bf/",
    category: "Certificação",
    image: null
  },
  {
    id: 3,
    title: "Dose Diária de CTFL Agile Tester - Cap. 02 - Principios Fundamentais, Práticas e Processos do Teste Ágil",
    description: "Durante meus estudos desta certificação, foi possível extrair alguns insights sobre a rotina de equipes que trabalham com a metodologia ágil e o sistema scrumbam (Scrum + Kanban)",
    date: "2025-10-06",
    url: "https://www.linkedin.com/pulse/dose-di%C3%A1ria-de-ctfl-agile-tester-cap-02-principios-e-arandiba-qr7mc",
    category: "Certificação",
    image: null
  },
  {
    id: 4,
    title: "Dose Diária de CTFL Tester Foundation- Cap. 02 - Tipos de Teste.",
    description: "No CTFL Syllabus os níveis de teste são etapas completamente distintas dentro do processo de teste de software, dado que cada uma tem seus objetivos específicos, cargos responsáveis e o artefatos gerados em cada uma delas.",
    date: "2025-09-09",
    url: "https://www.linkedin.com/pulse/dose-di%C3%A1ria-de-ctfl-foundation-level-cap-02-tipos-teste-arandiba-6ktdf/",
    category: "Certificação",
    image: null
  },
  {
    id: 5,
    title: "Dose Diária CTFL Tester Foundation - Cap. 02",
    description: "Os testes ao longo do SDLC (Software Development Life Cycle), descrevem os tipos de atividades realizadas em cada estágio de um projeto, sua lógica, cronologia e entre outros.",
    date: "2025-09-02",
    url: "https://www.linkedin.com/pulse/dose-di%C3%A1ria-ctfl-foundation-level-cap-02-augusto-arandiba-xjr2f",
    category: "Certificação",
    image: null
  },
  {
    id: 6,
    title: "[EM BREVE] Dicas para aprovação na certificação CPRE-FL",
    description: "Dicas de estudos e materiais para a certificação CPRE-FL (Certified Professional for Requirements Engineering - Foundation Level)",
    date: "2025-??-?",
    url: "https://www.linkedin.com/in/augusto-arandiba-b26b90105/recent-activity/articles/",
    category: "certificação",
    image: null
  }
];

/**
 * Formata uma data para o formato brasileiro
 * @param {string} dateString - Data no formato YYYY-MM-DD
 * @returns {string} Data formatada
 */
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', options);
}

/**
 * Gera um ícone de placeholder baseado na categoria
 * @param {string} category - Categoria do artigo
 * @returns {string} Emoji representando a categoria
 */
function getCategoryIcon(category) {
  const icons = {
    'Carreira': '💼',
    'QA & Testes': '🧪',
    'Desenvolvimento': '💻',
    'Certificações': '🏆',
    'Frontend': '🎨',
    'Database': '🗄️',
    'default': '📝'
  };
  
  return icons[category] || icons.default;
}

/**
 * Cria um card de artigo
 * @param {Object} article - Dados do artigo
 * @returns {string} HTML do card
 */
function createArticleCard(article) {
  const icon = getCategoryIcon(article.category);
  const formattedDate = formatDate(article.date);
  
  return `
    <div class="col-12 col-md-6 col-lg-4 animate-on-scroll fade-in">
      <div class="article-card">
        <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="article-link">
          <div class="article-card-img placeholder">
            <span style="font-size: 4rem;">${icon}</span>
          </div>
          <div class="article-card-body">
            <h3 class="article-card-title">${article.title}</h3>
            <p class="article-card-description">${article.description}</p>
            <div class="article-card-meta">
              <span class="article-date">${formattedDate}</span>
              <span class="article-badge">${article.category}</span>
            </div>
            <div class="mt-3">
              <span class="article-read-btn">Ler Artigo</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  `;
}

/**
 * Renderiza todos os artigos na página
 */
function renderArticles() {
  const container = document.getElementById('articles-container');
  
  if (!container) {
    console.warn('Container de artigos não encontrado');
    return;
  }
  
  // Mostra estado de loading
  container.innerHTML = '<div class="col-12 articles-loading">Carregando artigos...</div>';
  
  // Simula um pequeno delay para melhor UX
  setTimeout(() => {
    if (articles.length === 0) {
      container.innerHTML = `
        <div class="col-12 articles-empty">
          <p>Nenhum artigo disponível no momento.</p>
        </div>
      `;
      return;
    }
    
    // Renderiza os artigos
    const articlesHTML = articles.map(article => createArticleCard(article)).join('');
    container.innerHTML = articlesHTML;
    
    // Aguarda o DOM ser atualizado e então aplica as animações
    requestAnimationFrame(() => {
      const articleCards = container.querySelectorAll('.animate-on-scroll');
      
      // Se houver um Intersection Observer disponível globalmente, usa ele
      const event = new CustomEvent('newElementsAdded', {
        detail: { elements: articleCards }
      });
      document.dispatchEvent(event);
    });
  }, 500);
}

/**
 * Inicializa o módulo de artigos
 */
export function initArticles() {
  console.log('Módulo de artigos inicializado');
  
  // Renderiza os artigos quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderArticles);
  } else {
    renderArticles();
  }
}

// Exporta os dados para possível uso externo
export { articles, formatDate, getCategoryIcon };
