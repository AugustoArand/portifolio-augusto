/**
 * Constantes da aplicação
 * Centraliza todos os valores constantes utilizados no portfólio
 */

export const APP_CONFIG = {
  // Configurações gerais
  APP_NAME: 'Portfólio | Currículo',
  AUTHOR: 'Augusto Santos',
  AUTHOR_FULL_NAME: 'Augusto Arand',
  
  // URLs externas
  URLS: {
    LINKEDIN: 'https://www.linkedin.com/in/augusto-arandiba-b26b90105/',
    GITHUB: 'https://github.com/AugustoArand',
    EMAIL: 'augustoarandiba@email.com'
  },
  
  // Configurações de animação
  ANIMATION: {
    SCROLL_OFFSET: 100,
    SCROLL_DURATION: 800,
    FADE_IN_DURATION: 600,
    CAROUSEL_INTERVAL: 5000
  },
  
  // Breakpoints responsivos
  BREAKPOINTS: {
    MOBILE: 768,
    TABLET: 992,
    DESKTOP: 1200
  },
  
  // Classes CSS utilizadas
  CSS_CLASSES: {
    NAVBAR_SCROLLED: 'navbar-scrolled',
    FADE_IN: 'fade-in',
    SLIDE_IN_LEFT: 'slide-in-left',
    SLIDE_IN_RIGHT: 'slide-in-right',
    VISIBLE: 'visible'
  }
};

export const DOM_SELECTORS = {
  // Navegação
  NAVBAR: '.navbar',
  NAVBAR_TOGGLER: '.navbar-toggler',
  NAVBAR_COLLAPSE: '.navbar-collapse',
  NAV_LINKS: '.nav-link',
  
  // Seções principais
  SECTIONS: {
    ABOUT: '#sobre-mim',
    PROJECTS: '#projetos',
    STACKS: '#stacks-conhecidas'
  },
  
  // Carousel
  CAROUSEL: '#carouselExampleCaptions',
  CAROUSEL_ITEMS: '.carousel-item',
  CAROUSEL_CONTROLS: '.carousel-control-prev, .carousel-control-next',
  
  // Cards
  CARDS: '.card',
  STACK_CARDS: '.stack-img',
  PROJECT_CARDS: '.project-img',
  
  // Formulários
  CONTACT_FORM: '#contact-form',
  FORM_INPUTS: 'input, textarea',
  
  // Elementos interativos
  BACK_BUTTON: '.back-btn',
  EXTERNAL_LINKS: 'a[target="_blank"]'
};

export const PROJECTS_DATA = [
  {
    title: 'Pig Game',
    description: 'Um mini game desenvolvido em através de JS, HTML e CSS',
    image: './img/pig-game.PNG',
    url: 'https://augustoarand.github.io/pig-game'
  },
  {
    title: 'Adivinhe meu número',
    description: 'Um mini game desenvolvido em através de JS, HTML e CSS.',
    image: './img/guess-my-number.PNG',
    url: 'https://augustoarand.github.io/guess-my-number/'
  },
  {
    title: 'Simulador de Conta Bancária',
    description: 'Desenvolvido em JS | CSS e HTML',
    image: './img/bank-app-new.PNG',
    url: 'https://augustoarand.github.io/Bank-App/'
  },
  {
    title: 'Gerenciador de Atividades Físicas',
    description: 'Desenvolvido em JS | CSS | HTML | Leatflet.js',
    image: './img/mapty.PNG',
    url: 'https://augustoarand.github.io/mapty-exercise/'
  },
  {
    title: 'Gerador de QR Code e Senhas',
    description: 'Desenvolvido em Node.js | Geração Direto no Prompt',
    image: './img/qr-code.PNG',
    url: 'https://augustoarand.github.io'
  },
  {
    title: 'Página Divulgação - Evento',
    description: 'Front end Desenvolvido em Bootstrap',
    image: './img/riot-games-convention.PNG',
    url: 'https://augustoarand.github.io/project-riot-games-convention/'
  },
  {
    title: 'Site Airbnb- Demo',
    description: 'Projeto desenvolvido em React + Next.js consumindo a API pública da própria Airbnb',
    image: './img/airbnb-demo.PNG',
    url: '#'
  }
];

export const STACKS_DATA = [
  {
    title: 'JavaScript|HTML|CSS',
    description: 'Desenvolvimento de aplicações front e back end',
    image: './img/JS.jpg'
  },
  {
    title: 'Node.js|Express.js',
    description: 'Desenvolvimento de APIs e RestAPIs, aplicações web com arquitetura MVC.',
    image: './img/node.png'
  },
  {
    title: 'SQL|Postgres',
    description: 'Consulta e Gerenciamento de Banco de Dados Relacionais',
    image: './img/postgres.png'
  },
  {
    title: 'Excel | PowerBI',
    description: 'Análise de dados e construção de dashboards interativos.',
    image: './img/excel+powerbi.png'
  },
  {
    title: 'Cypress',
    description: 'Automações Front e Back End, integração com Cypress Cloud e GitHub Actions',
    image: './img/cypress.png'
  },
  {
    title: 'Robot Framework',
    description: 'Automações Front e Back End, Integração com Selenium e Appium',
    image: './img/robot-framework.png'
  },
  {
    title: 'Jira & Zephyr',
    description: 'Gestão de projetos, criação de pipelines, gerenciamento e report de bugs.',
    image: './img/jira.jpg'
  },
  {
    title: 'Postman',
    description: 'Testes de APIs RESTful e automação de requisições.',
    image: './img/postman.png'
  },
  {
    title: 'Jmeter Apache',
    description: 'Testes de carga e performance',
    image: './img/jmeter.png'
  },
  {
    title: 'Certificações',
    description: 'Certificado em CPRE-FL e Scrum Fundamentals. Base sólida no CTFL-FL e CTFL-AT (Sem Certificação).',
    image: './img/bsqtb.png'
  },
  {
    title: 'React | Next.js',
    description: 'Desenvolvimento de projetos web utilizando React e Next.js.',
    image: './img/react-next.png'
  },
  {
    title: 'Prisma ORM',
    description: 'Conhecimento em mapeamento objeto-relacional e uso do Prisma para acesso a dados em aplicações Node.js.',
    image: './img/prisma-orm.jpg'
  }
];