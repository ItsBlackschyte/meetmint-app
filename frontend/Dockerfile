# Step 1: Build React App
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Step 2: Serve with NGINX
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
