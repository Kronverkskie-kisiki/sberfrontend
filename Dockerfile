FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]

