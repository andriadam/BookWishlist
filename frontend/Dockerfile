FROM node:14

WORKDIR /app/frontend

RUN rm -rf node_modules package-lock.json

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]
