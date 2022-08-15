FROM node:12.18-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .

RUN npm install next
# Building app
RUN npm run build
ENV ERROR_PREVIEW_TIME=3000

EXPOSE 3000
CMD ["npm", "start"]

