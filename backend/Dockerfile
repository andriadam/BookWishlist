# Gunakan base image dari Node.js
FROM node:14

WORKDIR /app/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5555

CMD ["npm", "start"]
