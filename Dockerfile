FROM node
WORKDIR /persian-sort
COPY . .
RUN yarn
CMD ["yarn", "start"]
