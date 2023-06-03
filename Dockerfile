FROM node:18-bullseye

# ENV NODE_ENV=production
ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
RUN npm install
RUN mv node_modules ../
COPY . .

EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "run", "startd"]