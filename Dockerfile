FROM node:12

WORKDIR /usr/src/app

COPY . /app
COPY package.json ./
COPY yarn.lock ./

RUN yarn install 

COPY . .

EXPOSE 3000

ENV NODE_ENV production

CMD ["yarn", "start:prod"]