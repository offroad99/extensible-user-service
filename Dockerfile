FROM alpine:latest
RUN apk add -U --no-cache nodejs npm && \
  adduser -S nodejs

USER nodejs
WORKDIR /home/nodejs
COPY package.json .
RUN npm install
COPY . .
EXPOSE 7500
ENTRYPOINT ["node"]
CMD ["app.js"]