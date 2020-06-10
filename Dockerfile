FROM node:12

WORKDIR /usr/src/app

#COPY . /app
COPY package.json ./
COPY yarn.lock ./

RUN yarn install 

COPY . .

EXPOSE 3000
#CMD ["yarn", "start:prod"]
RUN yarn build

