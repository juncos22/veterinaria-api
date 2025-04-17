FROM node:20.13.1-alpine
WORKDIR /app
COPY package.json .
RUN npm install -g pnpm@latest
COPY . .
RUN pnpm install
RUN pnpm run build
CMD ["pnpm", "run", "start"]
EXPOSE 3001