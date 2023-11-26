FROM node:18

ENV NODE_ENV=production
ENV NODE_PATH=/usr/local/lib/node_modules
ARG version=latest

RUN npm install -g express@$version  dockerode@$version axios@$version http-proxy-middleware@$version eventsource@$version
COPY index.js .
COPY server.js .
COPY sseListener.js .

# COPY restart.sh .
# RUN chmod +x restart.sh

# Expose the port the lean API will listen on
EXPOSE 3000

# Start the lean API
CMD ["node", "index.js"]
