# Seção de Artigos do LinkedIn

Esta seção exibe seus artigos publicados no LinkedIn de forma profissional e atraente.

## Como Atualizar os Artigos

Os artigos são configurados no arquivo `js/modules/articles.js`. Para adicionar ou editar seus artigos:

1. Abra o arquivo `js/modules/articles.js`
2. Localize o array `articles` no início do arquivo
3. Adicione ou edite os artigos seguindo o formato abaixo:

```javascript
{
  id: 1, // ID único do artigo
  title: "Título do Seu Artigo", // Título completo
  description: "Breve descrição do conteúdo do artigo...", // Resumo (2-3 linhas)
  date: "2024-11-15", // Data no formato YYYY-MM-DD
  url: "URL_COMPLETA_DO_ARTIGO", // Link direto para o artigo no LinkedIn
  category: "Categoria", // Ex: "Carreira", "Tecnologia", "QA & Testes", etc.
  image: null // Mantém null para usar ícone automático
}
```

## Categorias e Ícones

As categorias disponíveis e seus respectivos ícones são:

- **Carreira** 💼
- **QA & Testes** 🧪
- **Desenvolvimento** 💻
- **Certificações** 🏆
- **Frontend** 🎨
- **Database** 🗄️
- **Padrão** 📝 (para outras categorias)

Você pode adicionar novas categorias editando a função `getCategoryIcon()` no arquivo `articles.js`.

## Recursos da Seção

### Design Profissional
- Cards modernos com efeito hover
- Animações suaves de entrada
- Design responsivo para todos os dispositivos
- Cores e sombras harmoniosas

### Funcionalidades
- Formatação automática de datas em português
- Ícones baseados em categorias
- Links diretos para os artigos no LinkedIn
- Badge de categoria para cada artigo
- Botão "Ver Todos os Artigos" que leva ao seu perfil

### Responsividade
- Desktop: 3 colunas
- Tablet: 2 colunas
- Mobile: 1 coluna

## Exemplo Completo

```javascript
const articles = [
  {
    id: 1,
    title: "Como Iniciar na Área de QA",
    description: "Neste artigo, compartilho dicas práticas para quem está começando na área de Quality Assurance e testes de software.",
    date: "2024-12-01",
    url: "https://www.linkedin.com/pulse/seu-artigo-url/",
    category: "QA & Testes",
    image: null
  },
  {
    id: 2,
    title: "JavaScript Moderno: ES6+ Features",
    description: "Explorando as principais funcionalidades do JavaScript moderno que todo desenvolvedor deveria conhecer.",
    date: "2024-11-20",
    url: "https://www.linkedin.com/pulse/seu-artigo-url-2/",
    category: "Desenvolvimento",
    image: null
  }
];
```

## Personalização de Estilos

Para personalizar cores e estilos, edite o arquivo `css/components/articles.css`:

- **Cores principais**: Edite as variáveis CSS no início do arquivo
- **Tamanho dos cards**: Modifique `.article-card-img` height
- **Sombras**: Ajuste `box-shadow` em `.article-card`
- **Animações**: Modifique os valores de `transition` e `transform`

## Navegação

A seção de artigos foi automaticamente adicionada ao menu de navegação principal. Os usuários podem:
- Clicar em "Artigos" no menu superior
- Rolar até a seção de artigos
- Clicar em qualquer card para abrir o artigo no LinkedIn

## Suporte

Se encontrar problemas ou tiver dúvidas, verifique:
1. Console do navegador para erros JavaScript
2. Se todos os arquivos foram salvos corretamente
3. Se o servidor de desenvolvimento está rodando

Aproveite sua nova seção de artigos! 🚀
