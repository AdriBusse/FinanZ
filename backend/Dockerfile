FROM node:19

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./


RUN yarn
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
RUN yarn compile
EXPOSE 4000

CMD [ "node", "dist/index.js" ]

