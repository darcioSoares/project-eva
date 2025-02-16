const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
});

redis.on('connect', () => console.log('✅ Conectado ao Redis'));
redis.on('error', (err) => console.error('❌ Erro no Redis:', err));

module.exports = redis;
