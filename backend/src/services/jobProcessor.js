const jobQueue = require('./queueService');
const Journey = require('../models/Journey');
const connectDB = require('../config/database');

jobQueue.add(
  'checkJourneys',
  {},
  { repeat: { cron: '*/3 * * * *' } } // Executa a cada 30 -> minutos esta para 3 min 
);

async function checkPendingJourneys() {
  try {
    await connectDB(); 

    const todayString = new Date().toISOString().split("T")[0]; //'2025-02-15'
   
    //teste "2025-02-16"
    const formattedStartDate = new Date(todayString);
    formattedStartDate.setUTCHours(0, 0, 0, 0); 

    const formattedEndDate = new Date(todayString);
    formattedEndDate.setUTCHours(23, 59, 59, 999);

    console.log(`📅 Buscando jornadas entre ${formattedStartDate.toISOString()} e ${formattedEndDate.toISOString()}`);

  
    const journeys = await Journey.find({
      startDate: { 
        $gte: formattedStartDate,
        $lte: formattedEndDate 
      },
      completedAt: null // Apenas jornadas não concluídas
    });

    console.log(`🔍 Foram encontradas ${journeys.length} jornadas pendentes para hoje.`);

    if (journeys.length === 0) {
      console.log('✅ Nenhuma jornada para processar.');
      return;
    }

    journeys.forEach((journey) => {
      jobQueue.add('processJourney', {
        journeyId: journey._id,
        email: journey.email_employee,
        activity: journey.activity,
        description: journey.description,
        startDate: journey.startDate,
      });
    });

    console.log(`📌 ${journeys.length} jornadas adicionadas à fila.`);
  } catch (error) {
    console.error('❌ Erro ao verificar jornadas:', error);
  }
}

// 🔥 Garantir que o processamento inicie corretamente
(async () => {
  await checkPendingJourneys();
})();

// 🔥 Configurar o job recorrente corretamente
jobQueue.process('checkJourneys', async () => {
  console.log(`✅ a cada 3 min ✅`);
  await checkPendingJourneys();
});

// Adicionar o Processador para `processJourney`
jobQueue.process('processJourney', async (job) => {
  console.log(`⚡ Job ${job.id} começou a ser processado.`);
  console.log(`📌 Dados do job: ${JSON.stringify(job.data)}`);

  try {
    const { journeyId, email, activity, startDate, description } = job.data;

    console.log(`✅✅✅✅✅✅ Iniciando um Processo Assicrono ✅✅✅✅✅`);
    console.log(`📧 Simulando envio de e-mail para ${email}`);
    console.log(`📌 Atividade: ${activity}`);
    console.log(`📅 Data e Hora: ${startDate}`);
    console.log(`📅 Descrição : ${description}`);
  
    await Journey.findByIdAndUpdate(journeyId, { completedAt: new Date() });
    console.log(`✅ Jornada ${journeyId} marcada como concluída.`);

    return { status: 'OK', processedAt: new Date().toISOString() };
        
  } catch (error) {
    console.error(`❌ Erro ao processar o job ${job.id}:`, error);
  }
});

console.log('🛠️ Processadores do BullJS configurados corretamente.');
