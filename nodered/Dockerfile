FROM nodered/node-red

WORKDIR /data
WORKDIR /usr/src/node-red

COPY settings.js /data/settings.js
COPY flow_cred.json /data/flows_cred.json
COPY flow.json /data/flows.json

USER root
RUN chmod 644 /data/settings.js /data/flows_cred.json /data/flows.json

USER node-red

EXPOSE 1880