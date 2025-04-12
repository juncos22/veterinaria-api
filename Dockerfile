FROM node:20.13.1-alpine
WORKDIR /app
COPY package.json .
RUN pnpm install
COPY . .
RUN pnpm run build
CMD ["pnpm", "run", "start"]
EXPOSE 3001