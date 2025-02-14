const jobQueue = require('./queueService');

jobQueue.process('processJourney', async (job) => {
  try {
    const { journeyId } = job.data;

    console.log(`Processando jornada ID: ${journeyId}`);

    const journey = await Journey.findById(journeyId);
    if (!journey) {
      throw new Error('Journey not found');
    }

    // Atualizar a jornada como concluída
    journey.completedAt = new Date();
    await journey.save();

    console.log(`✅ Jornada ${journeyId} concluída em ${journey.completedAt}`);
    return `Journey ${journeyId} processed successfully`;
  } catch (error) {
    console.error(`Erro ao processar a jornada:`, error);
    throw error;
  }
});

jobQueue.on('completed', (job, result) => {
  console.log(`Job ${job.id} concluído com resultado: ${result}`);
});

jobQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} falhou:`, err);
});

console.log('Processador de Jobs do BullJS iniciado');
