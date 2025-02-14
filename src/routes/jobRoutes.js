const express = require('express');
const router = express.Router();
const jobQueue = require('../services/queueService');

router.post('/add', async (req, res) => {
  try {
    const { type, payload } = req.body;
    const job = await jobQueue.add({ type, payload });

    res.json({ message: '✅ Job adicionado à fila!', jobId: job.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
