FROM node:12

WORKDIR /usr/src/app

COPY . /app
COPY package.json ./
COPY yarn.lock ./

# RUN npm install -g yarn

RUN yarn install 

COPY . .
# RUN yarn global add pm2

EXPOSE 3000

ENV NODE_ENV production

CMD ["yarn", "start:prod"]
