# G360

Aplicação MonoRepo usando Turbo. 
OBS1.: A homePage com o Taskboard está funcional e finalizada , os módulos estão em desenvolvimento.
OBS2.: A documentação abaixo foi feita para outros devs continuarem o desenvolvimento da aplicação.

---
## Especificações:

- Node: 20.16.0
- yarn: 4.3.1

Importante: Utilizado somente yarn, com npm da problema na execução do mobile.(Ajustes especificos para rodar o react-native em monorepo conforme documentação oficial da Expo).
---
## Execução do Projeto em Desenvolvimento
### Sem Docker:

Na pasta raiz do g360, rodar:

```
yarn run dev
```

Irá executar as 3 aplicações:

- Backend na porta 3001
- Frontend na porta 3000
- Mobile na porta 8081 (Emulador Web do React Native).

### Com Docker:
Na pasta raiz do g360, rodar:

```
docker compose up -d
```

Irá executar as 3 aplicações:

- Backend na porta 3001
- Frontend na porta 3002 (3000 ja estava sendo usada nos containers)
- Mobile na porta 8081 (Emulador Web do React Native).
---
## Observações do Frontend:
Foi Instalada a Biblioteca de componentes ShadcnUI para facilitar a construção das telas. Basta consultar os Componentes Disponíveis em: https://ui.shadcn.com/docs/components/ e adicionar ao projeto utilizando CLI (npx shadcn@latest add componente) conforme tutorial da documentação. Os componentes adicionados vão para a pasta src/components/ui/.

Para Estilização foi configurado o TailWindCSS, basta aplicar as classes prontas nos elementos contidas em : https://tailwindcss.com/docs
---
## Observações do MonoRepo:
Foi utilizado no projeto o monorepo Turbo para facilitar o reúso de componentes entre aplicações.
Exemplo de Reúso: Os tipos de DTOs que serão usados no Backend e no frontend podem ser criados dentro de um pacote em packages e ser importado nas duas aplicações, assim como classes de serviços que são utilizados nas duas aplicações, etc.
---

## Erros Comuns:
1. Adicionando dependências ou componentes do shadcnUI que usam dependencias no projeto rodando no docker do servidor de homologação:
 - As vezes quando uma depêndencia é adicionada ao projeto, a imagem que está rodando no docker não reconhece as dependencias instaladas e quebram a aplicação. Para corrigir,cheque se a dependencia do erro foi realmente instalada, e esta declarada corretamente no package.json. Se já foi checado isto, é necessário parar os containers da aplicação com ```docker compose down --rmi all``` que irá excluir as 3 imagens do G360 para forçar o rebuild. Após exclusão, rodar novamente com ```docker compose up -d --build``` e esperar o rebuild.
## Documento de Decisão Arquitetural (ADR):

### ADR 1: Estrutura do Monorepo com Turbo

#### Contexto
Estamos construindo um projeto monorepo que inclui aplicações frontend (Next.js), backend (NestJS) e mobile (React Native). Para gerenciar este monorepo, escolhemos usar o Turbo para otimizar o build e gerenciamento das dependências.

#### Decisão
Optamos por usar o Turbo como ferramenta principal para gerenciar e otimizar o monorepo. O Turbo nos permitirá:

- **Cache e Build Incremental**: O Turbo permite caching e build incremental, o que reduz significativamente o tempo de construção e execução dos projetos.
- **Gerenciamento de Dependências**: Facilita o gerenciamento de dependências compartilhadas entre as aplicações frontend, backend e mobile.
- **Desenvolvimento Local**: Proporciona uma experiência de desenvolvimento mais eficiente com o suporte a Hot Reloading e sincronização rápida.

#### Consequências
- **Benefícios**: Melhoria na eficiência do processo de build e desenvolvimento, bem como melhor gerenciamento das dependências.
- **Riscos**: Necessidade de adaptação e aprendizado do time para utilizar o Turbo de forma eficaz.

---

### ADR 2: Frontend com Next.js

#### Contexto
Para o desenvolvimento do frontend, selecionamos o Next.js devido a suas características de Server-Side Rendering (SSR), Static Site Generation (SSG) e suporte integrado para TypeScript.

#### Decisão
Optamos por usar Next.js para o frontend do projeto. As razões para essa escolha incluem:

- **Desempenho**: Suporte a SSR e SSG melhora o desempenho e a SEO das aplicações.
- **Desenvolvimento**: Experiência de desenvolvimento simplificada com integração nativa para React e TypeScript.
- **Recursos**: Utilização de recursos como API Routes e Image Optimization.

#### Consequências
- **Benefícios**: Melhor performance e SEO para aplicações, com uma abordagem moderna para o desenvolvimento frontend.
- **Riscos**: Dependência do ecossistema Next.js e a necessidade de ajustes contínuos conforme novas versões são lançadas.

---

### ADR 3: Backend com NestJS

#### Contexto
Para o desenvolvimento do backend, escolhemos o NestJS devido à sua arquitetura modular e suporte robusto para TypeScript, que se alinha bem com nossa stack.

#### Decisão
Optamos por usar NestJS para o backend do projeto. As razões incluem:

- **Arquitetura Modular**: Facilita a construção e manutenção de sistemas escaláveis.
- **Suporte a TypeScript**: Alinha-se com nossa escolha de TypeScript para toda a stack.
- **Integração**: Boa integração com várias bibliotecas e bancos de dados.

#### Consequências
- **Benefícios**: Código mais modular e escalável, com suporte a TypeScript.
- **Riscos**: Possível complexidade adicional devido à arquitetura modular e dependência de um framework específico.

---

### ADR 4: Mobile com React Native

#### Contexto
Para o desenvolvimento da aplicação mobile, escolhemos React Native por sua capacidade de compartilhar código com a aplicação web e sua grande comunidade de suporte.

#### Decisão
Optamos por usar React Native para o desenvolvimento da aplicação mobile. As razões para essa escolha incluem:

- **Compartilhamento de Código**: Capacidade de compartilhar código entre web e mobile, reduzindo o esforço de desenvolvimento.
- **Desenvolvimento Rápido**: Ferramentas e bibliotecas que aceleram o desenvolvimento mobile.
- **Comunidade**: Grande comunidade e suporte contínuo.

#### Consequências
- **Benefícios**: Economia de tempo e esforço com compartilhamento de código e desenvolvimento acelerado.
- **Riscos**: Possível necessidade de ajustes específicos para plataformas iOS e Android.

---
### ADR 5: Authenticação com Keycloak e Next-Auth

- Documentações utilizadas: 
- https://medium.com/inspiredbrilliance/implementing-authentication-in-next-js-v13-application-with-keycloak-part-1-f4817c53c7ef
- https://next-auth.js.org/getting-started/example

---

### ADR 6: Permissão de usuários

- Roles: TI_crud, TI_readonly, comercial_Crud, Comercial_readonly,etc..

---

### ADR 7: Arquitetura Backend
- util: configuraçao de banco Ex.: connectProtheus (Strings no .env)
- service: Operacoes no banco Ex.: getMarcacoes
- controllers: Rotas Ex.: Get /marcacoes

---

### ADR 8: Fluxo de GIT

- Branches Principais: homologacao(vai rodar no servidor de homologacao) -> producao (vai rodar no servidor de producao) -> main (Backup, que só entra o codigo depois de validado em producao)
- Branches de Projeto: projeto/feature Ex.: projeto/criar-tela-x
- Fluxo: Cria uma branch a partir de main. (por enquanto pode criar a partir de homologacao) com o nome projeto/criar-tela-comercial, depois de criado faço merge para homologacao.
---
### Conclusão

Estas decisões de arquitetura foram tomadas para criar um ambiente de desenvolvimento eficiente e sustentável para nosso projeto monorepo. Continuaremos a revisar e ajustar estas decisões conforme o projeto evolui e novas necessidades surgem.

