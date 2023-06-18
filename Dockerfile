FROM debian:bookworm-20230411
RUN apt-get update
RUN apt show chromium
RUN apt-get install -y nodejs npm ffmpeg chromium --fix-missing

# Install yarn
RUN npm install -g yarn

# Specify the location of the Chromium browser
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Create app directory
WORKDIR /usr/src/app

COPY . .

# yarn timeout
RUN yarn config set network-timeout 600000 -g

# Install app dependencies
RUN yarn

# Build app
RUN yarn build

EXPOSE 8000

CMD [ "yarn", "start" ] 