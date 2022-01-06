FROM node:16-slim

WORKDIR /
COPY package.json ./
RUN npm install


COPY . /app
CMD ["npm","start"]


