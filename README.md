# todo-list

## Comandos do Docker

#### Inicia o ambiente de desenvolvimento do frontend com hot reload
docker compose watch angular-dev

#### Inicia o ambiente de desenvolvimento do backend
docker compose watch backend-dev

### Inicia todos os serviços
docker compose up

### Inicia todos os serviços e libera o terminal
docker compose up -d

### Inicia um serviço
docker compose up serviço

### Inicia um grupo de serviços 
docker compose --profile front up

--build no final pode ajudar caso não encontre a rede

#### remove os containers
docker compose down
