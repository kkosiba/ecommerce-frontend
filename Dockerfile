FROM node:14

WORKDIR /app

# Copy package.json and yarn.lock to install dependencies
COPY package*.json yarn.lock ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
