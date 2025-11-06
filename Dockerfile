FROM node:25-alpine3.22

WORKDIR /adameds-rj
ENV APPLICATION_HOST=0.0.0.0
ENV APPLICATION_PORT=8092
COPY . .
RUN npm install
EXPOSE $APPLICATION_PORT/tcp
CMD ["npm", "run", "start"]
