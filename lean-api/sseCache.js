const EventSource = require('eventsource');

class sseCache {
  constructor() {
    this.streams = {};
  }

  startListening(streamUrl, capacity = 100) {
    if (!this.streams[streamUrl]) {
      this.streams[streamUrl] = { events: [], capacity };
    }

    const eventSource = new EventSource(streamUrl);

    eventSource.onmessage = (event) => {
      if (!this.streams[streamUrl].events.includes(event.data)) {
        this.streams[streamUrl].events.unshift(event.data);
        if (this.streams[streamUrl].events.length > this.streams[streamUrl].capacity) {
          this.streams[streamUrl].events.pop();
        }
      }
    };

    eventSource.onerror = (error) => {
      console.error(`EventSource failed for ${streamUrl}:`, error);
      eventSource.close();
    };

    this.streams[streamUrl].eventSource = eventSource;
  }
  

  getEvents(streamUrl) {
    if (!this.streams[streamUrl]) {
      return {
        status: 'error',
        message: 'Stream not found or not being listened to'
      };
    }
    return {
        status: 'success',
        events: this.streams[streamUrl].events
    };
  }

  getDeployEvents(streamUrl) {
    const deployEvents = [];
    if (this.streams[streamUrl]) {
      this.streams[streamUrl].events.forEach(event => {
        try {
          const eventData = JSON.parse(event);
          if (eventData && eventData.data && eventData.data.DeployProcessed) {
            deployEvents.push(eventData.data.DeployProcessed);
          }
        } catch (error) {
          console.error('Error parsing event data:', error);
        }
      });
    }
    return {
        status: 'success',
        deploys: deployEvents
    };
  }

   
}


module.exports = sseCache;