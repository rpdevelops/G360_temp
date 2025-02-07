# Usando Node.js 18 como base
FROM node:20.16.0

WORKDIR /app
RUN chmod -R 755 /app

# Copiando os arquivos de dependências
COPY package.json yarn.lock turbo.json ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages ./packages

RUN npm install -g corepack
RUN corepack enable
RUN corepack prepare yarn@4.3.1 --activate
# Configurando npm para tentar novamente
# RUN yarn config set fetch-retries 5
# RUN yarn config set fetch-retry-mintimeout 20000
# RUN yarn config set fetch-retry-maxtimeout 120000

# Instalando dependências
RUN yarn install

# Copiando o código da aplicação
COPY apps/frontend ./apps/frontend

# Expondo a porta 3000
EXPOSE 3000

# Construindo a aplicação
#RUN npm run build --workspace=apps/frontend

# Comando para rodar o servidor Next.js
CMD ["yarn", "run", "dev"]