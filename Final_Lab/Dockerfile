FROM node:20-alpine

RUN mkdir lals
WORKDIR /lals

COPY package.json package-lock.json ./
RUN npm install 

COPY . .

EXPOSE 3000

CMD ["npm", "start"]