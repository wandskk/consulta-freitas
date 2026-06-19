# Consulta Freitas

Aplicação web desenvolvida com **Next.js**, **TypeScript**, **Tailwind CSS**, **MySQL** e **SQL Server**, criada para consulta rápida de produtos, preços, estoque e simulação de carrinho.

O projeto foi pensado para uso interno em loja de materiais de construção, permitindo que vendedores pesquisem produtos por **nome**, **código interno** ou **código de barras**, adicionem itens a um **carrinho local** e simulem valores no **cartão** e **à vista** com desconto configurável.

Durante o desenvolvimento local, a aplicação utiliza uma base fictícia em **MySQL/XAMPP**. Em ambiente real, ela está preparada para consultar o banco **SQL Server** utilizado pelo sistema **ETrade / VR Sistemas**, usando um usuário com permissão somente leitura.

---

## Sumário

* [Objetivo](#objetivo)
* [Demonstração do fluxo](#demonstração-do-fluxo)
* [Tecnologias utilizadas](#tecnologias-utilizadas)
* [Funcionalidades](#funcionalidades)
* [Arquitetura](#arquitetura)
* [Estrutura de pastas](#estrutura-de-pastas)
* [Bancos de dados suportados](#bancos-de-dados-suportados)
* [Requisitos](#requisitos)
* [Instalação](#instalação)
* [Configuração do ambiente](#configuração-do-ambiente)
* [Seed local com MySQL](#seed-local-com-mysql)
* [Rodando o projeto](#rodando-o-projeto)
* [PWA](#pwa)
* [Carrinho e desconto à vista](#carrinho-e-desconto-à-vista)
* [Endpoints da API](#endpoints-da-api)
* [Integração com SQL Server](#integração-com-sql-server)
* [Segurança](#segurança)
* [Scripts disponíveis](#scripts-disponíveis)
* [Commits sugeridos](#commits-sugeridos)
* [Boas práticas aplicadas](#boas-práticas-aplicadas)
* [Checklist de testes](#checklist-de-testes)
* [Melhorias futuras](#melhorias-futuras)
* [Status do projeto](#status-do-projeto)
* [Autor](#autor)

---

## Objetivo

O objetivo do projeto é criar uma interface de consulta rápida para produtos, exibindo informações essenciais para operação de loja, como:

* Código interno do produto
* Nome do produto
* Código de barras / EAN
* Preço de venda no cartão
* Preço à vista com desconto
* Estoque atual
* Localização
* Situação do estoque
* Carrinho local para simulação de venda

A aplicação foi estruturada com foco em:

* Separação de responsabilidades
* Código limpo e organizado
* Facilidade para manutenção
* Troca simples entre banco fake local e banco real
* Uso como projeto de portfólio
* Boas práticas com Next.js, TypeScript e arquitetura em camadas
* Experiência mobile com PWA instalável
* Persistência local por dispositivo usando `localStorage`

---

## Demonstração do fluxo

```txt
Usuário pesquisa produto no frontend
↓
Hook useProducts controla estado da busca
↓
ProductApiService chama /api/products
↓
API Route recebe search e limit
↓
ProductService aplica regras de negócio
↓
ProductRepository busca no banco configurado
↓
MySQL local ou SQL Server real
↓
API retorna JSON padronizado
↓
Frontend exibe cards de produtos
↓
Usuário adiciona produtos ao carrinho
↓
CartContext persiste carrinho no localStorage
↓
App calcula total no cartão, total à vista e desconto
```

---

## Tecnologias utilizadas

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Context API
* PWA
* Service Worker
* Web App Manifest
* localStorage

### Backend / API

* Next.js Route Handlers
* TypeScript
* Repository Pattern
* Service Layer

### Banco de dados

* MySQL
* SQL Server

### Drivers

* mysql2
* mssql

### Ferramentas

* XAMPP
* SQL Server Management Studio
* Git
* VSCode
* Codex

---

## Funcionalidades

### Consulta de produtos

* Busca de produtos por nome
* Busca por código interno
* Busca por código de barras / EAN
* Busca automática com debounce
* Listagem responsiva de produtos
* Exibição de preço formatado em Real
* Exibição de preço no cartão
* Exibição de preço à vista com desconto
* Exibição do valor economizado à vista
* Exibição de estoque atual
* Identificação visual de estoque:

  * Disponível
  * Baixo
  * Zerado
  * Negativo
* Botão para copiar código do produto

### Carrinho

* Adicionar produto ao carrinho
* Adicionar mais de uma unidade do mesmo produto
* Exibir quantidade do produto já adicionada
* Remover produto do carrinho
* Aumentar quantidade
* Diminuir quantidade
* Alterar quantidade manualmente
* Limpar carrinho
* Carrinho salvo no `localStorage`
* Carrinho independente por dispositivo/celular
* Página `/cart` para conferência
* Navbar inferior com resumo do carrinho
* Badge no header com quantidade de itens

### Valores e desconto

* Total no cartão
* Total à vista
* Valor economizado no à vista
* Percentual de desconto à vista editável
* Desconto padrão de 10%
* Percentual salvo no `localStorage`
* Alteração do desconto reflete automaticamente:

  * na listagem de produtos
  * nos cards
  * na barra inferior
  * na página do carrinho

### PWA

* Manifest configurado
* Service Worker configurado
* App instalável pelo navegador
* Modo standalone
* Start URL em `/products`
* Ícones configurados
* Preparado para uso em smartphone

### Banco e arquitetura

* Health check de conexão com banco
* Suporte a MySQL fake local
* Suporte preparado para SQL Server real
* Alternância de banco via variável de ambiente
* Arquitetura separada em camadas

---

## Arquitetura

A aplicação segue uma arquitetura em camadas:

```txt
Frontend
↓
Hooks
↓
Client Services
↓
API Routes
↓
Server Services
↓
Repositories
↓
Database
```

### Fluxo do carrinho

```txt
ProductCard
↓
useCart
↓
CartContext
↓
cart.helper.ts
↓
localStorage
↓
UI atualizada automaticamente
```

### Camadas principais

| Camada       | Responsabilidade                                          |
| ------------ | --------------------------------------------------------- |
| app          | Rotas, páginas e API Routes do Next.js                    |
| components   | Componentes visuais da interface                          |
| contexts     | Contextos globais da aplicação                            |
| hooks        | Controle de estado e regras de interação no frontend      |
| services     | Comunicação com API e regras de negócio                   |
| repositories | Comunicação direta com banco de dados                     |
| lib          | Configuração de conexões externas                         |
| helpers      | Funções auxiliares de formatação, cálculo e transformação |
| utils        | Utilitários genéricos                                     |
| types        | Tipagens TypeScript                                       |
| constants    | Constantes globais da aplicação                           |
| config       | Configurações centralizadas                               |

---

## Estrutura de pastas

```txt
src/
├── app/
│   ├── api/
│   │   ├── health/
│   │   │   └── db/
│   │   │       └── route.ts
│   │   └── products/
│   │       └── route.ts
│   │
│   ├── cart/
│   │   └── page.tsx
│   │
│   ├── products/
│   │   └── page.tsx
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── cart/
│   │   ├── bottom-cart-bar.tsx
│   │   ├── cart-empty-state.tsx
│   │   ├── cart-item-card.tsx
│   │   ├── cart-summary.tsx
│   │   └── cash-discount-control.tsx
│   │
│   ├── layout/
│   │   ├── app-footer.tsx
│   │   ├── app-header.tsx
│   │   └── app-shell.tsx
│   │
│   ├── products/
│   │   ├── product-card.tsx
│   │   ├── product-list.tsx
│   │   └── product-search.tsx
│   │
│   ├── providers/
│   │   └── app-providers.tsx
│   │
│   ├── ui/
│   └── pwa-register.tsx
│
├── config/
│   └── database.ts
│
├── constants/
│   ├── cart.constants.ts
│   └── product.constants.ts
│
├── contexts/
│   └── cart-context.tsx
│
├── helpers/
│   ├── cart.helper.ts
│   ├── clipboard.helper.ts
│   ├── currency.helper.ts
│   ├── local-storage.helper.ts
│   ├── product.helper.ts
│   └── stock.helper.ts
│
├── hooks/
│   ├── use-debounce.ts
│   └── use-products.ts
│
├── lib/
│   ├── mysql.ts
│   └── sqlserver.ts
│
├── repositories/
│   ├── product.mysql.repository.ts
│   ├── product.repository.factory.ts
│   ├── product.repository.ts
│   └── product.sqlserver.repository.ts
│
├── services/
│   ├── product-api.service.ts
│   └── product.service.ts
│
├── types/
│   ├── cart.ts
│   └── product.ts
│
└── utils/
    ├── api-response.ts
    └── env.ts

database/
└── seed-mysql.sql

public/
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
├── manifest.webmanifest
└── sw.js
```

---

## Bancos de dados suportados

A aplicação foi preparada para funcionar com dois tipos de banco.

### MySQL

Usado durante o desenvolvimento local, com dados fictícios importados via XAMPP/phpMyAdmin.

```env
DB_DRIVER=mysql
```

### SQL Server

Usado no ambiente real, consultando a base do sistema ETrade / VR Sistemas.

```env
DB_DRIVER=sqlserver
```

A troca entre os bancos é feita pela variável `DB_DRIVER`, sem necessidade de alterar a interface ou os componentes visuais.

---

## Requisitos

Para rodar localmente, é recomendado ter instalado:

* Node.js 20 ou superior
* npm
* Git
* XAMPP
* MySQL ativo pelo XAMPP

Para integração real com a base da loja:

* SQL Server
* SQL Server Management Studio
* Acesso ao banco `banco`
* Usuário SQL Server com permissão somente leitura

---

## Instalação

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta do projeto:

```bash
cd consulta-freitas
```

Instale as dependências:

```bash
npm install
```

Instale os drivers de banco, caso ainda não estejam instalados:

```bash
npm install mysql2 mssql
npm install -D @types/mssql
```

---

## Configuração do ambiente

Crie um arquivo chamado `.env.local` na raiz do projeto.

```env
DB_DRIVER=mysql

MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=consulta_freitas

SQLSERVER_USER=devwk
SQLSERVER_PASSWORD=
SQLSERVER_SERVER=localhost
SQLSERVER_INSTANCE=SQL2019FULL
SQLSERVER_DATABASE=ETrade
SQLSERVER_ENCRYPT=false
SQLSERVER_TRUST_CERT=true
SQLSERVER_PRICE_TABLE_ID=11627049-F321-42DE-A3ED-4101BADDBC32
```

### Observação sobre MySQL local

No XAMPP, normalmente o MySQL usa:

```env
MYSQL_USER=root
MYSQL_PASSWORD=
```

Ou seja, usuário `root` sem senha.

Mesmo acessando o app pelo celular usando o IP do PC, o ideal é manter:

```env
MYSQL_HOST=localhost
```

Isso acontece porque quem consulta o banco é o servidor Next.js rodando no PC, não o celular.

---

## Seed local com MySQL

O projeto possui uma seed fictícia em:

```txt
database/seed-mysql.sql
```

Essa seed cria o banco:

```txt
consulta_freitas
```

E a tabela:

```txt
products
```

Com campos semelhantes aos dados usados pela aplicação:

```txt
id
codigo
nome
codigo_ean
preco
estoque
localizacao
inativo
bloqueado
bloqueado_para_venda
created_at
updated_at
```

### Como importar a seed

1. Abra o XAMPP.
2. Inicie o Apache.
3. Inicie o MySQL.
4. Acesse:

```txt
http://localhost/phpmyadmin
```

5. Clique na aba SQL.
6. Cole o conteúdo do arquivo:

```txt
database/seed-mysql.sql
```

7. Execute.

### Testar a seed

No phpMyAdmin, execute:

```sql
USE consulta_freitas;

SELECT * FROM products;
```

Se os produtos aparecerem, a base local está pronta.

---

## Rodando o projeto

Com o MySQL ativo no XAMPP, rode:

```bash
npm run dev
```

Acesse:

```txt
http://localhost:3000
```

A aplicação redireciona automaticamente para:

```txt
http://localhost:3000/products
```

### Rodar acessível na rede local

Para acessar pelo celular na mesma rede Wi-Fi:

```bash
npm run dev -- -H 0.0.0.0
```

Ou configure o `package.json`:

```json
{
  "scripts": {
    "dev": "next dev -H 0.0.0.0",
    "build": "next build",
    "start": "next start -H 0.0.0.0"
  }
}
```

Depois acesse no celular:

```txt
http://IP_DO_PC:3000/products
```

Exemplo:

```txt
http://192.168.1.105:3000/products
```

---

## PWA

A aplicação possui suporte a PWA, com:

* Manifest
* Service Worker
* Ícones
* Modo standalone
* Start URL em `/products`

### Instalação no PC

Em ambiente local no PC, o navegador pode permitir instalação usando:

```txt
http://localhost:3000/products
```

### Instalação no smartphone

Em smartphones, para instalação como PWA completo, normalmente é necessário acessar por HTTPS.

Você pode usar Cloudflare Tunnel:

```bash
npx cloudflared tunnel --url http://localhost:3000
```

Ou ngrok:

```bash
ngrok http 3000
```

Depois acesse no celular a URL HTTPS gerada.

Acessos por IP local, como:

```txt
http://192.168.1.105:3000/products
```

podem funcionar para testes, mas normalmente não liberam instalação como PWA no Chrome Android por não serem HTTPS.

---

## Carrinho e desconto à vista

O carrinho foi criado para simulação e conferência de valores. Ele não finaliza compra.

### Como funciona

* O usuário pesquisa produtos.
* Cada produto possui botão para adicionar ao carrinho.
* O carrinho fica salvo no `localStorage` do dispositivo.
* O desconto à vista também fica salvo no `localStorage`.
* O desconto padrão é 10%.
* O usuário pode alterar o percentual.
* Os valores são recalculados automaticamente.

### Dados persistidos

O carrinho usa as chaves:

```txt
@consulta-freitas:cart
@consulta-freitas:cash-discount
```

### Cálculos

A aplicação calcula:

```txt
total no cartão
total à vista
valor economizado
quantidade total de itens
```

O preço à vista segue a fórmula:

```txt
preço à vista = preço do produto - percentual de desconto
```

Exemplo com 10%:

```txt
Produto: R$ 100,00
Desconto: 10%
À vista: R$ 90,00
Economia: R$ 10,00
```

---

## Endpoints da API

### Health check do banco

Verifica se a aplicação consegue se conectar ao banco configurado.

```http
GET /api/health/db
```

Exemplo de resposta:

```json
{
  "success": true,
  "data": {
    "database": "mysql",
    "result": [
      {
        "status": 1
      }
    ]
  }
}
```

---

### Buscar produtos

Busca produtos por nome, código interno ou código de barras.

```http
GET /api/products?search=cimento
```

Com limite:

```http
GET /api/products?search=cimento&limit=20
```

### Parâmetros

| Parâmetro | Tipo   | Obrigatório | Descrição                                       |
| --------- | ------ | ----------- | ----------------------------------------------- |
| search    | string | Sim         | Termo usado para buscar por nome, código ou EAN |
| limit     | number | Não         | Limite de resultados retornados                 |

### Exemplo de resposta

```json
{
  "success": true,
  "data": {
    "total": 1,
    "products": [
      {
        "id": 1,
        "codigo": "2",
        "nome": "CIMENTO MIZU CP5 40KG",
        "codigoEan": "7890000000001",
        "preco": 54.9,
        "estoque": 1604,
        "localizacao": "A1-01"
      }
    ]
  }
}
```

### Exemplo de erro

```json
{
  "success": false,
  "message": "O parâmetro limit deve ser um número válido."
}
```

---

## Integração com SQL Server

Em ambiente real, altere a variável:

```env
DB_DRIVER=sqlserver
```

E configure:

```env
SQLSERVER_USER=
SQLSERVER_PASSWORD=
SQLSERVER_SERVER=localhost
SQLSERVER_INSTANCE=SQL2019FULL
SQLSERVER_DATABASE=
SQLSERVER_ENCRYPT=false
SQLSERVER_TRUST_CERT=true
SQLSERVER_PRICE_TABLE_ID=
```

---

## Scripts disponíveis

Rodar em desenvolvimento:

```bash
npm run dev
```

Gerar build de produção:

```bash
npm run build
```

Rodar build de produção:

```bash
npm run start
```

Rodar lint:

```bash
npm run lint
```

---

## Commits sugeridos

Durante o desenvolvimento, o projeto foi dividido em etapas com commits em inglês:

```bash
git commit -m "Add initial project structure"
git commit -m "Add MySQL database connection"
git commit -m "Add product repository"
git commit -m "Add product service and API response helpers"
git commit -m "Add products API route"
git commit -m "Add product API service and hook"
git commit -m "Add product search interface"
git commit -m "Improve product search user experience"
git commit -m "Add SQL Server product repository"
git commit -m "Add application layout shell"
git commit -m "Add project documentation"
git commit -m "Add PWA support"
git commit -m "Fix PWA icons and manifest"
git commit -m "Add cart types and helpers"
git commit -m "Add cart context with local storage"
git commit -m "Add cart actions to product cards"
git commit -m "Add bottom cart navigation"
git commit -m "Add cart page"
git commit -m "Add cash discount control to product listing"
git commit -m "Polish cart and product navigation"
git commit -m "Prepare project for final testing"
```

---

## Boas práticas aplicadas

* Separação entre repository e service
* Padronização de resposta da API
* Tipagem com TypeScript
* Uso de helpers para formatação
* Uso de constantes para valores globais
* Uso de variável de ambiente para alternar banco
* Query parametrizada para evitar SQL Injection
* Usuário somente leitura no banco real
* Componentização da interface
* Hook dedicado para controle de busca
* Context API para carrinho
* Persistência local com `localStorage`
* Debounce para evitar requisições excessivas
* Responsividade com Tailwind CSS
* PWA com manifest e service worker
* Separação entre banco fake local e banco real
* Cálculos isolados em helpers
* Uso de providers globais
* Navbar inferior para experiência mobile

---

## Checklist de testes

### Produtos

```txt
[ ] Página /products abre corretamente
[ ] Busca por nome funciona
[ ] Busca por código interno funciona
[ ] Busca por EAN funciona
[ ] Loading aparece durante a busca
[ ] Empty state aparece quando não há resultado
[ ] Erro aparece quando a API falha
[ ] Produto mostra preço no cartão
[ ] Produto mostra preço à vista
[ ] Produto mostra economia à vista
[ ] Produto mostra estoque
[ ] Produto mostra status do estoque
[ ] Botão copiar código funciona
```

### Carrinho

```txt
[ ] Adicionar produto ao carrinho funciona
[ ] Adicionar o mesmo produto aumenta a quantidade
[ ] Badge do header atualiza
[ ] Bottom bar aparece
[ ] Página /cart abre
[ ] Quantidade aumenta
[ ] Quantidade diminui
[ ] Quantidade manual funciona
[ ] Remover produto funciona
[ ] Limpar carrinho funciona
[ ] Total cartão atualiza
[ ] Total à vista atualiza
[ ] Economia atualiza
[ ] Carrinho persiste após recarregar a página
```

### Desconto à vista

```txt
[ ] Desconto padrão inicia em 10%
[ ] Alterar desconto na listagem funciona
[ ] Alterar desconto no carrinho funciona
[ ] Cards atualizam preço à vista
[ ] Carrinho atualiza valores
[ ] Desconto fica salvo após recarregar
```

### PWA

```txt
[ ] Manifest carrega corretamente
[ ] Service Worker registra corretamente
[ ] Ícones carregam corretamente
[ ] App aparece instalável no PC
[ ] App abre em modo standalone após instalado
[ ] Smartphone instala usando URL HTTPS
```

### Banco

```txt
[ ] /api/health/db retorna success true
[ ] /api/products retorna produtos no MySQL
[ ] DB_DRIVER=mysql usa banco fake
[ ] DB_DRIVER=sqlserver usa banco real
[ ] Usuário SQL Server possui apenas leitura
```

---

## Melhorias futuras

Algumas melhorias planejadas para evolução do projeto:

* Autenticação simples para acesso interno
* Tela de login
* Permissões por usuário
* Histórico de buscas recentes
* Filtro por estoque positivo
* Filtro por estoque negativo
* Filtro por produtos sem estoque
* Leitura de código de barras pela câmera
* Modo escuro
* Paginação ou scroll infinito
* Docker para ambiente local
* Testes unitários
* Testes de integração da API
* Deploy interno na rede local
* Geração de logs
* Exportação de resultados em CSV
* Tela administrativa para configurar o tipo de banco
* Tela de status da conexão com o banco
* Melhorias de acessibilidade
* Scanner de código de barras no PWA
* Compartilhamento de orçamento
* Impressão ou geração de PDF do carrinho
* Sincronização opcional com servidor interno

---

## Status do projeto

Projeto em desenvolvimento.

Atualmente, a aplicação já possui:

* Base local fake em MySQL
* API de busca de produtos
* Interface responsiva de pesquisa
* Estrutura preparada para SQL Server real
* PWA configurado
* Carrinho local com `localStorage`
* Cálculo de preço cartão e à vista
* Desconto à vista configurável
* Documentação inicial

---

## Autor

Desenvolvido por **Wanderson Kenedy**.

Projeto criado para estudo, portfólio e uso interno em consulta rápida de produtos, preços, estoque e simulação de carrinho.
