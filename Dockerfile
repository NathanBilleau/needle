FROM node:18.15.0-alpine

# Create app directory
WORKDIR /usr/src/app

COPY . .

# Install app dependencies
RUN yarn install
# Build app
RUN yarn build

EXPOSE 8000

CMD [ "yarn", "start" ] 