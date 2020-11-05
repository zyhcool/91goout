FROM node:lts-alpine3.9

# 在容器中创建一个目录
RUN mkdir -p /usr/src/91goout/

WORKDIR /usr/src/91goout/

COPY . /usr/src/91goout/

RUN npm install -g typescript npm-run-all rimraf
RUN npm install

EXPOSE 9191

CMD npm run start
