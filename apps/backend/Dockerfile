# Usando Node.js 18 como base
FROM node:20.16.0

WORKDIR /app
RUN chmod -R 755 /app
# Copiando o código da aplicação
COPY apps/backend ./apps/backend

# Copiando os arquivos de dependências
COPY package.json yarn.lock turbo.json ./
COPY apps/backend/package.json ./apps/backend/
COPY packages ./packages

# Instalando dependências
RUN npm install -g corepack
RUN corepack enable
RUN corepack prepare yarn@4.3.1 --activate
RUN yarn install

# Construindo a aplicação
#RUN yarn workspace backend build

# Expondo a porta 3001
EXPOSE 3001

# Comando para rodar o servidor NestJS
CMD ["yarn", "run", "dev"]