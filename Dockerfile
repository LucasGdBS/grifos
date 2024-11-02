# Etapa de build
FROM node:latest AS builder

# Cria e define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto para o diretório de trabalho
COPY . .

# Instala as dependências e faz o build da aplicação
RUN npm install
RUN npm run build

# Etapa de produção
FROM nginx:stable-alpine AS production

# Copia o build da aplicação para o diretório de assets do nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta 80 para acesso HTTP
EXPOSE 80

# Comando padrão para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]
