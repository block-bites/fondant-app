FROM makesoftware/casper-nctl:latest AS casper-nctl

FROM node:14

ENV NODE_ENV=production
ENV NODE_PATH=/usr/local/lib/node_modules
ARG version=latest

RUN npm install -g express@$version  dockerode@$version
COPY index.js .
COPY server.js .

# COPY restart.sh .
# RUN chmod +x restart.sh

# Expose the port the lean API will listen on
EXPOSE 3000

# Start the lean API
CMD ["node", "server.js"]
