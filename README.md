# Consulta Freitas

Aplicação web desenvolvida com **Next.js**, **TypeScript**, **Tailwind CSS**, **MySQL** e **SQL Server**, criada para consulta rápida de produtos, preços e estoque.

O projeto foi pensado para uso interno em loja de materiais de construção, permitindo que vendedores pesquisem produtos por **nome**, **código interno** ou **código de barras**, com uma interface simples, responsiva e rápida.

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
* [Endpoints da API](#endpoints-da-api)
* [Integração com SQL Server](#integração-com-sql-server)
* [Segurança](#segurança)
* [Scripts disponíveis](#scripts-disponíveis)
* [Commits sugeridos](#commits-sugeridos)
* [Melhorias futuras](#melhorias-futuras)
* [Autor](#autor)

---

## Objetivo

O objetivo do projeto é criar uma interface de consulta rápida para produtos, exibindo informações essenciais para operação de loja, como:

* Código interno do produto
* Nome do produto
* Código de barras / EAN
* Preço de venda
* Estoque atual
* Localização
* Situação do estoque

A aplicação foi estruturada com foco em:

* Separação de responsabilidades
* Código limpo e organizado
* Facilidade para manutenção
* Troca simples entre banco fake local e banco real
* Uso como projeto de portfólio
* Boas práticas com Next.js, TypeScript e arquitetura em camadas

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
```

---

## Tecnologias utilizadas

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

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

### Funcionalidades atuais

* Busca de produtos por nome
* Busca por código interno
* Busca por código de barras / EAN
* Busca automática com debounce
* Listagem responsiva de produtos
* Exibição de preço formatado em Real
* Exibição de estoque atual
* Identificação visual de estoque:

  * Disponível
  * Baixo
  * Zerado
  * Negativo
* Botão para copiar código do produto
* Health check de conexão com banco
* Suporte a MySQL fake local
* Suporte planejado para SQL Server real
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

### Camadas principais

| Camada       | Responsabilidade                                     |
| ------------ | ---------------------------------------------------- |
| components   | Componentes visuais da interface                     |
| hooks        | Controle de estado e regras de interação no frontend |
| services     | Comunicação com API e regras de negócio              |
| repositories | Comunicação direta com banco de dados                |
| lib          | Configuração de conexões externas                    |
| helpers      | Funções auxiliares de formatação e transformação     |
| utils        | Utilitários genéricos                                |
| types        | Tipagens TypeScript                                  |
| constants    | Constantes globais da aplicação                      |
| config       | Configurações centralizadas                          |

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
│   ├── products/
│   │   └── page.tsx
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
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
│   └── ui/
│
├── config/
│   └── database.ts
│
├── constants/
│   └── product.constants.ts
│
├── helpers/
│   ├── clipboard.helper.ts
│   ├── currency.helper.ts
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
│   └── product.ts
│
└── utils/
    ├── api-response.ts
    └── env.ts

database/
└── seed-mysql.sql
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
* Acesso ao banco `ETrade`
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

### Observação

No XAMPP, normalmente o MySQL usa:

```env
MYSQL_USER=root
MYSQL_PASSWORD=
```

Ou seja, usuário `root` sem senha.

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
SQLSERVER_USER=devwk
SQLSERVER_PASSWORD=SENHA_DO_USUARIO
SQLSERVER_SERVER=localhost
SQLSERVER_INSTANCE=SQL2019FULL
SQLSERVER_DATABASE=ETrade
SQLSERVER_ENCRYPT=false
SQLSERVER_TRUST_CERT=true
SQLSERVER_PRICE_TABLE_ID=11627049-F321-42DE-A3ED-4101BADDBC32
```

### Tabelas usadas no SQL Server

A aplicação foi preparada para consultar as tabelas:

```txt
Produto
ProdutoPreco
Estoque_Atual
```

### Campos principais usados

Da tabela `Produto`:

```txt
Id
Ide
Codigo
Nome
Codigo_EAN
Localizacao
Inativo
Bloqueado
BloqueadoParaVenda
```

Da tabela `ProdutoPreco`:

```txt
Produto__Ide
TabelaPreco__Ide
Preco
```

Da tabela `Estoque_Atual`:

```txt
Produto__Ide
Qtde
```

### Tabela de preço usada

No sistema ETrade/VR Sistemas, a tabela selecionada para venda é:

```txt
Preco1
```

O identificador usado pela aplicação é:

```txt
11627049-F321-42DE-A3ED-4101BADDBC32
```

---

## Query base SQL Server

A consulta real usada como base para produtos é semelhante a:

```sql
SELECT TOP (@limit)
  p.Id AS id,
  p.Codigo,
  p.Nome,
  p.Codigo_EAN,
  pp.Preco,
  ea.Qtde AS Estoque,
  p.Localizacao
FROM Produto p
INNER JOIN ProdutoPreco pp
  ON pp.Produto__Ide = p.Ide
LEFT JOIN Estoque_Atual ea
  ON ea.Produto__Ide = p.Ide
WHERE
  pp.TabelaPreco__Ide = @priceTableId
  AND p.Inativo = 0
  AND ISNULL(p.Bloqueado, 0) = 0
  AND ISNULL(p.BloqueadoParaVenda, 0) = 0
  AND (
    p.Nome LIKE '%' + @search + '%'
    OR p.Codigo LIKE '%' + @search + '%'
    OR p.Codigo_EAN LIKE '%' + @search + '%'
  )
ORDER BY p.Nome ASC;
```

---

## Segurança

A integração com o banco real deve utilizar um usuário com permissão somente leitura.

Exemplo de criação de usuário no SQL Server:

```sql
USE master;
GO

CREATE LOGIN devwk
WITH PASSWORD = 'SENHA_FORTE_AQUI',
CHECK_POLICY = ON,
CHECK_EXPIRATION = OFF;
GO

USE ETrade;
GO

CREATE USER devwk FOR LOGIN devwk;
GO

ALTER ROLE db_datareader ADD MEMBER devwk;
GO
```

### Teste de leitura

```sql
USE ETrade;
GO

SELECT TOP 10 *
FROM Produto;
```

### Teste de bloqueio de escrita

```sql
CREATE TABLE teste_permissao (
  id INT
);
```

O esperado é receber erro de permissão negada.

Esse cuidado evita que a aplicação consiga executar:

```txt
INSERT
UPDATE
DELETE
DROP
CREATE
ALTER
```

A aplicação deve trabalhar apenas com consultas `SELECT`.

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
* Debounce para evitar requisições excessivas
* Responsividade com Tailwind CSS

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
* PWA para instalação no celular
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

---

## Status do projeto

Projeto em desenvolvimento.

Atualmente, a aplicação já possui:

* Base local fake em MySQL
* API de busca de produtos
* Interface responsiva de pesquisa
* Estrutura preparada para SQL Server real
* Documentação inicial

---

## Autor

Desenvolvido por **Wanderson Kenedy**.

Projeto criado para estudo, portfólio e uso interno em consulta rápida de produtos, preços e estoque.
