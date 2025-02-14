const Bull = require('bull');

const jobQueue = new Bull('jobQueue', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  },
});

console.log('Fila BullJS configurada com Redis');

module.exports = jobQueue;
