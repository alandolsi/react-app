## Build React App
FROM node:16-alpine AS reactapp-build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent#
COPY . .
RUN npm run build

# Run React App
FROM nginx:stable-alpine
COPY --from=reactapp-build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]












