# Projeto backend

Esta é a estrutura do Projeto.
```plaintext
/backend
│── /src
│   ├── /config
│   │   ├── database.js
│   │
│   ├── /controllers
│   │   ├── employeeController.js
│   │   ├── journeyController.js
│   │
│   ├── /models
│   │   ├── Employee.js
│   │   ├── Journey.js
│   │
│   ├── /routes
│   │   ├── employeeRoutes.js
│   │   ├── journeyRoutes.js
│   │   ├── jobRoutes.js
│   │
│   ├── /services
│   │   ├── bullDashboard.js
│   │   ├── employeeService.js
│   │   ├── journeyService.js
│   │   ├── jobProcessor.js
│   │   ├── queueService.js
│   │   ├── redisService.js
│   │
│   ├── /tests
│   │   ├── employeeController.test.js
│   │   ├── employeeService.test.js
│   │   ├── journeyController.test.js
│   │   ├── journeyService.test.js
│   │
│   ├── app.js
│   ├── server.js
```
--------------------------------------------------------------------------------
## Informaçoes importantes para aplicação
- docker exec -it app_backend sh (entrar no bash)
- node src/services/jobProcessor.js (Forçar o job)
- npm test (teste) OBS Primeiro entre no bash docker exec -it app_backend sh depois execulte o comando

# Bull Dasboard 
- http://localhost:3000/admin/queues/queue/jobQueue (para acompanhar as filas)
--------------------------------------------------------------------------------

# API Documentation

## Employees Endpoints

### Create Employee
**POST /employees**
```http
POST /employees HTTP/1.1
Host: localhost:3000
Content-Type: application/json
```
#### Request Body
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+5511999999999",
  "position": "Software Engineer"
}
```

### Get All Employees
**GET /employees**
```http
GET /employees HTTP/1.1
Host: localhost:3000
```
#### Response
```json
{
  "employees": [
    {
      "_id": "123abc",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+5511999999999",
      "position": "Software Engineer"
    }
  ]
}
```

---

## Journeys Endpoints

### Create Journey
**POST /journeys**
```http
POST /journeys HTTP/1.1
Host: localhost:3000
Content-Type: application/json
```
#### Request Body
```json
{
  "activity": "Daily Standup Meeting",
  "description": "Reunião diária para alinhar tarefas",
  "employeeId": "67b0d476ce12aa63d6bf92e6",
  "email_employee": "email@email.com",
  "startDate": "2025-02-15"
}
```

### Get All Journeys
**GET /journeys**
```http
GET /journeys HTTP/1.1
Host: localhost:3000
```
#### Response
```json
{
  "journeys": [
    {
      "_id": "67b0d476ce12aa63d6bf92e6",
      "activity": "Daily Standup Meeting",
      "description": "Reunião diária para alinhar tarefas",
      "employeeId": "67b0d476ce12aa63d6bf92e6",
      "email_employee": "email@email.com",
      "startDate": "2025-02-15"
    }
  ]
}
```

