FROM node:19.5.0-alpine

WORKDIR /adameds-rj
ENV APPLICATION_HOST=0.0.0.0
ENV APPLICATION_PORT=8089
COPY . .
RUN npm install
EXPOSE $APPLICATION_PORT/tcp
CMD ["npm", "run", "dev"]
