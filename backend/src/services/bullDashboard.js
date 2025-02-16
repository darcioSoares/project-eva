const { createBullBoard } = require('bull-board');
const { BullAdapter } = require('bull-board/bullAdapter');
const jobQueue = require('./queueService');
const express = require('express');

const router = express.Router();

const { router: bullBoardRouter } = createBullBoard([new BullAdapter(jobQueue)]);

router.use('/', bullBoardRouter);

module.exports = router;
