const jobQueue = require('./queueService');

jobQueue.process(async (job) => {
  console.log(`Processando job ${job.id} com dados:`, job.data);
  return `Resultado do job ${job.id}`;
});

jobQueue.on('completed', (job, result) => {
  console.log(`Job ${job.id} concluído com resultado: ${result}`);
});

jobQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} falhou:`, err);
});

console.log('Processador de Jobs do BullJS iniciado');
