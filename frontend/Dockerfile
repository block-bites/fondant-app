FROM node:18
WORKDIR /app
COPY . ./
RUN npm install
COPY . ./
RUN npm run build
RUN npm install -g serve
COPY . ./
ARG REACT_APP_PORT
ENV REACT_APP_PORT=${REACT_APP_PORT}
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
