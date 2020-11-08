FROM node:erbium-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

RUN mkdir -p /tobuild
WORKDIR /tobuild

COPY package.json /tobuild
RUN npm install

COPY . /tobuild
RUN npm run compile

WORKDIR /

RUN mkdir -p /app/contract
RUN mv /tobuild/node_modules /app/
RUN mv /tobuild/dist /app/
RUN mv /tobuild/package* /app/
RUN mv /tobuild/public /app/

RUN rm -rf /tobuild

RUN chown node /app -R

WORKDIR /app

EXPOSE 5500

CMD ["npm", "run", "start"]
