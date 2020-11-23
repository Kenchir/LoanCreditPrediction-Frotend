FROM node:10

# Create app directory
WORKDIR /usr

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install


RUN npm install -g serve

# Bundle app source
COPY . .

EXPOSE 3000

CMD ["npm","start"]