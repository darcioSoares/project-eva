const express = require('express');
const mongoose = require('mongoose');
const Redis = require('ioredis');

const app = express();
const port = 3000;

// Configurar MongoDB
const mongoURI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

const TestModel = mongoose.model('Test', new mongoose.Schema({ name: String }));

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
});

app.get('/db', async (req, res) => {
  try {
    const newDoc = new TestModel({ name: "Teste MongoDB" });
    await newDoc.save();
    
    const docs = await TestModel.find();
    res.json({ message: 'MongoDB conectado!', data: docs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/redis', async (req, res) => {
  try {
    await redis.set('test', 'Conectado ao Redis!');
    const value = await redis.get('test');
    res.json({ message: value });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
