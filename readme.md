# Portfólio Modular - Augusto Santos

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-yellow.svg)
![Vite](https://img.shields.io/badge/bundler-Vite-646CFF.svg)

## 📋 Sobre o Projeto

Portfólio profissional completamente modularizado, seguindo as melhores práticas de desenvolvimento JavaScript moderno. O projeto foi reestruturado de uma aplicação monolítica para uma arquitetura modular, oferecendo melhor manutenibilidade, performance e escalabilidade.

## 🚀 Tecnologias e Ferramentas

### Frontend

- **JavaScript ES2022+** - Módulos nativos, classes modernas
- **CSS3 Modular** - Componentes isolados e reutilizáveis
- **HTML5 Semântico** - Estrutura acessível e SEO-friendly
- **Bootstrap 5.3** - Framework CSS responsivo

### Build e Desenvolvimento

- **Vite** - Build tool moderno e rápido
- **ESLint** - Linting de código
- **Prettier** - Formatação automática
- **Terser** - Minificação otimizada

### Backend (Opcional)

- **Node.js + Express** - Servidor para contato
- **Nodemailer** - Envio de emails

## 🏗️ Arquitetura Modular

```
📁 js/
├── 📁 config/
│   └── constants.js      # Configurações centralizadas
├── 📁 modules/
│   ├── navigation.js     # Módulo de navegação
│   ├── carousel.js       # Carrossel de projetos
│   └── animations.js     # Sistema de animações
├── 📁 components/
│   └── portfolio.js      # Componente de portfólio
├── 📁 utils/
│   └── helpers.js        # Funções utilitárias
└── main.js              # Orquestrador principal

📁 css/
├── 📁 components/
│   ├── navigation.css    # Estilos da navegação
│   ├── carousel.css      # Estilos do carrossel
│   ├── portfolio.css     # Estilos do portfólio
│   └── animations.css    # Animações e efeitos
└── main.css             # CSS principal e imports
```

## ✨ Funcionalidades

### 🎨 Interface e UX

- ✅ Design responsivo e moderno
- ✅ Animações suaves com scroll reveal
- ✅ Tema adaptável (preparado para dark mode)
- ✅ Carousel interativo de projetos
- ✅ Navegação suave entre seções
- ✅ Loading states e feedback visual

### 🔧 Tecnicamente

- ✅ Módulos ES6+ nativos
- ✅ Sistema de componentes reutilizáveis
- ✅ Lazy loading de imagens
- ✅ Service Worker ready
- ✅ Performance otimizada
- ✅ SEO e acessibilidade

### 🎯 Funcionalidades Específicas

- ✅ Busca e filtro de tecnologias
- ✅ Modal de detalhes das stacks
- ✅ Navegação por teclado
- ✅ Gestos touch/swipe
- ✅ Indicadores de progresso

## 🚀 Como Executar

### Desenvolvimento Local

```bash
# Clonar o repositório
git clone https://github.com/AugustoArand/portifolio-augusto.git
cd portifolio-augusto

# Instalar dependências (opcional - apenas se usar package.json)
npm install

# Servidor de desenvolvimento (se usar Vite)
npm run dev

# Ou simplesmente abrir index.html no navegador
# Para servir localmente com Live Server ou similar
```

### 🌐 Deploy no GitHub Pages

Este projeto está configurado para deploy automático no GitHub Pages!

#### Configuração Automática

1. **Push para main**: O deploy acontece automaticamente a cada push na branch `main`
2. **GitHub Actions**: Workflow configurado em `.github/workflows/deploy.yml`
3. **Acesso**: Site disponível em `https://AugustoArand.github.io/portifolio-augusto`

#### Configuração Manual (se necessário)

1. Vá em **Settings** > **Pages** no seu repositório
2. Em **Source**, selecione **GitHub Actions**
3. O workflow será executado automaticamente

#### Estrutura para GitHub Pages

```bash
# Arquivos essenciais que devem estar no repositório:
✅ index.html              # Página principal na raiz
✅ assets/                 # Imagens e recursos
✅ css/                    # Estilos
✅ js/                     # JavaScript
✅ .nojekyll               # Desabilita Jekyll
✅ .github/workflows/      # Actions para deploy automático
```

### Produção (Build Local)

```bash
# Build para produção (se usar build process)
npm run build

# Preview do build
npm run preview

# Servir arquivos estáticos
npm run serve
```

### Backend (Opcional)

```bash
# Servidor Express para formulário de contato
npm start

# Desenvolvimento com nodemon
npm run start:dev
```

## 📂 Estrutura de Arquivos

```
portifolio-augusto/
├── 📄 index.html           # Página principal
├── 📄 blog.html           # Página de projetos
├── 📄 package.json        # Dependências e scripts
├── 📄 vite.config.js      # Configuração do Vite
├── 📄 .eslintrc.json      # Configuração do ESLint
├── 📄 .prettierrc.json    # Configuração do Prettier
├── 📁 js/                 # JavaScript modular
├── 📁 css/                # CSS modular
├── 📁 assets/             # Imagens e recursos
└── 📁 dist/               # Build de produção
```

## 🎯 Melhorias Implementadas

### Antes (Monolítico)

- ❌ Código JavaScript inline
- ❌ CSS não organizado
- ❌ Funcionalidades acopladas
- ❌ Difícil manutenção
- ❌ Performance limitada

### Depois (Modular)

- ✅ Módulos ES6+ isolados
- ✅ CSS componentizado
- ✅ Separação de responsabilidades
- ✅ Fácil manutenção e testes
- ✅ Performance otimizada
- ✅ Build process moderno
- ✅ Code splitting automático
- ✅ Tree shaking
- ✅ Compatibilidade com browsers antigos

## 🎨 Design System

### Cores

```css
--primary-color: #007bff --secondary-color: #6c757d --success-color: #28a745 --danger-color: #dc3545;
```

### Animações

- Fade in/out
- Slide in (left, right, up, down)
- Scale transitions
- Parallax effects
- Loading states

### Componentes

- Cards responsivos
- Navegação adaptativa
- Carousel interativo
- Modais acessíveis
- Formulários validados

## 📱 Responsividade

- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: 576px, 768px, 992px, 1200px
- **Touch Friendly**: Gestos e interações touch
- **Performance**: Otimizado para conexões lentas

## ♿ Acessibilidade

- **ARIA Labels**: Navegação assistiva completa
- **Keyboard Navigation**: Navegação por teclado
- **High Contrast**: Suporte a modo alto contraste
- **Reduced Motion**: Respeita preferências de animação
- **Screen Readers**: Compatível com leitores de tela

## 🔧 Configurações de Build

### Vite

- **Hot Module Replacement** para desenvolvimento rápido
- **Code Splitting** automático
- **Tree Shaking** para bundles menores
- **Legacy Support** para browsers antigos

### Otimizações

- **Terser** para minificação JavaScript
- **CSS Purging** para remoção de CSS não utilizado
- **Image Optimization** para carregamento rápido
- **Gzip Compression** para assets menores

## 🌐 Troubleshooting GitHub Pages

### Problemas Comuns

**1. Site não carrega após deploy**

```bash
# Verificar se os arquivos estão na branch correta
git checkout main
git push origin main

# Verificar se o workflow executou
# Ir em Actions > Deploy to GitHub Pages
```

**2. Arquivos CSS/JS não carregam**

```bash
# Verificar caminhos relativos no HTML
# Usar ./ em vez de / para caminhos relativos
# Exemplo: ./css/main.css em vez de /css/main.css
```

**3. Imagens não aparecem**

```bash
# Verificar se as imagens estão commitadas
git add assets/img/
git commit -m "Add images"
git push

# Verificar caminhos das imagens no código
```

**4. JavaScript modules não funcionam**

```bash
# Certificar-se de que o servidor suporta MIME types corretos
# O arquivo .nojekyll está presente para GitHub Pages
```

### Logs de Debug

```bash
# Ver logs do GitHub Actions
1. Ir na aba "Actions" do repositório
2. Clicar no workflow "Deploy to GitHub Pages"
3. Verificar logs de erro

# Debug local
1. Abrir DevTools (F12)
2. Verificar console para erros
3. Verificar Network tab para recursos não carregados
```

### Checklist de Deploy

- [ ] `index.html` está na raiz do repositório
- [ ] Todos os assets estão commitados (CSS, JS, imagens)
- [ ] Caminhos são relativos (começam com `./`)
- [ ] Arquivo `.nojekyll` está presente
- [ ] GitHub Actions tem permissões de Pages
- [ ] Branch `main` está atualizada

## 📈 Performance

### Métricas Alvo

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Técnicas Utilizadas

- Lazy loading de imagens
- Code splitting por rota
- Preload de recursos críticos
- Service Worker para cache
- Minificação e compressão

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Augusto Santos**

- LinkedIn: [Augusto Arandiba](https://www.linkedin.com/in/augusto-arandiba-b26b90105/)
- GitHub: [@AugustoArand](https://github.com/AugustoArand)
- Email: [contato](mailto:seuemail@email.com)

---

⚡ **Desenvolvido com foco em performance, acessibilidade e manutenibilidade**
