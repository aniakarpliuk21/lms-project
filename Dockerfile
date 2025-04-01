FROM node:20-alpine

LABEL key=LmsProject

WORKDIR /app

COPY ./backend/package.json  ./backend/package-lock.json /app/

RUN npm i

COPY ./backend /app

CMD ["npm", "run", "start:dev"]