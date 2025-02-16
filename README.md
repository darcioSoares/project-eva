# Organização da Estrutura
--------------------------------------------------------------------------------
- A estrutura MVC (Model-View-Controller) foi escolhida para organizar o projeto de forma clara e escalável. No entanto, para manter a separação de responsabilidades e facilitar a manutenção do código, foi adicionado um nível extra de Services.

- Controllers: Responsáveis por receber as requisições HTTP, validar os dados da entrada e chamar os serviços apropriados.
Dessa forma, os controladores ficam mais enxutos e focados na comunicação entre a API e o cliente.

- Services: Contêm toda a lógica de negócio da aplicação. Esse design evita que os controllers fiquem sobrecarregados com regras de validação e manipulação de dados, tornando o código mais modular e reutilizável.

- Models: Representam a estrutura das entidades no banco de dados e são responsáveis pela interação com a camada de persistência

## Descrição do Projeto
📝 Descrição do Projeto
O projeto permite a criação de colaboradores, armazenando informações como nome, e-mail e telefone. Com os colaboradores cadastrados, é possível criar jornadas, que são atividades associadas a um colaborador específico.

## Criação de Jornadas
Ao criar uma jornada, é necessário fornecer:
- Atividade – Exemplo: "Reunião com diretores"
- Descrição – Exemplo: "Apresentar MVP do projeto"
- Data de execução – Define quando a jornada será processada automaticamente

O sistema permite o agendamento de múltiplas jornadas para diferentes colaboradores, garantindo que cada um tenha suas atividades bem organizadas.

⏳ Execução Automática via Job Scheduler
No backend, há um job recorrente que roda a cada 3 minutos (configuração ajustável para horas em produção). Esse job verifica no banco de dados se há jornadas programadas para o dia atual.

1️⃣ Se houver jornadas pendentes, elas são adicionadas à fila de processamento (usando BullJS e Redis).
2️⃣ Assim que executadas, a jornada é marcada como concluída no banco de dados, preenchendo o campo completedAt com a data e hora da execução.
3️⃣ Jornadas com completedAt: null ainda não foram executadas

Com esse fluxo, o sistema garante que as jornadas sejam processadas automaticamente, sem necessidade de intervenção manual, permitindo um gerenciamento eficiente das atividades dos colaboradores.

--------------------------------------------------------------------------------
# Observação 

- Ao subir o docker compose, sobe todas as dependencias, redis, mongodb banckend e frontend

- Já adicionei no docker-compose o comando para subir os jobs tambem, iniciando junto com o backend

- Tem um Painel do bull Dashbord para acompanhar 

- No caso, o processamento das filas, estão só sendo logadas no terminal, se estiver com o terminal aberto 
usando esse comando docker logs -f app_backend, ira aparecer os jobs. Esta simulando um envio de email. 
Pensei em colocar um, mas achei melhor não, para não ter risco de atrasar. Porem Ali, poderia colocar uma chamada API, uma função para envio de email. que o codigo já iria funcionar. 
--------------------------------------------------------------------------------


# Passo a passo para rodar a aplicação

1. Clone o repositório:

git clone https://github.com/darcioSoares/project-eva
cd project-eva

### Configuração do arquivo .env

Renomeie o arquivo .env-exemplo para .env que se encontra dentro da pasta backend

mv .env-exemplo .env

Já esta com os valores a ser utilizado pela aplicação

## 2. Suba os containers com Docker: (Executar dentro da Raiz do projeto)

Dentro da pasta do projeto, use o comando:

- docker compose build (criar as imagens)
- docker compose up -d (subir os containers)
- docker compose down (derrubar os containers)

Este comando irá subir os containers necessários para a aplicação.


## Comandos para aplicação
### Para entrar no bash da app e rodar os teste ou força o job a execultar naquele exato momento
- docker exec -it app_backend sh
- node src/services/jobProcessor.js
- npm test

### Verificar logs do backend, para ver os jobs sendo execultados
- docker logs -f app_backend (logs backend)
- docker-compose restart backend (restart container)

--------------------------------------------------------------------------------
# Tecnologias Utilizadas
- node.js
- react.js
- redis
- mongodb
- docker

## Principais bibliotecas
- express.js
- bull.js
- jest
- tailwindcss

--------------------------------------------------------------------------------

### Observação 
- Demais informaçoes do backend estara no readme da pasta backend
- Demais informaçoes do frontend estara no readme da pasta frontend

## Aplicação roda
- backend  http://localhost:3000/
- frontend http://localhost:5173/

