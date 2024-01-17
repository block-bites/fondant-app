FROM node:18
WORKDIR /app
COPY . ./
RUN npm install
COPY . ./
RUN npm run build
RUN npm install -g serve
COPY . ./
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
