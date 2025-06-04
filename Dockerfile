FROM node:20-alpine

LABEL key=LmsProject

RUN mkdir /app

WORKDIR /app

COPY ./backend/package*.json ./

RUN npm install




