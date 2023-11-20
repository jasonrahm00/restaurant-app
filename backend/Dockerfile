FROM node:14
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /srv/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 1337

CMD ["npm", "start"]