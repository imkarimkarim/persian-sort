FROM node
WORKDIR /home/node/persian-sort
COPY . .
RUN yarn install
CMD ["yarn", "start"]
